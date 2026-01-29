# Multi-Tenant SaaS System (Node.js + Express + MySQL)

A starter project demonstrating a **multi-tenant SaaS architecture** using **Node.js**, **Express**, **MySQL**, and **Sequelize**.  

Each tenant has:

- Its **own database** for isolation and performance  
- Dedicated **content folder** for storing website assets  
- Initial tables (`pages`, `website_settings`) created automatically  

The **superadmin database** manages:

- Tenants and their database info  
- Subscriptions  
- Activity logs  

---

## Features

- Multi-tenant database management  
- Automatic tenant database creation  
- Superadmin CRUD for tenants  
- Subscription management per tenant  
- Initial tenant tables (`pages`, `website_settings`)  
- Tenant content folder creation  

---

## Requirements

- Node.js >= 18  
- MySQL server running locally (default port 3306)  
- npm (comes with Node.js)  

---

## 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd multi-tenant-saas

2️⃣ Install dependencies
npm install

Packages included:

express – Web server

sequelize – ORM for MySQL

mysql2 – MySQL driver

dotenv – Environment variables

body-parser – JSON parsing

nodemon – Dev server auto-restart


3️⃣ Create the Superadmin Database

⚠️ Note: There is no migration to create the database itself. You must create it manually in MySQL or phpMyAdmin.

Example SQL:

CREATE DATABASE superadmin;


4️⃣ Configure environment variables

Create a .env file in the root folder:

# Server
PORT=3000

# Superadmin DB (master database)
SUPERADMIN_DB_HOST=localhost
SUPERADMIN_DB_USER=root
SUPERADMIN_DB_PASSWORD=yourpassword
SUPERADMIN_DB_NAME=superadmin

# Tenant content folder
TENANTS_PATH=./tenants_content


⚠️ Make sure PORT is not 3306 (MySQL default port) to avoid conflicts.


5️⃣ Run migrations
npx sequelize-cli db:migrate


Creates all superadmin tables:

users

tenants

subscriptions

activity_logs


6️⃣ Start the project
npm run dev


You should see:

Super Admin DB connected
Server running on port 3000


Base URL:

http://localhost:3000/api



7️⃣ API Endpoints
Superadmin / Tenant APIs
Endpoint	Method	Body	Description
/api/create-tenant	POST	{ name, dbName, dbUser, dbPassword, dbHost }	Creates a tenant, database, tables, and content folder
/api/create-subscription	POST	{ tenant_id, plan_name, start_date, end_date }	Creates a subscription for a tenant
Example: Create Tenant
POST http://localhost:3000/api/create-tenant
Content-Type: application/json

{
  "name": "tenant1",
  "dbName": "tenant1_db",
  "dbUser": "root",
  "dbPassword": "yourpassword"
}


Creates tenant DB and tables: pages, website_settings

Creates tenant content folder: tenants_content/tenant1

Saves tenant info in tenants table in superadmin DB

Example: Create Subscription
POST http://localhost:3000/api/create-subscription
Content-Type: application/json

{
  "tenant_id": 1,
  "plan_name": "Basic Plan",
  "start_date": "2026-01-29",
  "end_date": "2026-02-29"
}


Creates a subscription record in superadmin DB for the given tenant


8️⃣ Project Structure
multi-tenant-saas/
│
├─ src/
│  ├─ config/          # Superadmin DB connection
│  ├─ controllers/     # API controllers
│  ├─ models/          # Sequelize models (Tenant, User, Subscription, etc.)
│  ├─ routes/          # Express routes
│  ├─ tenants/         # Tenant DB connections & content folder management
│  └─ index.js         # Main server entry
├─ migrations/         # Sequelize migrations for superadmin tables
├─ .env                # Environment variables
├─ package.json

9️⃣ One-time commands

Install dependencies:

npm install


Create superadmin database manually in MySQL:

CREATE DATABASE superadmin;


Run Sequelize migrations:

npx sequelize-cli db:migrate


(Optional) Create initial superadmin user (can create via script or direct insert in MySQL):

INSERT INTO users (name,email,password,role,created_at,updated_at)
VALUES ('Super Admin','admin@saas.com','admin123','superadmin',NOW(),NOW());


Start the server:

npm run dev

10️⃣ Tenant DB Tables Created Automatically

pages

title (string)

description (text)

url (string)

website_settings

header_color (string)

footer_color (string)

text_color (string)

font_family (string)
