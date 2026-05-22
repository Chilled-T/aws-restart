# Managing Users and Groups — Lab Overview

## Objectives

By the end of this lab, you will be able to:

- Create new users with a default password
- Create groups and assign the appropriate users
- Log in as different users

---

## Duration

Approximately **45 minutes**

---

## Task 1: Connect via SSH

Connect to an Amazon Linux EC2 instance using SSH.

**Windows users:** Download the `.ppk` file and connect using PuTTY.

**macOS/Linux users:**

```bash
cd ~/Downloads
chmod 400 labsuser.pem
ssh -i labsuser.pem ec2-user@<public-ip>
```

---

## Task 2: Create Users

Create the following users using `sudo useradd <User ID>` and set their passwords using `sudo passwd <User ID>`.

| First Name | Last Name | User ID    | Job Role           | Starting Password |
|------------|-----------|------------|--------------------|-------------------|
| Alejandro  | Rosalez   | arosalez   | Sales Manager      | P@ssword1234!     |
| Efua       | Owusu     | eowusu     | Shipping           | P@ssword1234!     |
| Jane       | Doe       | jdoe       | Shipping           | P@ssword1234!     |
| Li         | Juan      | ljuan      | HR Manager         | P@ssword1234!     |
| Mary       | Major     | mmajor     | Finance Manager    | P@ssword1234!     |
| Mateo      | Jackson   | mjackson   | CEO                | P@ssword1234!     |
| Nikki      | Wolf      | nwolf      | Sales Representative | P@ssword1234!   |
| Paulo      | Santos    | psantos    | Shipping           | P@ssword1234!     |
| Sofia      | Martinez  | smartinez  | HR Specialist      | P@ssword1234!     |
| Saanvi     | Sarkar    | ssarkar    | Finance Specialist | P@ssword1234!     |

**Key commands:**

```bash
# Add a user
sudo useradd arosalez

# Set password (enter P@ssword1234! when prompted)
sudo passwd arosalez

# Verify all users were created
sudo cat /etc/passwd | cut -d: -f1
```

> **Note:** Add each user **one at a time** — `useradd` only accepts a single username per command.

---

## Task 3: Create Groups

Create the following groups and add users to them.

### Groups to Create

```bash
sudo groupadd Sales
sudo groupadd HR
sudo groupadd Finance
sudo groupadd Shipping
sudo groupadd Managers
sudo groupadd CEO
```

### Group Memberships

| Group    | Members                          |
|----------|----------------------------------|
| Sales    | arosalez, nwolf, ec2-user        |
| HR       | ljuan, smartinez, ec2-user       |
| Finance  | mmajor, ssarkar, ec2-user        |
| Shipping | eowusu, jdoe, psantos, ec2-user  |
| Managers | arosalez, ljuan, mmajor, ec2-user|
| CEO      | mjackson, ec2-user               |

> **Note:** Add `ec2-user` to **all** groups. Managers are also Personnel, but not all Personnel are Managers — some users belong to multiple groups.

**Key command:**

```bash
# Add a user to a group
sudo usermod -a -G Sales arosalez

# Verify group memberships
sudo cat /etc/group
```

---

## Task 4: Log In as a New User

Switch to a created user and test permissions.

```bash
# Switch to arosalez
su arosalez
# Password: P@ssword1234!

# Check current directory
pwd

# Attempt to create a file (will be denied — no write permission here)
touch myFile.txt

# Attempt with sudo (will also be denied — arosalez is not a sudoer)
sudo touch myFile.txt

# Return to ec2-user
exit

# View the security log to see the recorded sudo violation
sudo cat /var/log/secure
```

> **Key concept:** Only designated **sudoers** can run commands requiring root privileges. Unauthorized sudo attempts are automatically logged in `/var/log/secure`.

---

## Summary

| Task | What You Did |
|------|--------------|
| Task 1 | Connected to an EC2 instance via SSH |
| Task 2 | Created 10 users with default passwords |
| Task 3 | Created 6 groups and assigned users to them |
| Task 4 | Logged in as a user and observed permission restrictions |
