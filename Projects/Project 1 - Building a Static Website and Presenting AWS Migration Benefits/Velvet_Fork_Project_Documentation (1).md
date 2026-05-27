# Velvet Fork — Project Documentation
### Praesignis AWS re/Start | Project 1

---

## 1. Project Overview

**Velvet Fork** is a fine cuisine restaurant struggling with manual booking and order management — double bookings, order mix-ups, and no central system to track customers.

Our solution: build a clean static website for Velvet Fork and host it on **Amazon S3**, while researching additional AWS services that could take the restaurant fully digital.

---

## 2. Team Members

| Name | Role | What They Did |
|------|------|---------------|
| `Tumelo` | `Front-end development` | `HTML, CSS, JavaScript`| 
| `Katlego` | `Content creation` | `writing text, organizing images`| 
| `Vincent` | `AWS hosting & AWS deployment` | `Amazon S3 static web-hosting`| 
| `Neo` | `Github management` | `repo setup,commits,pull requests, project summary`| 
| `Minenhle` | `Presentation` | `PowerPoint,visuals,explaining AWS benefits`|

---

## 3. The Website

We built a simple, elegant website for Velvet Fork with the following pages:

- **Home** — Restaurant intro and navigation
- **Menu** — Fine cuisine dishes by category
- **Bookings** — Form to reserve a table
- **Reviews** — See reviews from our customers
- **Gallery** — View our fine dishes
- **Philosophy** — Understand more about the resturant

**Design approach:** Dark navy and gold tones, serif headings, and high-quality food photography — keeping the luxury feel of the brand.

---

📸 *Screenshot — Home Page*
<img width="1888" height="953" alt="Screenshot 2026-05-25 113206" src="https://github.com/user-attachments/assets/9706e4a5-7ffe-4f91-a52c-cd6e8a2fd6bc" />



---

📸 *Screenshot — Booking Form*
<img width="1787" height="961" alt="ss bk" src="https://github.com/user-attachments/assets/d9b787ab-d50c-4877-a41d-e217a20eb9d6" />

---

📸 *Screenshot — Review Page*
<img width="1814" height="946" alt="ss rv" src="https://github.com/user-attachments/assets/ae769897-7ec7-4c7e-8ed3-5038dd0690a8" />

---

📸 *Screenshot — Gallery Page*
<img width="1721" height="966" alt="ss gl" src="https://github.com/user-attachments/assets/7d64b26b-82ea-404d-9a3d-cd27b2b72b26" />

---

## 4. How We Hosted It — Amazon S3

### What is S3?
Amazon S3 is AWS's cloud storage service. It lets you store files online and, with **Static Website Hosting** enabled, serve those files directly as a website — no server needed.

### How We Used It
- Uploaded all HTML, CSS, JS, and image files to an S3 bucket
- Enabled Static Website Hosting to make it publicly accessible
- Used the S3-generated URL to access the live site

### Setup Steps

**Step 1 — Create a Bucket**
Go to S3 → Create Bucket → name it (e.g. `velvet-fork-website`) → uncheck "Block all public access"

<img width="1346" height="601" alt="Screenshot 2026-05-25 100335" src="https://github.com/user-attachments/assets/b4c004d7-4754-4b25-9b68-967fd230fbd5" />

---

**Step 2 — Enable Static Website Hosting**
Bucket → Properties → Static website hosting → Enable → set index document to `index.html`

<img width="1344" height="603" alt="Screenshot 2026-05-25 100401" src="https://github.com/user-attachments/assets/eef2edcf-60e1-49bd-9a78-285aae6d9df0" />

---

**Step 3 — Upload Files**
Click Upload → add all website files (HTML, CSS, JS, images)

<img width="1346" height="601" alt="Screenshot 2026-05-25 100335" src="https://github.com/user-attachments/assets/b4c004d7-4754-4b25-9b68-967fd230fbd5" />

---

**Step 4 — Add Bucket Policy**
Bucket → Permissions → Bucket Policy → paste this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::velvet-fork-website/*"
    }
  ]
}
```

<img width="1336" height="600" alt="Screenshot 2026-05-25 100509" src="https://github.com/user-attachments/assets/6e131cc3-e3fa-46d0-856e-c63752ef14c9" />

---

**Step 5 — Go Live**
Bucket → Properties → copy the website endpoint URL → open in browser ✅

<img width="1366" height="768" alt="Screenshot (65)" src="https://github.com/user-attachments/assets/a29e9d40-545e-4f36-9a76-d860510cffac" />


---

## 5. Other AWS Services (Research)

We only used S3 for this project, but here are the other services we researched and how they would fit:

| Service | What It Does | How It Would Help Velvet Fork |
|---------|-------------|-------------------------------|
| **AWS Cognito** | Manages user sign-up and login | Customers could log in to view and manage their bookings |
| **Amazon DynamoDB** | Cloud database (NoSQL) | Stores all booking and order data in one place |
| **Amazon RDS** | Cloud database (SQL) | Alternative to DynamoDB for structured customer data |
| **AWS Lambda** | Runs code automatically when triggered | Sends confirmation emails when a booking is made |
| **Amazon SNS** | Sends notifications (SMS, email) | Alerts restaurant staff instantly about new orders |

---

## 6. Challenges Faced & How We Solved Them

These are the real-world problems Velvet Fork was experiencing before this project — and how our AWS solution addresses each one.

| Challenge | The Problem | Our Solution | What It Means for the Restaurant |
|-----------|-------------|--------------|-----------------------------------|
| **Double Bookings** | Staff were recording reservations manually, leading to two customers being booked for the same table at the same time | The online booking form on the website gives customers a single, centralised place to reserve a table | No more overlapping reservations — every booking is captured digitally and can be tracked |
| **Order Mix-Ups** | Phone and walk-in orders were written down by hand, causing wrong dishes to be delivered and unhappy customers | The online order form lets customers select and submit their own orders directly, removing the human error of manual capturing | Orders are clear, accurate, and submitted exactly as the customer intended |
| **No Central System** | The owner had no single place to view all bookings and orders — information was scattered across paper records and spreadsheets | With a database backend (DynamoDB), all bookings and orders go into one place that can be accessed anytime | The owner can see everything in one dashboard — no more searching through papers or spreadsheets |
| **Couldn't Identify Repeat Customers** | Without a login system, the restaurant had no way to recognise returning customers or track their preferences | AWS Cognito allows customers to create accounts, so the restaurant can build a profile of returning guests over time | Better customer relationships and the ability to personalise the experience for loyal diners |
| **Hard to Scale** | Handling more customers meant hiring more staff just to manage bookings and orders — expensive and slow | AWS scales automatically — more website traffic doesn't require more staff or new hardware | The restaurant can grow without increasing admin costs |

---

## 7. What We Learned

- **S3 is simple and powerful** — hosting a website costs almost nothing and requires no server setup
- **Permissions matter** — AWS is secure by default; you have to deliberately open access
- **Plan before you build** — understanding the full AWS architecture helped us design with future features in mind
- **Static sites have limits** — for real form submissions and data storage, you need Lambda and DynamoDB
- **Explaining tech in plain language is a skill** — presenting AWS benefits to a restaurant owner taught us to think from a business perspective, not just a technical one

---

## 8. Presentation Outline

| Slide | Topic | Key Points |
|-------|-------|------------|
| 1 | Title | Project name, team, date |
| 2 | About Velvet Fork | Restaurant background, the problem they faced |
| 3 | Challenges | Double bookings, order errors, no digital system |
| 4 | Our Solution | S3-hosted website + future AWS services |
| 5 | The Website | Screenshots of pages we built |
| 6 | How S3 Works | Hosting setup walkthrough |
| 7 | Other AWS Services | Cognito, DynamoDB, Lambda, SNS explained simply |
| 8 | Cost Breakdown | ~$1.50–$7/month vs. on-premises costs |
| 9 | AWS Benefits | Available 24/7, scalable, low cost, no hardware |
| 10 | Conclusion | Recommendation to adopt AWS, starting with S3 |

><img width="1189" height="476" alt="Screenshot 2026-05-21 133502" src="https://github.com/user-attachments/assets/30bed894-f367-4252-b58d-1a0efc931bf7" />
><img width="1181" height="459" alt="Screenshot 2026-05-21 133635" src="https://github.com/user-attachments/assets/ea90b9ec-528b-4358-b9c5-b8719b979d85" />
<img width="1171" height="467" alt="Screenshot 2026-05-21 133725" src="https://github.com/user-attachments/assets/1759da57-42c1-421c-97b0-0af473cb0ab7" />
<img width="1176" height="472" alt="Screenshot 2026-05-21 140519" src="https://github.com/user-attachments/assets/dce828e4-9b00-4b5b-83f2-965e0af259c8" />
<img width="1132" height="477" alt="Screenshot 2026-05-21 140554" src="https://github.com/user-attachments/assets/836c4a24-2f06-4efb-b9b3-1c0675cd577a" />














---

*Velvet Fork Project Team | Praesignis AWS re/Start Programme*


