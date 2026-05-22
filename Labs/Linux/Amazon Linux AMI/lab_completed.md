# Lab Completed: Introduction to an Amazon Linux AMI

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
ssh -i labsuser.pem ec2-user@35.92.113.47
```

5. Confirmed the host authenticity prompt by typing `yes`.

### Result

Successfully connected to the Amazon Linux 2 EC2 instance. The terminal displayed the Amazon Linux 2 welcome banner along with a notice that AL2 End of Life is 2026-06-30, and a recommendation to migrate to Amazon Linux 2023.

<img width="1366" height="768" alt="Screenshot From 2026-05-21 10-43-31" src="https://github.com/user-attachments/assets/4465fb90-b2b9-4f9f-a518-0f9d6e5e3862" />

---

## Task 2: Explore the Linux Man Pages

### Steps Performed

1. At the EC2 instance prompt, ran the following command to open the man page for `man`:

```bash
man man
```

2. Used the arrow keys to scroll through the man page and identified the following major section headers:

| Section Header | Purpose |
|---|---|
| `NAME` | Name of the command and a one-line description |
| `SYNOPSIS` | Syntax showing how the command is used |
| `DESCRIPTION` | Detailed explanation of the command and section numbers |
| `OVERVIEW` | High-level summary of the man page system |
| `EXAMPLES` | Practical usage examples |
| `FILES` | Files associated with the command |
| `OPTIONS` | Flags and arguments available |
| `SEE ALSO` | Related commands and references |

3. Reviewed the `DESCRIPTION` header, taking note of the numbered man page sections (e.g., Section 1 = executable programs/shell commands, Section 8 = system administration commands).

<img width="1366" height="768" alt="Screenshot From 2026-05-21 10-51-34" src="https://github.com/user-attachments/assets/27d6e1f5-ac46-4d11-b019-f2f43fa01f85" />

4. Exited the man pages by pressing `q`.

---

## Key Takeaways

- The `chmod 400` command restricts a `.pem` key file to read-only for the owner, which is required by SSH before it will accept the key.
- The `man` command is the built-in Linux help system. Running `man <command>` on any command gives you its full documentation.
- Man pages are divided into numbered sections. Section 1 covers everyday user commands, while higher sections cover system calls, library functions, and administration tools.
- Navigation within man pages uses standard `less` keybindings (`Space`, `b`, `/`, `q`).

---

## Lab Completion

Selected **End Lab** in Vocareum and confirmed with **Yes**.  
Lab environment successfully terminated. ✅
