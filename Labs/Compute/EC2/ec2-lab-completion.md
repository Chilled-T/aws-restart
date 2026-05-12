# Lab Completion Report: Introduction to Amazon EC2

![AWS](https://img.shields.io/badge/Amazon-EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Status](https://img.shields.io/badge/Lab-Completed-brightgreen?style=for-the-badge)
![Duration](https://img.shields.io/badge/Duration-45%20Minutes-blue?style=for-the-badge)

## Overview

This document records the successful completion of the **Introduction to Amazon EC2** lab. The lab covered the full lifecycle of an EC2 instance — from initial launch and configuration, through monitoring, security group management, resizing, and finally termination. Each task was completed hands-on using the AWS Management Console.

---

## Task 1 — Launching the EC2 Instance

The first task involved launching a new EC2 instance named **Web Server** with the following configuration:

| Setting | Value |
|--------|-------|
| **Name** | Web Server |
| **AMI** | Amazon Linux 2023 (kernel-6.1) |
| **Instance type** | t3.micro |
| **Key pair** | Proceeded without a key pair |
| **VPC** | Lab VPC (10.0.0.0/16) |
| **Subnet** | Public Subnet 2 (us-west-2b) |
| **Auto-assign public IP** | Enabled |
| **Security group** | Web Server security group |
| **Storage** | 1 volume — 8 GiB |
| **Termination protection** | Enabled |

A **User Data script** was added under Advanced Details to automatically install and start the Apache web server (`httpd`) on launch, and create a simple HTML page:

```bash
#!/bin/bash
yum -y install httpd
systemctl enable httpd
systemctl start httpd
echo '<html><h1>Hello From Your Web Server!</h1></html>' > /var/www/html/index.html
```
<img width="1920" height="1080" alt="6" src="https://github.com/user-attachments/assets/9362f320-8e2c-4ee9-a840-0b47f4a4d469" />

Termination protection was set to **Enable** during configuration to prevent accidental deletion of the instance.

The instance launched successfully and reached a **Running** state with all **3/3 status checks passed**.

<img width="1920" height="1080" alt="7" src="https://github.com/user-attachments/assets/10b3d5f9-2a42-4ab5-9c50-6550732e45c2" />


---

## Task 2 — Monitoring the Instance

With the instance running, the monitoring features of EC2 were explored.

### Status Checks
The **Status checks** tab confirmed that both checks had passed:
- **System reachability** — verifies that the underlying AWS infrastructure hosting the instance is healthy
- **Instance reachability** — verifies that the instance's operating system is responding correctly

### CloudWatch Monitoring
The **Monitoring** tab displayed Amazon CloudWatch metrics for the instance. As the instance had only recently launched, metrics were still populating. CloudWatch provides five-minute interval basic monitoring by default, with the option to enable one-minute detailed monitoring.

### Instance Screenshot

<img width="1920" height="1080" alt="8" src="https://github.com/user-attachments/assets/1a76c03b-5770-49c6-8721-bd3a31ff1a15" />

Using **Actions → Monitor and troubleshoot → Get Instance Screenshot**, a screenshot of the instance console was captured. The screenshot showed the instance booting **Amazon Linux (6.1.170-210.320.amzn2023.x86_64)**, confirming the operating system was loading correctly. This feature is particularly useful for diagnosing instances that are unreachable via SSH or RDP.

---

## Task 3 — Updating the Security Group and Accessing the Web Server

### Initial Access Attempt
The public IPv4 address of the instance was copied from the Details tab and entered into a browser. As expected, the page failed to load — the security group had no inbound rules permitting HTTP traffic on port 80.

This demonstrated the default-deny behaviour of AWS security groups, which block all inbound traffic unless an explicit allow rule is configured.

### Adding the HTTP Inbound Rule
To allow web traffic, the **Web Server security group** was updated:

1. Navigated to **EC2 → Security Groups → Web Server security group**
2. Selected the **Inbound rules** tab
3. Clicked **Edit inbound rules → Add rule**
4. Configured the rule:
   - **Type:** HTTP
   - **Protocol:** TCP
   - **Port range:** 80
   - **Source:** Anywhere-IPv4 (0.0.0.0/0)
5. Saved the rules

<img width="1920" height="1080" alt="9" src="https://github.com/user-attachments/assets/542ad263-7b9d-4c15-93e6-235358a10297" />

### Result
After refreshing the browser, the web server was successfully accessible, displaying:

<img width="1920" height="1080" alt="10" src="https://github.com/user-attachments/assets/21c8c7c3-b5b4-4e75-924e-7293b9240da0" />

> **Hello From Your Web Server!**

This confirmed that the User Data script had correctly installed and started the Apache web server during instance launch, and that the security group update had successfully opened port 80 to inbound traffic.

---

## Task 4 — Resizing the Instance and EBS Volume

As compute requirements change, EC2 instances can be resized without needing to be replaced. This task demonstrated both instance type and storage volume resizing.

### Step 1 — Stop the Instance
Before resizing, the instance was stopped via **Instance state → Stop instance**. The stop confirmation dialog confirmed:
- **Stop protection:** Disabled
- **Result:** Can stop

<img width="1920" height="1080" alt="12" src="https://github.com/user-attachments/assets/5ec5a224-5001-4b5f-a391-3645d41b9761" />

The instance successfully transitioned to a **Stopped** state.

### Step 2 — Change the Instance Type
With the instance stopped, the instance type was changed:

1. Navigated to **Actions → Instance Settings → Change instance type**
2. Selected **t3.small** as the new instance type
3. A side-by-side comparison was displayed:

| Attribute | t3.micro | t3.small |
|-----------|----------|----------|
| **Memory (MiB)** | 1024 | 2048 |
| **vCPUs** | 2 (1 core) | 2 (1 core) |
| **On-Demand Linux pricing** | $0.0104/hr | $0.0208/hr |

<img width="1920" height="1080" alt="15" src="https://github.com/user-attachments/assets/e74c2e57-c759-4106-8a3a-7a04296fda7f" />

4. Clicked **Change instance type** to apply

The console displayed a success banner: **Instance type changed successfully**.

### Step 3 — Resize the EBS Volume
The root EBS volume was expanded from 8 GiB to 10 GiB:

1. Navigated to **Elastic Block Store → Volumes**
2. Selected the volume and clicked **Actions → Modify Volume**
3. Changed the **Size (GiB)** from 8 to **10**
4. Clicked **Modify** and confirmed the operation

<img width="1920" height="1080" alt="17" src="https://github.com/user-attachments/assets/2a11e6dc-2e72-42d3-9e90-e94f7842d597" />

The confirmation dialog noted that the file system would need to be extended after the volume enters the optimising state — a standard step when expanding EBS volumes on a running instance.

### Step 4 — Start the Resized Instance
The instance was restarted via **Instance state → Start instance**. The instance returned to a **Running** state with the upgraded t3.small instance type and expanded 10 GiB storage volume.

<img width="1920" height="1080" alt="18" src="https://github.com/user-attachments/assets/9aa4f8dd-85b3-4c2c-8da5-0f80bd75fe5b" />

---

## Task 5 — Testing Termination Protection

This task demonstrated how termination protection prevents accidental deletion of EC2 instances.

### Attempt to Terminate (Protected)
With termination protection still enabled, an attempt was made to terminate the instance via **Instance state → Terminate (delete) instance**. The attempt was blocked and an error was returned confirming that the instance could not be terminated while protection was active.

### Disabling Termination Protection
Termination protection was disabled via **Actions → Instance Settings → Change termination protection**, unchecking **Enable** and saving.

The console confirmed: **Successfully removed termination protection for instance i-0ca05b6b1e5900717. The instance can be deleted.**

### Terminating the Instance
With protection disabled, the instance was successfully terminated via **Instance state → Terminate (delete) instance**. The termination dialog confirmed:

- **Instance ID:** i-0ca05b6b1e5900717 (Web Server)
- **Termination protection:** Disabled

<img width="1920" height="1080" alt="19" src="https://github.com/user-attachments/assets/5170eba4-c238-426c-a6a7-8575d19928e3" />

The instance was permanently terminated, completing the full EC2 instance lifecycle.

---

## Summary of Completed Tasks

| Task | Description | Status |
|------|-------------|--------|
| Task 1 | Launched EC2 instance with User Data and termination protection | ✅ Completed |
| Task 2 | Monitored instance via status checks, CloudWatch, and instance screenshot | ✅ Completed |
| Task 3 | Updated security group to allow HTTP:80 and accessed the web server | ✅ Completed |
| Task 4 | Resized instance from t3.micro to t3.small and expanded EBS from 8 to 10 GiB | ✅ Completed |
| Task 5 | Tested termination protection, disabled it, and terminated the instance | ✅ Completed |

---

## Key Takeaways

- **User Data scripts** allow automatic bootstrapping of software and configuration on instance launch, eliminating the need for manual post-launch setup.
- **Security groups** are stateful, allow-only firewalls. All inbound traffic is denied by default and must be explicitly permitted.
- **Instance monitoring** through CloudWatch and status checks provides real-time visibility into instance health and performance.
- **EC2 instances can be resized** by stopping the instance and changing the instance type — a non-destructive operation that preserves data on attached EBS volumes.
- **EBS volumes can be expanded** without downtime or data loss, making storage scaling straightforward.
- **Termination protection** is a critical safeguard for production workloads, preventing accidental permanent deletion of instances.

---

*Lab completed as part of the AWS re/Start programme.*
