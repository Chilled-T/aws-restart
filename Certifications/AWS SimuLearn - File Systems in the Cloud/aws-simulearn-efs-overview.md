# AWS SimuLearn: Centralized File Storage with Amazon EFS

## Business Scenario

A pet modeling agency needs a reliable way to share files across its branch offices — without the overhead of managing physical storage infrastructure. This SimuLearn assignment guides you through designing and building an AWS-based solution to meet that need.

---

## Overview

In this assignment, you review a real-world scenario and help a fictional customer design a solution on AWS. Once the design is complete, you build the proposed solution through structured, step-by-step guidance inside a live AWS Management Console environment.

You gain hands-on experience working with AWS services, developing job-ready competencies using the same tools technology professionals use every day.

---

## How It Works

AWS SimuLearn is powered by generative AI to help develop soft skills such as communication and problem-solving through life-like conversations with AI-generated customers.

- An **AI quiz agent** evaluates your conversation responses.
- An **AI helper agent, Dr. Newton**, is available whenever you get stuck.

After each solution-building conversation, you build and validate the solution in a live AWS Console environment — gaining practical, career-ready skills with real-world application.

---

## Learning Objectives

By the end of this assignment, you will be able to:

- Evaluate the different storage options available on AWS.
- Analyze the key features and benefits of Amazon EFS.
- Apply Amazon EFS solutions to specific business scenarios.
- Configure Amazon EFS endpoints for centralized storage access.

---

## AWS Services Used

| Service | Purpose |
|---|---|
| **Amazon Elastic Compute Cloud (EC2)** | Provides virtual servers that mount and access the shared file system |
| **Amazon Elastic File System (EFS)** | Provides a scalable, fully managed, shared file system accessible across multiple instances and offices |

---

## Key Concepts

### Amazon Elastic File System (EFS)

Amazon EFS is a serverless, fully elastic file storage service that automatically grows and shrinks as you add and remove files. It supports the **NFS protocol** and can be mounted concurrently on thousands of EC2 instances across multiple Availability Zones — making it ideal for shared storage use cases like the pet modeling agency's branch office file sharing needs.

**Key benefits:**
- No need to provision or manage storage capacity
- Highly available and durable across multiple Availability Zones
- Scales automatically to petabytes without disruption
- Accessible from multiple EC2 instances simultaneously

---

## Solution Architecture

```
Branch Office A (EC2) ─┐
                        ├──► Amazon EFS (Shared File System)
Branch Office B (EC2) ─┘
```

Each branch office connects to a centralized Amazon EFS file system via **mount targets**, enabling seamless file sharing without managing any physical storage hardware.

---

## Notes

> This assignment is part of the AWS SimuLearn program, which combines AI-powered conversations with hands-on lab experience in a real AWS environment. Completing this assignment contributes to building practical cloud skills aligned with AWS certifications and industry roles.
