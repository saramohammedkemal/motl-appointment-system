# MOTL-appointment-system
A web application where Customers book appointments for transport services online and receive a queue number and branch admins manage the queue.

> This is a student project for learning.

## Features
- Customers book an appointment and receive  a queue number
- Admin dashboard for each branch
- Main admin can create new admin accounts
- Role-based login (user, admin, main admin)

## Tech stack
React, Node.js, Express, MySQL

## Run locally

### 1. Database
Create a MySQL database named `qetero` and import the `.sql` file `back/model/qetero.sql`.

### 2. Backend (http://localhost:1300)
```bash
cd back
npm install
copy .env.example to .env and fill in your values
npm run dev
```

### 3. Frontend (http://localhost:3000)
```bash
cd front
npm install
npm start
```