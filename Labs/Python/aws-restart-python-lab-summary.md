# AWS re/Start — Python Module
### Lab Completion Summary

**Status:** ✅ Completed
**Track:** AWS re/Start Program
**Focus Area:** Scripting & Automation for the Cloud

---

## Overview

This module covered Python as a tool for automating cloud tasks and processing data programmatically — from core language fundamentals through to using AWS's SDK to control cloud resources directly from code.

---

## 1. Python Fundamentals — Variables, Data Types, Loops, and Functions

**What I learned:**
- Core data types: strings, integers, floats, booleans, lists, dictionaries, and tuples
- Writing conditional logic (`if`/`elif`/`else`) and iterative logic (`for` and `while` loops)
- Defining and calling functions, including parameters, return values, and scope
- Structuring small scripts in a readable, reusable way rather than one long block of code

---

## 2. Working with Files and Directories

**What I learned:**
- Reading from and writing to files using Python's built-in file handling (`open`, context managers with `with`)
- Navigating and manipulating directories and file paths using modules like `os` and `pathlib`
- Parsing structured file formats (e.g., CSV, JSON) into Python data structures for processing

---

## 3. Interacting with AWS Services Using Boto3 (AWS SDK for Python)

**What I learned:**
- Setting up Boto3 clients and resources to interact with AWS services programmatically
- Performing operations such as listing, creating, and managing resources (e.g., S3 buckets, EC2 instances) directly from Python code
- Understanding the difference between the low-level `client` interface and the higher-level `resource` interface in Boto3
- How credentials and permissions (IAM) tie into what a Boto3 script is authorized to do

---

## 4. Automating Repetitive Cloud Tasks with Scripts

**What I learned:**
- Identifying manual, repetitive cloud operations that are good candidates for automation
- Writing scripts to perform batch operations (e.g., iterating over multiple resources and applying an action to each)
- The value of automation in reducing human error and freeing up time for higher-value work — a principle directly relevant to building operational tooling

---

## 5. Error Handling and Debugging

**What I learned:**
- Using `try`/`except` blocks to catch and handle exceptions gracefully instead of letting scripts crash
- Reading tracebacks to identify the root cause of an error
- Defensive scripting practices — validating inputs, handling AWS API errors (e.g., throttling, missing permissions), and logging useful debug information

---

## Key Takeaway

This module built the practical scripting skills needed to move from manually clicking through the AWS Console to controlling cloud infrastructure programmatically. Combining Python fundamentals with Boto3 opens the door to real automation — a core skill for building internal tooling, and directly applicable to the kind of GenAI/automation-focused portfolio project being planned for Kumo.

---

*Module completed as part of the AWS re/Start Program.*
