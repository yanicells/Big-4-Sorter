# UniSort

A university-themed personality quiz platform designed to sort users into one of the four big Philippine universities: Ateneo de Manila University (ADMU), De La Salle University (DLSU), University of the Philippines (UP), or University of Santo Tomas (UST).
The system fosters community, fun, and self-discovery by assigning a university match based on personality traits through a quiz-based system.

## Tech Stack
- **Frontend**: TailwindCSS  
- **Backend**: Node.js (Express.js)  
- **Database**: PostgreSQL  

## Setup Guide

### Prerequisites
- Node.js (>= 18.x)  
- npm (>= 9.x)  
- PostgreSQL running locally  

### Clone the Repository
```bash
git clone https://github.com/your-organization/UniSort.git
cd unisort
```

### Install Dependencies
```bash
npm install
```

(Optional) Install nodemon globally:
```bash
npm install -g nodemon
```

### Database Setup
Make sure PostgreSQL is running. [Install PostgreSQL](https://www.postgresql.org) if you haven't.
No need to create a table, just create a database, and make sure it connects to the terminal (or command prompt) once you have. 

#### Create a database:
```sql
CREATE DATABASE UniSort;
```

### Environment Variables
Create a `.env` file in the root directory.
Fill in the information. The port should be 5432 by default.

```env
DBUSER=""
DBHOST=""
DBNAME=""
DBPASS=""
DBPORT=5432
```

### Run the Project
```bash
# Start with nodemon 
nodemon index.js
```
Project will be available at: http://localhost:3000

## Usage
1. Open the landing page at `/`.  
2. Register or log in as a user.
3. Take the personality quiz.
4. View your university match (Ateneo, La Salle, UP, or UST). 
5. Your results and data will be stored for record-keeping.


