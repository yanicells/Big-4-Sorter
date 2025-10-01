# MISAyang Samahan

A Pokémon-themed HR platform designed for the Management Information Systems Association (MISA).  
The system fosters camaraderie, engagement, and participation among members by sorting them into “families” through a quiz-based system.

---

## Purpose / Goal
The main goal of this system is to strengthen community and participation in MISA through a form of a quiz.  

- **Problem it solves:** Traditional HR engagement methods can feel repetitive. This project introduces a fun, interactive way to connect members.  
- **Who it is for:** MISA members and its HR team.  
- **Why it was built:** To refresh the MISAyang Samahan initiative with a Pokémon-themed quiz system that fosters inclusivity, encourages consistent participation, and provides a fun, memorable way for members to build community across year levels.

---

## Roles & Contributors
- **Project Managers**: Anne Kathleen B. Ranido, Ronan Despojo 
- **Developers**: Gelo Funelas, Yani Capistrano  
- **UI/UX Designers**: Edwin Bagnayan, Andre Abas  
- **Systems Documentation Officers**: Solenne Vera, Christian Naguio  
- **HR Point People**: Mikey Martin, Ervy Ang  

---

## Project Timeline / Status
- **Start Date**: 09/04/2025  
- **Current Phase**: Development  
- **Expected Completion**: 09/17/2025  
- **Status**: Complete 

---

## Tech Stack
- **Frontend**: TailwindCSS  
- **Backend**: Node.js (Express.js)  
- **Database**: PostgreSQL  
- **Version Control and Project Management**: GitHub, Asana

---

## Setup Guide

### Prerequisites
- Node.js (>= 18.x)  
- npm (>= 9.x)  
- PostgreSQL running locally  

---

### Clone the Repository
```bash
git clone https://github.com/eServices-MISA/MISAyang-Samahan.git
cd misayang-samahan
```

---

### Install Dependencies
```bash
npm install
```

(Optional) Install nodemon globally:
```bash
npm install -g nodemon
```

---

### Database Setup
Make sure PostgreSQL is running. [Install PostgreSQL](https://www.postgresql.org) if you haven't.
No need to create a table, just create a database, and make sure it connects to the terminal (or command prompt) once you have. 

#### Create a database:
```sql
CREATE DATABASE misayang_samahan;
```

---

### Environment Variables
Create a `.env` file in the root directory based on the .env.example file.
Fill in the information based on what you logged in as in your DBHOST, DBPASS. The port should be 5432 by default.

```env
DBUSER=""
DBHOST=""
DBNAME=""
DBPASS=""
DBPORT=5432
MIN_FAMILY_SIZE=10
MAX_FAMILY_SIZE=15
```
---

### Run the Project
```bash
# Start with nodemon 
npx nodemon index.js

# Or run normally
node index.js
```
Project will be available at: http://localhost:3000

---

## Usage
1. Open the landing page at `/`.  
2. Register with your MISA credentials.  
3. Take the personality quiz.  
4. View your assigned family (Fire, Water, Grass, Electric).  
5. Data will be stored in the database for HR record-keeping.  

---

## Documentation
- [System Documentation]()  
- [Figma Design File](https://www.figma.com/design/PWN2bB2v6dhnzUDtd9IxDz/MISAyang-Samahan-Quiz?node-id=0-1&p=f&t=KV7cp5KKFNiLz9rj-0&fbclid=IwY2xjawM6PKJleHRuA2FlbQIxMQABHiO1LLSUqTB065Bjw0JlcC7xScEhfL2NP1zkTa_3eHsAU6VwZEYhq4AzyqAR_aem_vhhzlX8dfBX0z73rb1hhvA)  

---

## File Structure
```
misayang-samahan/
.
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── index.js               # Main server entry point
├── queries.sql            # SQL queries (maybe move into /db folder)
│
├── config/
│   └── db.js              # DB connection config (instead of inline in index.js)
│
├── public/                # Static assets
│   ├── images/
│   │   ├── logo.png
│   │   └── family_icons/
│   │       ├── Blaze.png
│   │       ├── Leaf.png
│   │       ├── Shock.png
│   │       └── Wave.png
│   ├── css/
│   │   ├── input.css
│   │   └── style.css
│   └── js/
│       └── partials.js
│
├── views/                 # Templating (EJS / HTML)
│   ├── admin.ejs
│   ├── result.ejs
│   ├── family-quiz.html
│   ├── index.html
│   ├── register.html
│   └── partials/
│       ├── footer.html
│       └── header.html

```

### Dictionary of Folders

- **public/** → Static files served to the client.  
  - **images/**: Contains logos and family icons.  
    - **family_icons/**: Blaze, Leaf, Shock, and Wave family icons.  
  - **css/**: Stylesheets (`style.css`, `input.css`).  
  - **js/**: Frontend JavaScript utilities (e.g., `partials.js`).  

- **views/**: Templates and HTML pages.  
  - **partials/**: Shared layout files like header and footer.  
  - **admin.ejs**: Admin dashboard page.  
  - **result.ejs**: Quiz result page.  
  - **family-quiz.html**: Quiz interface.  
  - **index.html**: Landing page.  
  - **register.html**: Registration page.  

- **config/**: Database configuration and SQL scripts.  
  - **queries.sql**: SQL table creation and queries.  

- **root directory**: Project setup and core files.  
  - `.env.example`: Example environment variables.  
  - `.gitignore` ; Git ignore rules.  
  - `index.js`; Main server entry point.  
  - `package.json`: `package-lock.json` → Node.js dependencies.  
  - `README.md`
 

---
