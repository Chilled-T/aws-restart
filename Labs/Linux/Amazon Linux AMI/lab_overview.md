# Lab Overview: Introduction to an Amazon Linux AMI

## Summary

This lab introduces the basics of the Linux command line interface (CLI) by connecting to an Amazon Linux EC2 instance via SSH and exploring the built-in Linux manual (man) pages.

---

## Duration

⏱ Approximately **30 minutes**

---

## Objectives

By the end of this lab, you will be able to:

- Use SSH to connect to an Amazon Linux AMI within Vocareum labs
- Understand the purpose of the `man` command
- Demonstrate the search feature of the man pages
- Examine man page headers and section structure

---

## Pre-built Lab Components

The following AWS infrastructure is provisioned automatically:

| Component | Description |
|---|---|
| Amazon EC2 (Command Host) | A `t3.micro` instance in a public subnet used to run lab commands |
| Public Subnet | Network segment hosting the EC2 instance |
| Amazon VPC | Virtual Private Cloud containing the lab environment |

> **Note:** The `t3.micro` instance has 1 virtual CPU and 1 GiB of memory.

---

## Tasks

### Task 1: Connect via SSH

Connect to the Amazon Linux EC2 instance using SSH credentials provided by the lab environment.

**macOS / Linux:**

```bash
cd ~/Downloads
chmod 400 labsuser.pem
ssh -i labsuser.pem ec2-user@<public-ip>
```

**Windows:** Download the `.ppk` file and connect using PuTTY.

> Type `yes` when prompted about host authenticity on first connection.

---

### Task 2: Explore the Linux Man Pages

Open the manual page for the `man` command itself:

```bash
man man
```

**Navigation keys:**

| Key | Action |
|---|---|
| `↑` / `↓` | Scroll line by line |
| `Space` | Scroll down one page |
| `b` | Scroll back one page |
| `/keyword` | Search for a term |
| `n` | Jump to next search match |
| `q` | Quit / exit the man page |

**Key man page sections to look for:**

- `NAME` — Command name and brief description
- `SYNOPSIS` — Syntax and usage pattern
- `DESCRIPTION` — Detailed explanation, including section numbers
- `OPTIONS` — Available flags and arguments
- `EXAMPLES` — Usage examples
- `FILES` — Related files
- `SEE ALSO` — Related commands and references

> **Tip:** Pay particular attention to the `DESCRIPTION` section — it lists the numbered sections of the man page system (e.g., Section 1 = user commands, Section 8 = system admin).

Exit the man pages when done:

```bash
q
```

---

## Key Command Reference

| Command | Purpose |
|---|---|
| `ssh -i labsuser.pem ec2-user@<ip>` | Connect to the EC2 instance |
| `chmod 400 labsuser.pem` | Set correct permissions on the key file |
| `man man` | Open the manual page for `man` |
| `q` | Exit any man page |

---

## Additional Resources

- [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- [Amazon Machine Images (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
- [Status Checks for Your Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html)
- [Amazon EC2 Service Quotas](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-resource-limits.html)
