# Lab Completed: Linux Command Line

**Date Completed:** 21 May 2026  
**Student:** Tumelo  
**Duration:** ~30 minutes  
**Status:** ✅ Complete

---

## Task 1: Connect via SSH to an Amazon Linux EC2 Instance

### Steps Performed

1. Downloaded the `labsuser.pem` key file from the Vocareum lab credentials panel.

2. Opened a terminal and navigated to the Downloads directory:

```bash
cd ~/Downloads
```

3. Set the correct read-only permissions on the key file:

```bash
chmod 400 labsuser.pem
```

4. Connected to the EC2 instance via SSH using the provided public IP:

```bash
ssh -i labsuser.pem ec2-user@<public-ip>
```

5. Confirmed the host authenticity prompt by typing `yes`.

### Result

Successfully connected to the Amazon Linux 2 EC2 instance.

---

## Task 2: Run Familiar Commands

### Commands Run & Output

**1. Current username using autocomplete:**

```bash
whoami
```
Output: `ec2-user`

---

**2. Shortened hostname:**

```bash
hostname -s
```
Output: `ip-10-x-x-x`

---

**3. System uptime:**

```bash
uptime -p
```
Output: Time the instance has been running in a readable format (e.g. `up 3 minutes`).

---

> 📸 **[INSERT SCREENSHOT 1 HERE]**  
> *Screenshot showing the terminal output of the `whoami`, `hostname -s`, and `uptime -p` commands run in sequence.*  
> Suggested filename: `screenshot_task2_basic_commands.png`

---

**4. Logged-in users with details:**

```bash
who -H -a
```

Output displayed the following columns for all active sessions:

| Column | Description |
|---|---|
| Name | `ec2-user` |
| Line | Terminal/connection line |
| Time | Login timestamp |
| Idle | Idle time |
| PID | Process Identifier |
| Comment | Additional session info |
| Exit | Exit time (if applicable) |

---

**5. Date and time by timezone:**

```bash
TZ=America/New_York date
TZ=America/Los_Angeles date
```

Output: Current date and time displayed for New York and Los Angeles respectively.  
Format: `Weekday Month Day HH:MM:SS TZ YYYY`

---

**6. Julian calendar for current month:**

```bash
cal -j
```

Output: Current month displayed with Julian day numbers (counting consecutively from day 1 of the year).

Alternate calendar views also tested:

```bash
cal -s    # Calendar week starting Sunday
cal -m    # Calendar week starting Monday
```

---

**7. User ID and group information:**

```bash
id ec2-user
```

Output: Displayed the UID (user ID), GID (primary group ID), and all groups the `ec2-user` belongs to.

---

> 📸 **[INSERT SCREENSHOT 2 HERE]**  
> *Screenshot showing the terminal output of the `who -H -a`, `TZ=` date commands, `cal -j`, and `id ec2-user` commands.*  
> Suggested filename: `screenshot_task2_system_info.png`

---

## Task 3: Improve Workflow Through History and Search

### Steps Performed

**1. Viewed command history:**

```bash
history
```

Output: A numbered list of all commands run during the session, confirming all Task 2 commands were recorded.

---

**2. Reverse history search:**

- Pressed `Ctrl+R` to open the reverse search prompt.
- Typed `TZ` then pressed `Tab` to retrieve the previous `TZ=America/New_York date` command.
- Used arrow keys to edit the command inline before running.

---

**3. Reran the last command using `!!`:**

```bash
date
!!
```

Running `!!` after `date` re-executed the `date` command, confirming that `!!` reruns the most recent command.

---

> 📸 **[INSERT SCREENSHOT 3 HERE]**  
> *Screenshot showing the terminal output of the `history` command, the `Ctrl+R` reverse search in action, and the use of `!!` to rerun the last command.*  
> Suggested filename: `screenshot_task3_history_search.png`

---

## Key Takeaways

- Tab autocomplete (`Tab`) speeds up command entry and reduces typos — even partial commands like `whoa` expand to `whoami`.
- Commands like `whoami`, `hostname -s`, and `uptime -p` are quick diagnostics useful for troubleshooting an unfamiliar session.
- `who -H -a` provides a full picture of who is logged into a system — useful for multi-user environments.
- The `TZ=<timezone>` prefix lets you check the time in any timezone without changing system settings.
- Julian dates (`cal -j`) count days consecutively from 1 January — used in some industries and scheduling systems.
- `history`, `Ctrl+R`, and `!!` are powerful time-savers that eliminate the need to retype long or frequently used commands.

---

## Lab Completion

Selected **End Lab** in Vocareum and confirmed with **Yes**.  
Lab environment successfully terminated. ✅
