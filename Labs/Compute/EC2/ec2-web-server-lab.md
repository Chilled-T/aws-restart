# AWS EC2 Lab: Launching a Web Server Instance

## Overview

This lab walks through launching an Amazon EC2 instance configured as a web server using a bootstrap script. The instance runs on Amazon Linux 2023, automatically installs Apache HTTP Server (httpd) on startup, and serves a simple HTML page. The final step configures the security group to allow inbound HTTP traffic from the internet.

---

## Lab Environment

| Setting | Value |
|---|---|
| Region | US West (Oregon) — `us-west-2` |
| AMI | Amazon Linux 2023 AMI 2023.11 (`ami-02166c47d457c16a3`) |
| Instance Type | `t3.micro` |
| Storage | 8 GiB (1 volume) |
| Availability Zone | `us-west-2a` |

---

## Step 1: Configure Instance Metadata and User Data

Before launching, the instance metadata settings were configured and a **User Data** script was provided to automate web server installation on first boot.

**Metadata settings:**
- Metadata version: **V2 only (token required)** — enforces IMDSv2 for improved security
- Metadata response hop limit: **2**
- Allow tags in metadata: **Select** (default)

**User Data script:**

```bash
#!/bin/bash
yum -y install httpd
systemctl enable httpd
systemctl start httpd
echo '<html><h1>Hello From Your Web Server!</h1></html>' > /var/www/html/index.html
```

This script runs automatically at first boot and does the following:

1. Installs the Apache HTTP Server (`httpd`) using `yum`
2. Enables the service so it starts automatically on reboot
3. Starts the service immediately
4. Writes a simple HTML page to the Apache web root at `/var/www/html/index.html`

<img width="1920" height="1080" alt="6" src="https://github.com/user-attachments/assets/e7b24a90-0119-4dab-96f3-a8e6b606ec0a" />

---

## Step 2: Launch the Instance

The instance was launched with the following summary:

- **Number of instances:** 1
- **Firewall:** New security group (created automatically)

After clicking **Launch instance**, the EC2 console confirmed the instance was created successfully.

---

## Step 3: Verify the Instance is Running

Navigating to **EC2 → Instances**, the instance named **Web Server** appeared with the following details:

| Field | Value |
|---|---|
| Instance ID | `i-0ca05b6b1e5900717` |
| Instance State | ✅ Running |
| Instance Type | `t3.micro` |
| Status Checks | ✅ 3/3 checks passed |
| Availability Zone | `us-west-2a` |
| Public IPv4 Address | `54.245.69.229` |
| Private IPv4 Address | `172.31.42.232` |
| Public DNS | `ec2-54-245-69-229.us-west-2.compute.amazonaws.com` |

---

## Step 4: Confirm Boot via Instance Diagnostics

To verify the instance booted correctly, the **Instance Screenshot** under **Instance Diagnostics** was used. The screenshot confirmed the instance had booted into:

```
Booting 'Amazon Linux (6.1.170-210.320.amzn2023.x86_64) 2023'
```

This confirms the Amazon Linux 2023 kernel loaded successfully and the user data script would have executed during the boot sequence.

---

## Step 5: Configure the Security Group for HTTP Access

By default, the auto-created security group did not allow inbound HTTP traffic. To allow access to the web server, an **inbound rule** was added to the security group `sg-07a79776a093479e5` (Web Server security group).

**Rule added:**

| Type | Protocol | Port Range | Source |
|---|---|---|---|
| HTTP | TCP | 80 | Anywhere IPv4 (`0.0.0.0/0`) |

> ⚠️ **Note:** Allowing `0.0.0.0/0` permits all IP addresses to reach the instance on port 80. For production environments, it is recommended to restrict access to known IP ranges only.

After clicking **Save rules**, the web server became publicly accessible via the instance's public IP address.

---

## Outcome

Navigating to `http://54.245.69.229` in a browser displayed the web page served by the EC2 instance:

```
Hello From Your Web Server!
```

This confirmed that:
- The EC2 instance launched and booted successfully
- The user data script executed and installed Apache correctly
- The security group was properly configured to allow inbound HTTP traffic

---

## Key Concepts Covered

- **User Data scripts** — automating software installation at instance launch using shell scripts
- **IMDSv2** — the more secure token-based instance metadata service
- **Security groups** — stateful virtual firewalls controlling inbound and outbound traffic to EC2 instances
- **Instance status checks** — system and instance-level health checks confirming the instance is reachable and functioning
- **Apache HTTP Server (httpd)** — a widely-used open-source web server deployed on the instance
