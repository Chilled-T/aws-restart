# Lab: Linux Command Line

**Duration:** ~30 minutes  
**Note:** This lab relies on previous courseware and lab information (see: *Introduction to an Amazon Linux AMI*).

---

## Objectives

By the end of this lab, you will be able to:

- Run commands to gain knowledge of your current system and session
- Search and run previous bash commands

---

## Pre-built Lab Components

| Component | Description |
|---|---|
| Amazon EC2 (Command Host) | A `t3.micro` instance (1 vCPU, 1 GiB RAM) used to run all lab commands |

---

## Task 1: Connect via SSH

Connect to the Amazon Linux EC2 instance using the credentials provided by the Vocareum lab environment.

**macOS / Linux:**

```bash
cd ~/Downloads
chmod 400 labsuser.pem
ssh -i labsuser.pem ec2-user@<public-ip>
```

**Windows:** Download the `.ppk` file and connect using PuTTY.

> Type `yes` when prompted about host authenticity on first connection.

---

## Task 2: Run Familiar Commands

Run the following commands to gain general knowledge about your system and current session.

### Current User

```bash
whoami
```

> Returns the current logged-in username (e.g. `ec2-user`).  
> **Tip:** Type `whoa` and press `Tab` — bash autocomplete will complete it to `whoami`.

---

### Hostname

```bash
hostname -s
```

> Displays a shortened version of the machine's hostname (e.g. `ip-10-x-x-x`).

---

### System Uptime

```bash
uptime -p
```

> Displays how long the system has been running in a human-readable format.

---

### Logged-in Users

```bash
who -H -a
```

> Displays information about all users currently logged in, including:

| Column | Description |
|---|---|
| Name | Username |
| Line | Terminal/connection line |
| Time | Login time |
| Idle | Idle time |
| PID | Process Identifier |
| Comment | Additional info |
| Exit | Exit time (if applicable) |

---

### Date & Time by Timezone

```bash
TZ=America/New_York date
TZ=America/Los_Angeles date
```

> Displays the current date and time for the specified timezone.  
> Output format: `Weekday Month Day HH:MM:SS TZ YYYY`

> **Note:** If your system clock is not set correctly, the output will be incorrect.

---

### Julian Calendar

```bash
cal -j
```

> Displays the current month with Julian dates. Julian dates count consecutively from day 1 of the year without resetting at the start of each month (e.g. February 1 = day 32).

```bash
cal -s    # Week starting Sunday
cal -m    # Week starting Monday
```

> **Tip:** Run `man cal` for a full list of calendar display options.

---

### User ID & Group Info

```bash
id ec2-user
```

> Displays the user ID (UID), primary group ID (GID), and all groups the user belongs to.

---

## Task 3: Improve Workflow Through History and Search

Reuse previous commands efficiently using bash history tools.

### View Command History

```bash
history
```

> Displays a numbered list of all previously entered commands in the current session.

---

### Reverse History Search

```
Ctrl + R
```

> Opens an interactive reverse history search. Start typing a portion of a previous command to find it.  
> Example: Press `Ctrl+R`, type `TZ`, then press `Tab` to bring up the previous `date` command for inline editing.

> **Note:** You must use `Tab` to autocomplete and make the command editable. Arrow keys allow inline editing before running.

---

### Rerun the Last Command

```bash
!!
```

> Re-executes the most recently run command.  
> Example: After running `date`, entering `!!` will run `date` again.

---

## Command Quick Reference

| Command | Description |
|---|---|
| `whoami` | Display current username |
| `hostname -s` | Display shortened hostname |
| `uptime -p` | Display system uptime (readable format) |
| `who -H -a` | Show all logged-in users with details |
| `TZ=<timezone> date` | Display date/time for a specific timezone |
| `cal -j` | Display current month in Julian date format |
| `cal -s` / `cal -m` | Display calendar starting Sun / Mon |
| `id <user>` | Show UID, GID, and group memberships |
| `history` | List command history |
| `Ctrl+R` | Reverse search through command history |
| `!!` | Re-run the last command |

---

## Additional Resources

- [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- [Amazon Machine Images (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
- [Status Checks for Your Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-system-instance-status-check.html)
- [Amazon EC2 Service Quotas](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-resource-limits.html)
