# Working with AWS Lambda

## Lab Overview

In this lab, you deploy and configure an AWS Lambda based serverless computing solution. The Lambda function generates a sales analysis report by pulling data from a database and emailing the results daily. The database connection information is stored in Parameter Store, a capability of AWS Systems Manager. The database itself runs on an Amazon Elastic Compute Cloud (Amazon EC2) Linux, Apache, MySQL, and PHP (LAMP) instance.

The following diagram illustrates the architecture of the sales analysis report solution and the order in which actions occur:

| Step | Details |
|------|---------|
| 1 | An Amazon CloudWatch Events event calls the `salesAnalysisReport` Lambda function at 8 PM every day Monday through Saturday. |
| 2 | The `salesAnalysisReport` Lambda function invokes another Lambda function, `salesAnalysisReportDataExtractor`, to retrieve the report data. |
| 3 | The `salesAnalysisReportDataExtractor` function runs an analytical query against the café database (`cafe_db`). |
| 4 | The query result is returned to the `salesAnalysisReport` function. |
| 5 | The `salesAnalysisReport` function formats the report into a message and publishes it to the `salesAnalysisReportTopic` Amazon Simple Notification Service (Amazon SNS) topic. |
| 6 | The `salesAnalysisReportTopic` SNS topic sends the message by email to the administrator. |

In this lab, the Python code for each Lambda function is provided so that you can focus on the SysOps tasks of deploying, configuring, and testing the serverless solution components.

---

## Objectives

After completing this lab, you will be able to:

- Recognize necessary AWS Identity and Access Management (IAM) policy permissions to facilitate a Lambda function to other Amazon Web Services (AWS) resources.
- Create a Lambda layer to satisfy an external library dependency.
- Create Lambda functions that extract data from a database and send reports to a user.
- Deploy and test a Lambda function that is initiated based on a schedule and that invokes another function.
- Use CloudWatch logs to troubleshoot any issues running a Lambda function.

---

## Duration

This lab requires approximately **60 minutes** to complete.

---

## Accessing the AWS Management Console

1. At the top of these instructions, choose **Start Lab** to launch the lab. A **Start Lab** panel opens displaying the lab status.
2. Wait until the message **"Lab status: ready"** appears, and then choose **X** to close the **Start Lab** panel.
3. At the top of these instructions, choose **AWS** to open the AWS Management Console on a new browser tab. The system automatically signs you in.

> **Tip:** If a new browser tab does not open, a banner or icon at the top of your browser will indicate that your browser is preventing the site from opening pop-up windows. Choose the banner or icon, and choose **Allow pop-ups**.

4. Arrange the AWS Management Console so that it appears alongside these instructions. Ideally, you should be able to see both browser tabs at the same time to follow the lab steps.

Leave this browser tab open. You return to it later in this lab.

> **Important:** Do not change the lab Region unless specifically instructed to do so.

---

## Task 1: Observing the IAM Role Settings

In this lab, you create two Lambda functions. Each function requires permissions to access the AWS resources with which they interact.

In this task, you analyze the IAM roles and the permissions that they grant to the `salesAnalysisReport` and `salesAnalysisReportDataExtractor` Lambda functions that you create later.

### Task 1.1: Observing the `salesAnalysisReport` IAM Role Settings

1. In the AWS Management Console, choose **Services > Security, Identity, & Compliance > IAM**.
2. In the navigation pane, choose **Roles**.
3. In the search box, enter `sales`.
4. From the filtered results, choose the **salesAnalysisReportRole** hyperlink.
5. Choose the **Trust relationships** tab, and notice that `lambda.amazonaws.com` is listed as a trusted entity, which means that the Lambda service can use this role.
6. Choose the **Permissions** tab, and notice the four policies assigned to this role. To expand each role and analyze the permissions, choose the **+** icon next to each role:
   - **AmazonSNSFullAccess** — provides full access to Amazon SNS resources.
   - **AmazonSSMReadOnlyAccess** — provides read-only access to Systems Manager resources.
   - **AWSLambdaBasicRunRole** — provides write permissions to CloudWatch logs (required by every Lambda function).
   - **AWSLambdaRole** — gives a Lambda function the ability to invoke another Lambda function.

The `salesAnalysisReport` Lambda function that you create later uses the `salesAnalysisReportRole` role.

### Task 1.2: Observing the `salesAnalysisReportDERole` IAM Role Settings

1. Choose **Roles** again.
2. In the search box, enter `sales`.
3. From the filtered results, choose the **salesAnalysisReportDERole** hyperlink.
4. Choose the **Trust relationships** tab, and notice that `lambda.amazonaws.com` is listed as a trusted entity.
5. Choose the **Permissions** tab, and notice the permissions granted to this role:
   - **AWSLambdaBasicRunRole** — provides write permissions to CloudWatch logs.
   - **AWSLambdaVPCAccessRunRole** — provides permissions to manage elastic network interfaces to connect a function to a VPC.

The `salesAnalysisReportDataExtractor` Lambda function that you create next uses the `salesAnalysisReportDERole` role.

---

## Task 2: Creating a Lambda Layer and a Data Extractor Lambda Function

In this task, you first create a Lambda layer, and then you create a Lambda function that uses the layer.

Start by downloading two required files:

- [pymysql-v3.zip](https://aws-tc-largeobjects.s3.us-west-2.amazonaws.com/CUR-TF-100-RSJAWS-1-23732/178-activity-JAWS-working-lambda/s3/pymysql-v3.zip)
- [salesAnalysisReportDataExtractor-v3.zip](https://aws-tc-largeobjects.s3.us-west-2.amazonaws.com/CUR-TF-100-RSJAWS-1-23732/178-activity-JAWS-working-lambda/s3/salesAnalysisReportDataExtractor-v3.zip)

> **Note:** The `salesAnalysisReportDataExtractor-v3.zip` file is a Python implementation of a Lambda function that uses the PyMySQL open-source client library to access the MySQL café database. This library has been packaged into `pymysql-v3.zip`, which is uploaded to the Lambda layer next.

### Task 2.1: Creating a Lambda Layer

In the next steps, you create a Lambda layer named `pymysqlLibrary` and upload the client library into it so that it can be used by any function that requires it. Lambda layers provide a flexible mechanism to reuse code between functions without including it in each function's deployment package.

1. In the AWS Management Console, choose **Services > Compute > Lambda**.

   > **Tip:** If the navigation panel is closed, choose the collapsed menu icon (three horizontal lines) to open the **AWS Lambda** panel.

2. Choose **Layers**.
3. Choose **Create layer**.
4. Configure the following layer settings:
   - **Name:** `pymysqlLibrary`
   - **Description:** `PyMySQL library modules`
   - Select **Upload a .zip file**. Choose **Upload**, navigate to the `pymysql-v3.zip` file, and open it.
   - **Compatible runtimes:** Choose **Python 3.9**.
5. Choose **Create**.

The message **"Successfully created layer pymysqlLibrary version 1"** is displayed.

> **Tip:** The Lambda layers feature requires that the .zip file conform to a specific folder structure. For more information, see [Including Library Dependencies in a Layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html).

### Task 2.2: Creating a Data Extractor Lambda Function

1. In the navigation pane, choose **Functions**.
2. Choose **Create function**, and configure the following options:
   - At the top of the **Create function** page, select **Author from scratch**.
   - **Function name:** `salesAnalysisReportDataExtractor`
   - **Runtime:** Python 3.9
   - Expand **Change default execution role**, and configure:
     - **Execution role:** Use an existing role
     - **Existing role:** `salesAnalysisReportDERole`
3. Choose **Create function**.

The message **"Successfully created the function salesAnalysisReportDataExtractor"** appears.

### Task 2.3: Adding the Lambda Layer to the Function

1. In the **Function overview** panel, choose **Layers**.
2. At the bottom of the page, in the **Layers** panel, choose **Add a layer**.
3. Configure the following options:
   - **Choose a layer:** Custom layers
   - **Custom layers:** `pymysqlLibrary`
   - **Version:** 1
4. Choose **Add**.

The **Function overview** panel shows a count of **(1)** in the **Layers** node for the function.

### Task 2.4: Importing the Code for the Data Extractor Lambda Function

1. Go to **Lambda > Functions > salesAnalysisReportDataExtractor**.
2. In the **Runtime settings** panel, choose **Edit**.
3. For **Handler**, enter `salesAnalysisReportDataExtractor.lambda_handler`.
4. Choose **Save**.
5. In the **Code source** panel, choose **Upload from**.
6. Choose **.zip file**.
7. Choose **Upload**, and select the `salesAnalysisReportDataExtractor-v3.zip` file that you downloaded earlier.
8. Choose **Save**.

The Lambda function code is imported and displayed in the **Code source** panel. If necessary, double-click **salesAnalysisReportDataExtractor.py** in the **Environment** navigation pane to display the code.

Review the Python code and read the embedded comments to understand its logic flow. Notice that the function expects to receive the database connection information (`dbURL`, `dbName`, `dbUser`, and `dbPassword`) in the event input parameter.

> **Note:** If the code does not yet display in the function code editor, refresh the console.

### Task 2.5: Configuring Network Settings for the Function

This function requires network access to the café database running in an EC2 LAMP instance. You need to specify the VPC, subnet, and security group information in the function's configuration.

1. Choose the **Configuration** tab, and then choose **VPC**.
2. Choose **Edit**, and configure the following options:
   - **VPC:** Choose the option with **Cafe VPC** as the Name.
   - **Subnets:** Choose the option with **Cafe Public Subnet 1** as the Name.

   > **Tip:** You can ignore any warning recommending at least two subnets for high availability, as it does not apply to this function.

   - **Security groups:** Choose the option with **CafeSecurityGroup** as the Name.

   Notice that the security group's inbound and outbound rules are automatically displayed.

3. Choose **Save**.

---

## Task 3: Testing the Data Extractor Lambda Function

### Task 3.1: Launching a Test of the Lambda Function

You need to supply the café database connection parameters, which are stored in Parameter Store.

1. On a new browser tab, open the AWS Management Console and choose **Services > Management & Governance > Systems Manager**.
2. In the navigation pane, choose **Parameter Store**.
3. Choose each of the following parameters and copy the **Value** of each into a text editor:
   - `/cafe/dbUrl`
   - `/cafe/dbName`
   - `/cafe/dbUser`
   - `/cafe/dbPassword`
4. Return to the **Lambda Management Console** browser tab. On the `salesAnalysisReportDataExtractor` function page, choose the **Test** tab.
5. Configure the **Test event** panel as follows:
   - **Test event action:** Create new event
   - **Event name:** `SARDETestEvent`
   - **Template:** hello-world
6. In the **Event JSON** pane, replace the JSON object with the following, substituting the actual parameter values:

```json
{
  "dbUrl": "<value of /cafe/dbUrl parameter>",
  "dbName": "<value of /cafe/dbName parameter>",
  "dbUser": "<value of /cafe/dbUser parameter>",
  "dbPassword": "<value of /cafe/dbPassword parameter>"
}
```

7. Choose **Save**, then choose **Test**.

After a few moments, the page shows **"Execution result: failed"**.

### Task 3.2: Troubleshooting the Data Extractor Lambda Function

In the **Execution result** pane, choose **Details** to expand it. You will see an error message similar to:

```json
{
  "errorMessage": "2019-02-14T04:14:15.282Z ff0c3e8f-1985-44a3-8022-519f883c8412 Task timed out after 3.00 seconds"
}
```

This indicates the function timed out after 3 seconds. The **Log output** section includes lines with the following keywords:

- **START** — the function started running.
- **END** — the function finished running.
- **REPORT** — a summary of performance and resource utilization statistics.

**What caused this error?**

### Task 3.3: Analyzing and Correcting the Lambda Function

Here are hints to help you find the solution:

- One of the first things this function does is connect to the MySQL database. It waits a certain amount of time to establish a connection — if unsuccessful, the function times out.
- By default, MySQL listens on port **3306** for client access.
- Choose the **Configuration** tab, then choose **VPC**. Check the **Inbound rules** for the security group used by the EC2 instance running the database. Is port 3306 listed? If not, add an inbound rule to allow it.

Once you have corrected the problem:

1. Return to the `salesAnalysisReportDataExtractor` function page.
2. Choose the **Test** tab, and choose **Test** again.

You should now see a green box showing **"Execution result: succeeded (logs)"**.

Choose **Details** to expand it. The function returns:

```json
{
  "statusCode": 200,
  "body": []
}
```

The `body` field is empty because there is no order data in the database yet.

### Task 3.4: Placing an Order and Testing Again

In this task, you access the café website and place some orders to populate the database.

**To find the café website URL:**

**Option 1:**
1. On the AWS Management Console, choose **Services > Compute > EC2**.
2. In the navigation pane, choose **Instances**.
3. Choose **CafeInstance** and copy the **Public IPv4 address**.
4. On a new browser tab, enter `http://publicIP/cafe`, replacing `publicIP` with the copied address.

**Option 2:**
1. At the top of these instructions, choose **Details**, then choose **Show**.
2. From the **Credentials** window, copy the **CafePublicIP**.
3. On a new browser tab, enter `http://publicIP/cafe`, replacing `publicIP` with the copied address.

On the café website, choose **Menu** and place some orders to populate data in the database.

Now test the function again:

1. Go to the `salesAnalysisReportDataExtractor` function page.
2. Choose the **Test** tab, and choose **Test**.

The returned JSON object now contains product quantity information:

```json
{
  "statusCode": 200,
  "body": [
    {
      "product_group_number": 1,
      "product_group_name": "Pastries",
      "product_id": 1,
      "product_name": "Croissant",
      "quantity": 1
    },
    {
      "product_group_number": 2,
      "product_group_name": "Drinks",
      "product_id": 8,
      "product_name": "Hot Chocolate",
      "quantity": 2
    }
  ]
}
```

**Congratulations!** You have successfully created the `salesAnalysisReportDataExtractor` Lambda function.

---

## Task 4: Configuring Notifications

### Task 4.1: Creating an SNS Topic

1. On the AWS Management Console, choose **Services > Application Integration > Simple Notification Service**.
2. In the navigation pane, choose **Topics**, then choose **Create topic**.

   > **Note:** If the **Topics** link is not visible, choose the three horizontal lines icon, then choose **Topics**.

3. Configure the following options:
   - **Type:** Standard
   - **Name:** `salesAnalysisReportTopic`
   - **Display name:** `SARTopic`
4. Choose **Create topic**.
5. Copy and paste the **ARN** value into a text editor document — you will need it when configuring the next Lambda function.

### Task 4.2: Subscribing to the SNS Topic

1. Choose **Create subscription**, and configure the following options:
   - **Protocol:** Email
   - **Endpoint:** Enter an email address you can access.
2. Choose **Create subscription**.

The subscription is created with a status of **Pending confirmation**.

3. Check your email inbox for a message from SARTopic with the subject **"AWS Notification - Subscription Confirmation"**.
4. Open the email and choose **Confirm subscription**.

A new browser tab opens displaying **"Subscription confirmed!"**

---

## Task 5: Creating the `salesAnalysisReport` Lambda Function

This function is the main driver of the sales analysis report flow. It:

- Retrieves the database connection information from Parameter Store
- Invokes the `salesAnalysisReportDataExtractor` Lambda function to retrieve report data
- Formats and publishes a message containing the report data to the SNS topic

### Task 5.1: Connecting to the CLI Host Instance

1. On the **EC2 Management Console**, in the navigation pane, choose **Instances**.
2. Choose the check box for the **CLI Host** instance.
3. Choose **Connect**.
4. On the **EC2 Instance Connect** tab, choose **Connect**.

### Task 5.2: Configuring the AWS CLI

1. In the EC2 Instance Connect terminal, run:

```bash
aws configure
```

2. At the prompts, enter the following:
   - **AWS Access Key ID:** Choose **Details > Show** at the top of these instructions. Copy the **AccessKey** value.
   - **AWS Secret Access Key:** Copy the **SecretKey** value from the same **Credentials** window.
   - **Default region name:** `us-west-2`
   - **Default output format:** `json`

### Task 5.3: Creating the `salesAnalysisReport` Lambda Function Using the AWS CLI

1. Verify that the `salesAnalysisReport-v2.zip` file is on the CLI Host:

```bash
cd activity-files
ls
```

2. Find the ARN of the `salesAnalysisReportRole` IAM role:
   - Open the IAM management console and choose **Roles**.
   - Search for `salesAnalysisReportRole` and choose the role name.
   - Copy the **ARN** from the **Summary** page into a text editor.

3. Run the following command, replacing the placeholders with your values:

```bash
aws lambda create-function \
  --function-name salesAnalysisReport \
  --runtime python3.9 \
  --zip-file fileb://salesAnalysisReport-v2.zip \
  --handler salesAnalysisReport.lambda_handler \
  --region <region> \
  --role <salesAnalysisReportRoleARN>
```

Once complete, the command returns a JSON object describing the function's attributes.

### Task 5.4: Configuring the `salesAnalysisReport` Lambda Function

1. Open the Lambda management console.
2. Choose **Functions**, then choose **salesAnalysisReport**.
3. Review the **Function overview** and **Code source** panels. Read through the function code and comments to understand the logic.

   > **Note:** On line 26, the function retrieves the SNS topic ARN from an environment variable named `topicARN`. You must define this variable.

4. Choose the **Configuration** tab, then choose **Environment variables**.
5. Choose **Edit**.
6. Choose **Add environment variable**, and configure:
   - **Key:** `topicARN`
   - **Value:** Paste the ARN of the `salesAnalysisReportTopic` SNS topic.
7. Choose **Save**.

The message **"Successfully updated the function salesAnalysisReport"** appears.

### Task 5.5: Testing the `salesAnalysisReport` Lambda Function

1. Choose the **Test** tab, and configure the test event:
   - **Test event action:** Create new event
   - **Event name:** `SARTestEvent`
   - **Template:** hello-world
   - Leave the default JSON as is — the function requires no input parameters.
2. Choose **Save**, then choose **Test**.

A green box with **"Execution result: succeeded (logs)"** appears.

> **Tip:** If you get a timeout error, choose **Test** again — the first invocation sometimes takes longer to initialize. Alternatively, increase the timeout under **Configuration > General configuration > Edit > Timeout**.

Choose **Details** to expand. The function should return:

```json
{
  "statusCode": 200,
  "body": "\"Sale Analysis Report sent.\""
}
```

Check your email inbox — you should receive an email from AWS Notifications with the subject **"Daily Sales Analysis Report"** containing a report based on the orders placed earlier.

You can place more orders on the café website and test again to see updated results.

### Task 5.6: Adding a Trigger to the `salesAnalysisReport` Lambda Function

Configure the report to run Monday through Saturday at 8 PM each day using a CloudWatch Events trigger.

1. In the **Function overview** panel, choose **Add trigger**.
2. Configure the following options:
   - **Trigger configuration:** EventBridge (CloudWatch Events)
   - **Rule:** Create a new rule
   - **Rule name:** `salesAnalysisReportDailyTrigger`
   - **Rule description:** `Initiates report generation on a daily basis`
   - **Rule type:** Schedule expression
   - **Schedule expression:** Use a Cron expression with this syntax: `cron(Minutes Hours Day-of-month Month Day-of-week Year)`

   > **Note:** All times in Cron expressions are based on the UTC time zone. For testing, enter an expression scheduled 5 minutes from the current time.

   **Examples:**
   - London (UTC): If current time is 11:30 AM → `cron(35 11 ? * MON-SAT *)`
   - New York (UTC-5): If current time is 11:30 AM → `cron(35 16 ? * MON-SAT *)`

   > **Tip:** For more information, see [Schedule Expressions for Rules](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html). To get the current UTC time, search for "UTC time" in any browser.

3. Choose **Add**.

The new trigger appears in the **Function overview** panel and **Triggers** pane.

> **Challenge:** What should the Cron expression be for production use — scheduled every day, Monday through Saturday at 8 PM UTC?

Wait 5 minutes, then check your email inbox for a new **"Daily Sales Analysis Report"** email triggered by the CloudWatch Events event.

---

## Conclusion

Congratulations! You have successfully completed the following:

- Recognized necessary IAM policy permissions to enable a Lambda function to access other AWS resources
- Created a Lambda layer to satisfy an external library dependency
- Created Lambda functions that extract data from a database and send reports to a user
- Deployed and tested a Lambda function initiated on a schedule that invokes another function
- Used CloudWatch logs to troubleshoot issues running a Lambda function

---

## Lab Complete

Choose **End Lab** at the top of this page, then choose **Yes** to confirm.

A panel will appear indicating: **"You may close this message box now. Lab resources are terminating."**

Choose **X** in the upper-right corner to close the **End Lab** panel.

---

## Additional Resources

- [Using AWS Lambda with scheduled events](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-tutorial.html)
- [Accessing Amazon CloudWatch logs for AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html)
