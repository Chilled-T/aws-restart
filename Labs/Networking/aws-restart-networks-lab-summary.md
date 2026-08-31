# AWS re/Start — Networks Module
### Lab Completion Summary

**Status:** ✅ Completed
**Track:** AWS re/Start Program
**Focus Area:** Cloud Networking Fundamentals

---

## Overview

This module covered the foundational networking concepts that underpin all AWS cloud architectures — how resources connect, how traffic is isolated and controlled, and how systems scale to handle demand. Below is a summary of what was covered and demonstrated across each topic area.

---

## 1. Virtual Private Cloud (VPC) Architecture

A VPC is a logically isolated section of the AWS cloud where resources are launched into a private, user-defined network space.

**What I learned:**
- How to design a VPC with a custom CIDR range
- The relationship between a VPC, its Availability Zones, and the subnets within it
- Why isolation at the VPC level is central to AWS security and multi-tenant architecture
- How VPCs form the backbone that every other networking component (subnets, gateways, route tables) attaches to

---

## 2. Subnets — Public and Private

Subnets divide a VPC's IP address range into smaller segments, each tied to a specific Availability Zone.

**What I learned:**
- The difference between a **public subnet** (has a route to an Internet Gateway) and a **private subnet** (no direct route to the internet)
- How to place resources deliberately — e.g., web servers in public subnets, databases in private subnets — to reduce attack surface
- How subnet design supports high availability by spreading resources across multiple Availability Zones

---

## 3. Internet Gateways and Route Tables

**What I learned:**
- How an Internet Gateway (IGW) attaches to a VPC to enable communication between VPC resources and the internet
- How Route Tables determine where network traffic is directed, and how associating a route table with a subnet determines whether that subnet is "public" or "private"
- How to write and interpret routes (e.g., `0.0.0.0/0 → igw-xxxxxxxx`) to control traffic flow
- The dependency chain: a subnet is only truly "public" if it has both an IGW attached to the VPC *and* a route table entry pointing to it

---

## 4. NAT Gateways for Private Subnet Internet Access

**What I learned:**
- Why resources in private subnets sometimes still need outbound internet access (e.g., for software updates) without being directly reachable from the internet
- How a NAT Gateway, placed in a public subnet, allows private subnet resources to initiate outbound connections while blocking unsolicited inbound traffic
- The distinction between NAT Gateways (managed, scalable) and NAT Instances (self-managed, more control but more overhead)

---

## 5. DNS and IP Addressing (CIDR Notation)

**What I learned:**
- How to read and calculate CIDR blocks (e.g., `10.0.0.0/16`, `10.0.1.0/24`) and determine available host counts
- How subnetting a VPC's CIDR range into smaller blocks avoids IP overlap and supports scalable network design
- The role of DNS in resolving human-readable names to IP addresses within AWS (e.g., Route 53, VPC DNS resolution settings)
- Practical exercises in planning non-overlapping CIDR ranges across multiple subnets and VPCs

---

## 6. Load Balancers and Traffic Routing

**What I learned:**
- How Load Balancers distribute incoming traffic across multiple targets (EC2 instances, containers, etc.) to improve availability and fault tolerance
- The difference between Application Load Balancers (Layer 7, content-based routing) and Network Load Balancers (Layer 4, high-performance routing)
- How health checks are used to route traffic only to healthy targets
- How load balancing ties together VPC, subnet, and routing concepts into a working, scalable application architecture

---

## Key Takeaway

Together, these six areas form the complete picture of how traffic moves securely and reliably through an AWS environment — from raw IP address planning, through isolation and routing, to internet access and scalable traffic distribution. This foundation directly supports the architectural decisions needed for any future cloud projects, including designing secure, cost-conscious environments for portfolio and production work.

---

*Module completed as part of the AWS re/Start Program.*
