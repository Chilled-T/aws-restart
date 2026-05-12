# Introduction to Amazon EC2

![AWS](https://img.shields.io/badge/Amazon-EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Duration](https://img.shields.io/badge/Duration-45%20Minutes-blue?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Beginner-brightgreen?style=for-the-badge)

## Overview

This lab provides a hands-on introduction to **Amazon Elastic Compute Cloud (Amazon EC2)** — AWS's core compute service. You will gain practical experience launching, configuring, monitoring, resizing, and terminating an EC2 instance, while exploring key concepts such as security groups, storage volumes, and termination protection.

Amazon EC2 is a web service that provides resizable compute capacity in the cloud. It eliminates the need to invest in physical hardware upfront, allowing you to provision virtual servers in minutes and scale capacity up or down as your requirements change. You pay only for the capacity you use, making it a flexible and cost-effective solution for running applications in the cloud.

---

## Objectives

By the end of this lab, you will be able to:

- Launch a web server EC2 instance with termination protection enabled
- Monitor an EC2 instance using status checks and Amazon CloudWatch metrics
- Modify a security group to allow inbound HTTP traffic on port 80
- Resize an EC2 instance type and expand its EBS storage volume
- Test and disable termination protection
- Terminate an EC2 instance

---

## Duration

**Approximately 45 minutes**

---

## Tasks

### Task 1 — Launch an EC2 Instance

Launch an Amazon EC2 instance with termination protection enabled and a User Data script that automatically installs and starts a simple web server on boot.

**Key steps:**
1. Navigate to the EC2 Dashboard in the AWS Management Console
2. Choose **Launch instance**
3. Configure the instance with termination protection enabled
4. Attach a User Data script to deploy a basic web server

> Termination protection prevents an instance from being accidentally deleted, adding a safeguard for critical workloads.

---

### Task 2 — Monitor Your Instance

Explore the built-in monitoring tools available for EC2 instances to understand instance health and performance.

**Key steps:**
1. Navigate to the **Status checks** tab to verify that both System reachability and Instance reachability checks have passed
2. Navigate to the **Monitoring** tab to view Amazon CloudWatch metrics for the instance
3. Use **Actions → Monitor and troubleshoot → Get Instance Screenshot** to capture a visual of the instance console

> Amazon EC2 performs automated checks on every running instance to identify hardware and software issues. Basic five-minute CloudWatch monitoring is enabled by default, with the option to enable detailed one-minute monitoring.

---

### Task 3 — Update the Security Group and Access the Web Server

Modify the instance's security group to allow inbound HTTP traffic, then verify access to the web server running on the instance.

**Key steps:**
1. Copy the instance's **Public IPv4 address** from the Details tab
2. Attempt to access the web server in a browser — access will be denied because port 80 is not open
3. Navigate to **Security Groups** and select the Web Server security group
4. Add an inbound rule: **Type: HTTP | Source: Anywhere-IPv4**
5. Save the rule and refresh the browser

> You should see the message: **Hello From Your Web Server!**

Security groups act as virtual firewalls, controlling inbound and outbound traffic to EC2 instances. By default, all inbound traffic is denied until explicit allow rules are added.

---

### Task 4 — Resize Your Instance and EBS Volume

Scale the instance by changing its instance type and increasing the size of its attached EBS storage volume to accommodate growing workload demands.

**Stop the instance**
- An instance must be in a stopped state before its type can be changed
- Stopped instances do not incur compute charges, though EBS storage charges continue to apply

**Change the instance type**
- Navigate to **Actions → Instance Settings → Change Instance Type**
- Change from **t3.micro** to **t3.small** (doubles the available memory)

**Resize the EBS volume**
- Navigate to **Elastic Block Store → Volumes**
- Select **Actions → Modify Volume**
- Increase the volume size from **8 GiB to 10 GiB**

**Restart the instance**
- Start the instance again to apply the changes

> Amazon EC2 and EBS make it straightforward to scale compute and storage resources independently, without needing to replace or reprovision the instance from scratch.

---

### Task 5 — Test Termination Protection

Verify that termination protection prevents accidental deletion of an instance, then disable the protection and terminate the instance.

**Key steps:**
1. Attempt to terminate the instance via **Instance State → Terminate instance**
2. Observe the error: *Failed to terminate an instance: The instance may not be terminated*
3. Navigate to **Actions → Instance Settings → Change Termination Protection**
4. Uncheck **Enable** and save
5. Terminate the instance successfully via **Instance State → Terminate instance**

> Termination protection is a simple but effective safeguard for production instances that should not be deleted accidentally.

---

## Key Concepts

| Concept | Description |
|--------|-------------|
| **Amazon EC2** | A web service providing resizable virtual compute capacity in the cloud |
| **Security Groups** | Virtual firewalls that control inbound and outbound instance traffic |
| **Amazon EBS** | Persistent block storage volumes attached to EC2 instances |
| **CloudWatch** | AWS monitoring service that collects EC2 performance metrics |
| **Termination Protection** | A setting that prevents an instance from being accidentally terminated |
| **User Data** | Scripts that run automatically when an instance first launches |
| **Instance Types** | Predefined combinations of CPU, memory, and networking capacity |

---

## Additional Resources

- [Launch Your Instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/LaunchingAndUsingInstances.html)
- [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- [Amazon Machine Images (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
- [Security Groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)
- [Amazon EC2 Metrics and Dimensions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html)
- [Resizing Your Instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-resize.html)
- [Termination Protection](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html#Using_ChangingDisableAPITermination)
