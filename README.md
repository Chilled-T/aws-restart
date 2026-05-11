# AWS re/Start Programme Portfolio

![AWS re/Start](https://img.shields.io/badge/AWS-re%2FStart-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Progress-brightgreen?style=for-the-badge)

## About This Portfolio

This repository documents my learning journey through the **AWS re/Start programme** — a full-time, classroom-based workforce development programme that prepares individuals for careers in cloud computing. Here you'll find projects, labs, notes, and hands-on exercises covering the core competencies of the programme.

---

## Programme Overview

AWS re/Start is designed to equip learners with the foundational cloud skills needed to pursue roles such as Cloud Support Associate, Junior Cloud Engineer, and Systems Administrator. The programme combines instructor-led training with real-world lab environments powered by Amazon Web Services.

---

## Subjects Covered

### 🔒 Security
Exploring the principles of cloud security and AWS's shared responsibility model.

- IAM (Identity and Access Management) — users, groups, roles, and policies
- Security Groups and Network ACLs
- Multi-Factor Authentication (MFA)
- Principle of least privilege
- AWS CloudTrail and monitoring for compliance
- Encryption at rest and in transit

---

### 🌐 Networks
Understanding how cloud networking enables connectivity, isolation, and scalability.

- Virtual Private Cloud (VPC) architecture
- Subnets — public and private
- Internet Gateways and Route Tables
- NAT Gateways for private subnet internet access
- DNS and IP addressing (CIDR notation)
- Load Balancers and traffic routing

---

### ☁️ AWS Console and Compute
Navigating the AWS Management Console and provisioning cloud compute resources.

- AWS Management Console navigation
- Amazon EC2 — launching, configuring, and managing instances
- Instance types — General Purpose, Compute Optimized, Memory Optimized, and more
- Amazon Machine Images (AMIs) and Launch Templates
- Elastic IP addresses and key pairs
- Auto Scaling Groups and scheduled scaling policies
- Amazon EFS (Elastic File System) — mounting shared storage across instances

---

### 🐍 Python
Writing scripts to automate cloud tasks and process data programmatically.

- Python fundamentals — variables, data types, loops, and functions
- Working with files and directories
- Interacting with AWS services using Boto3 (AWS SDK for Python)
- Automating repetitive cloud tasks with scripts
- Error handling and debugging

---

### 🗄️ Databases
Managing and querying relational and cloud-native databases.

- Relational database concepts — tables, keys, and relationships
- SQL queries — SELECT, INSERT, UPDATE, DELETE
- Amazon RDS (Relational Database Service) — setup and configuration
- Read Replicas for high availability and performance
- Database security — Security Groups restricting access by port (e.g. MySQL port 3306)
- Connecting applications to databases securely

---

### 🐧 Linux
Using the Linux command line to manage systems and automate operations.

- Linux file system structure and navigation
- File and directory management — `mkdir`, `ls`, `cd`, `cp`, `mv`, `rm`
- File permissions and ownership — `chmod`, `chown`
- Package management — `yum`, `apt`
- Shell scripting basics
- Process management and system monitoring
- Connecting to EC2 instances via SSH and EC2 Instance Connect

---

## Labs and Projects

| Lab | Subject | Description |
|-----|---------|-------------|
| VPC & Networking Setup | Networks | Configured a VPC with public/private subnets, IGW, and route tables |
| IAM User & Group Management | Security | Created IAM users, groups, and attached least-privilege policies |
| EC2 Launch & Auto Scaling | Compute | Deployed EC2 instances and configured Auto Scaling across multiple AZs |
| EFS Mount on EC2 | Compute / Linux | Mounted an Amazon EFS file system to EC2 instances across Availability Zones |
| RDS Read Replica | Databases | Created a read replica of a primary RDS database instance |
| Security Group Configuration | Security / Networks | Configured inbound/outbound rules restricting traffic by port and source |
| Python Automation Scripts | Python | Wrote scripts to interact with AWS services using Boto3 |
| Linux Shell Operations | Linux | Practised command-line navigation, permissions, and shell scripting |

---

## Skills Gained

- Deploying and managing cloud infrastructure on AWS
- Designing secure, highly available network architectures
- Writing Python scripts to automate cloud operations
- Managing Linux-based servers via the command line
- Configuring and querying relational databases in the cloud
- Applying AWS security best practices across services

---

## Certification Goal

🎯 **AWS Certified Cloud Practitioner (CLF-C02)**

This programme prepares learners for the AWS Cloud Practitioner certification, validating foundational cloud knowledge across compute, networking, security, databases, and pricing.

---

## Contact

Feel free to connect or reach out if you'd like to discuss cloud computing, the AWS re/Start programme, or any of the projects in this portfolio.

---

*This portfolio is continuously updated as I progress through the AWS re/Start programme.*
