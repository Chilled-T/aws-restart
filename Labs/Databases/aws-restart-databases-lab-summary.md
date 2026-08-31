# AWS re/Start — Databases Module
### Lab Completion Summary

**Status:** ✅ Completed
**Track:** AWS re/Start Program
**Focus Area:** Relational & Cloud-Native Databases

---

## Overview

This module covered how data is structured, queried, and managed in relational databases, and how AWS's managed database services simplify hosting, scaling, and securing that data in the cloud.

---

## 1. Relational Database Concepts — Tables, Keys, and Relationships

**What I learned:**
- How data is organized into tables made up of rows (records) and columns (fields)
- The role of a **primary key** in uniquely identifying each record in a table
- How **foreign keys** create relationships between tables, enabling one-to-many and many-to-many structures
- Why normalization matters — reducing data redundancy while preserving relationships between entities

---

## 2. SQL Queries — SELECT, INSERT, UPDATE, DELETE

**What I learned:**
- **SELECT** — retrieving specific columns and rows, using `WHERE`, `ORDER BY`, `JOIN`, and aggregate functions to filter and shape results
- **INSERT** — adding new records into a table
- **UPDATE** — modifying existing records based on conditions
- **DELETE** — removing records safely, and the importance of `WHERE` clauses to avoid unintended data loss
- Practical exercises writing and running these queries against sample datasets

---

## 3. Amazon RDS (Relational Database Service) — Setup and Configuration

**What I learned:**
- How to launch a managed relational database instance using RDS, without manually provisioning or patching the underlying server
- Configuring engine type, instance size, storage, and initial database settings
- How RDS handles backups, patching, and maintenance windows automatically, reducing operational overhead compared to self-managed databases

---

## 4. Read Replicas for High Availability and Performance

**What I learned:**
- How Read Replicas offload read traffic from a primary database instance to improve performance under load
- The difference between Read Replicas (used for scaling reads) and Multi-AZ deployments (used for failover/high availability)
- How replication lag works and why it matters for applications reading from replicas

---

## 5. Database Security — Security Groups Restricting Access by Port

**What I learned:**
- How Security Groups act as a virtual firewall controlling inbound and outbound traffic to a database instance
- Restricting access to specific ports (e.g., MySQL on port 3306) and specific source IP ranges or security groups
- Why databases should never be broadly exposed to the internet, and how to scope access to only the application tier that needs it

---

## 6. Connecting Applications to Databases Securely

**What I learned:**
- How to configure connection strings and credentials for an application to reach an RDS instance
- Best practices around keeping database credentials out of application code (e.g., environment variables, secrets management)
- How network placement (private subnets) combines with Security Groups to ensure only authorized application servers can reach the database

---

## Key Takeaway

This module tied together data modeling, SQL fluency, and AWS-managed infrastructure — showing how a well-structured relational database, hosted securely on RDS, becomes a scalable and resilient backend for real applications. These principles directly apply to backend/data design decisions for future projects, including the data layer for the Kumo portfolio project.

---

*Module completed as part of the AWS re/Start Program.*
