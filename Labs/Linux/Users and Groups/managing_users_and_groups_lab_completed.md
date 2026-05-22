# Managing Users and Groups — Lab Completed Report

**Lab:** Managing Users and Groups
**Duration:** ~45 minutes
**Status:** ✅ Completed

---

## Task 1: SSH Connection to EC2 Instance

Connected to the Amazon Linux EC2 instance via SSH using the provided `.pem` key file.

```bash
ssh -i labsuser.pem ec2-user@<public-ip>
```
<img width="1366" height="768" alt="Screenshot From 2026-05-21 11-43-09" src="https://github.com/user-attachments/assets/50806beb-fbfb-4f66-9430-9460ca647f0a" />

---

## Task 2: Create Users

### Step 1 — Verified home directory

```bash
pwd
```
---

### Step 2 — Added first user (arosalez) and set password

```bash
sudo useradd arosalez
sudo passwd arosalez
```
---

### Step 3 — Added remaining users one by one

```bash
sudo useradd eowusu
sudo passwd eowusu

sudo useradd jdoe
sudo passwd jdoe

sudo useradd ljuan
sudo passwd ljuan

sudo useradd mmajor
sudo passwd mmajor

sudo useradd mjackson
sudo passwd mjackson

sudo useradd nwolf
sudo passwd nwolf

sudo useradd psantos
sudo passwd psantos

sudo useradd smartinez
sudo passwd smartinez

sudo useradd ssarkar
sudo passwd ssarkar
```
---

### Step 4 — Validated all users were created

```bash
sudo cat /etc/passwd | cut -d: -f1
```
---

## Task 3: Create Groups

### Step 1 — Created all groups

```bash
sudo groupadd Sales
sudo groupadd HR
sudo groupadd Finance
sudo groupadd Shipping
sudo groupadd Managers
sudo groupadd CEO
```
---

### Step 2 — Verified groups were created

```bash
cat /etc/group
```
---

### Step 3 — Added users to their groups

```bash
# Sales
sudo usermod -a -G Sales arosalez
sudo usermod -a -G Sales nwolf

# HR
sudo usermod -a -G HR ljuan
sudo usermod -a -G HR smartinez

# Finance
sudo usermod -a -G Finance mmajor
sudo usermod -a -G Finance ssarkar

# Shipping
sudo usermod -a -G Shipping eowusu
sudo usermod -a -G Shipping jdoe
sudo usermod -a -G Shipping psantos

# Managers
sudo usermod -a -G Managers arosalez
sudo usermod -a -G Managers ljuan
sudo usermod -a -G Managers mmajor

# CEO
sudo usermod -a -G CEO mjackson

# Add ec2-user to all groups
sudo usermod -a -G Sales ec2-user
sudo usermod -a -G HR ec2-user
sudo usermod -a -G Finance ec2-user
sudo usermod -a -G Shipping ec2-user
sudo usermod -a -G Managers ec2-user
sudo usermod -a -G CEO ec2-user
```
---

### Step 4 — Verified final group memberships

```bash
sudo cat /etc/group
```
<img width="1366" height="768" alt="Screenshot From 2026-05-21 12-18-41" src="https://github.com/user-attachments/assets/8247852b-ba75-465e-b565-202be7cb5d6e" />

>
> ```
> Sales:x:1014:arosalez,nwolf,ec2-user
> HR:x:1015:ljuan,smartinez,ec2-user
> Finance:x:1016:mmajor,ssarkar,ec2-user
> Shipping:x:1017:eowusu,jdoe,psantos,ec2-user
> Managers:x:1018:arosalez,ljuan,mmajor,ec2-user
> CEO:x:1019:mjackson,ec2-user
> ```

---

## Task 4: Log In as a New User

### Step 1 — Switched to arosalez

```bash
su arosalez
# Password: P@ssword1234!
```

---

### Step 2 — Verified current directory

```bash
pwd
```

---

### Step 3 — Attempted to create a file (permission denied)

```bash
touch myFile.txt
```
> `touch: cannot touch 'myFile.txt': Permission denied`
---

### Step 4 — Attempted sudo (not a sudoer)

```bash
sudo touch myFile.txt
```
> `arosalez is not in the sudoers file. This incident will be reported.`
---

### Step 5 — Exited back to ec2-user

```bash
exit
```
---

### Step 6 — Reviewed the security log

```bash
sudo cat /var/log/secure
```
<img width="1366" height="768" alt="Screenshot From 2026-05-21 12-24-14" src="https://github.com/user-attachments/assets/7073df5e-c55f-44c7-89ae-840f122a0de0" />

> `sudo: arosalez : user NOT in sudoers ; TTY=pts/1 ; PWD=/home/ec2-user ; USER=root ; COMMAND=/bin/touch myFile.txt`

---

## Summary

| Task   | Description                              | Status |
|--------|------------------------------------------|--------|
| Task 1 | SSH into EC2 instance                    | ✅ Done |
| Task 2 | Created 10 users with default passwords  | ✅ Done |
| Task 3 | Created 6 groups and assigned all users  | ✅ Done |
| Task 4 | Tested user permissions and sudo logging | ✅ Done |

---

*Lab completed successfully.*
