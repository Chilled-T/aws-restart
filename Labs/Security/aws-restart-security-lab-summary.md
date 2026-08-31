# AWS re/Start — Security Module
### Lab Completion Summary

**Status:** ✅ Completed
**Track:** AWS re/Start Program
**Focus Area:** Cloud Security & the Shared Responsibility Model

---

## Overview

This module covered the principles and tools AWS provides to secure cloud environments, and how responsibility for security is split between AWS and the customer.

---

## 1. IAM (Identity and Access Management) — Users, Groups, Roles, and Policies

**What I learned:**
- The difference between IAM **users** (individual identities), **groups** (collections of users sharing permissions), and **roles** (temporary, assumable identities for services or federated access)
- How **policies** (JSON documents) define exactly what actions an identity can perform on which resources
- Best practices such as avoiding use of the root account for daily tasks and assigning permissions through groups/roles rather than directly to individual users

---

## 2. Security Groups and Network ACLs

**What I learned:**
- How Security Groups act as a stateful, instance-level firewall controlling inbound/outbound traffic
- How Network ACLs act as a stateless, subnet-level firewall, evaluated in addition to Security Groups
- When to use each layer together for defense in depth, rather than relying on just one

---

## 3. Multi-Factor Authentication (MFA)

**What I learned:**
- Why MFA adds a critical second layer of protection beyond just a password
- How to enable and configure MFA on IAM accounts, including virtual MFA devices
- Why MFA is especially important for privileged accounts (e.g., root, admin-level IAM users)

---

## 4. Principle of Least Privilege

**What I learned:**
- The core idea of granting only the minimum permissions necessary for a task, and nothing more
- How overly broad permissions increase the "blast radius" if credentials are ever compromised
- Practical application: scoping IAM policies down to specific actions and resources rather than using wildcard permissions

---

## 5. AWS CloudTrail and Monitoring for Compliance

**What I learned:**
- How CloudTrail logs API calls and account activity across an AWS environment
- Using CloudTrail logs to audit who did what, when, and from where — supporting both security investigations and compliance requirements
- How monitoring and logging tie into a broader security posture, enabling detection rather than just prevention

---

## 6. Encryption at Rest and in Transit

**What I learned:**
- **Encryption at rest** — protecting stored data (e.g., in S3, RDS, EBS) using encryption keys, including AWS KMS-managed keys
- **Encryption in transit** — protecting data as it moves across networks, typically via TLS/SSL
- Why both forms of encryption are necessary together, since securing data in one state doesn't protect it in the other

---

## Key Takeaway

This module reinforced that security in the cloud is a shared responsibility: AWS secures the underlying infrastructure, while the customer is responsible for configuring identity, access, network controls, and encryption correctly. These principles — least privilege, layered network controls, MFA, and auditability — form the security baseline that should be applied to any project built on AWS, including the Kumo portfolio project.

---

*Module completed as part of the AWS re/Start Program.*
