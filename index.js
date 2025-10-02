import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import pg from "pg";

const app = express();
const port = 3000;
let userData = {};
let userUniversity = "";
async function connectWithRetry() {
  const client = new pg.Client({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASS,
    port: process.env.DBPORT,
  });

  try {
    await client.connect();
    console.log("✅ Connected to database!");
    return client;
  } catch (err) {
    console.error("❌ Database not ready, retrying in 5s...", err.code);
    await new Promise((res) => setTimeout(res, 5000));
    return connectWithRetry();
  }
}

const db = await connectWithRetry();

app.use(express.static("public"));
app.use(express.json());
app.use("/partials", express.static("views/partials"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/register.html");
});

app.post("/quiz", (req, res) => {
  const { fullName } = req.body;
  userData = { name: fullName };
  console.log(`Registration: Name: ${fullName}`);
  res.sendFile(__dirname + "/views/uni-quiz.html");
});

app.post("/submit", async (req, res) => {
  const answers = req.body;
  console.log("Quiz results received:", answers);
  const university = await findUniversity(answers);
  userUniversity = university;
  const { name } = userData;
  console.log([name, university.name]);

  try {
    await db.query("INSERT INTO students (name, university) VALUES ($1, $2)", [
      name,
      university.name,
    ]);
    res.redirect("/result.ejs");
  } catch (err) {
    console.error("Database or submission error:", err);
    res.status(500).send("An error occurred.");
  }
});

app.get("/result.ejs", (req, res) => {
  res.render("result.ejs", { universities: userUniversity });
});

app.get("/this-is-not-admin", async (req, res) => {
  const query = `
    SELECT id, name
    FROM students
    WHERE university = $1;
  `;
  try {
    const admu = await db.query(query, ["ADMU"]);
    const dlsu = await db.query(query, ["DLSU"]);
    const up = await db.query(query, ["UP"]);
    const ust = await db.query(query, ["UST"]);
    const universities = [admu.rows, dlsu.rows, up.rows, ust.rows];
    res.render("admin.ejs", { universities: universities });
  } catch (err) {
    console.error("Database or submission error:", err);
    res.status(500).send("An error occurred.");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const universities = [
  {
    uni: "Ateneo de Manila University",
    name: "ADMU",
    color: "#0047AB",
    head: "One Big Fight! You're an Atenean!",
    body: "You embody the Atenean spirit—reflective, compassionate, and principled. Guided by purpose and cura personalis (care for the whole person), you strive for excellence while lifting others alongside you. You thrive in thoughtful environments, balancing intellect with heart, and often find meaning in community service, arts, and faith. You're a Blue Eagle soaring high, always searching for deeper truths and serving with love.",
  },
  {
    uni: "De La Salle University",
    name: "DLSU",
    color: "#10751A",
    head: "Animo La Salle! You're a Lasallian!",
    body: "You radiate drive, energy, and ambition. Always competitive and ready for the big leagues, you thrive in dynamic, fast-paced environments full of challenge. Like the Green Archer, you're precise, sharp, and goal-oriented, excelling in leadership, innovation, and bold moves. You inspire others with your determination and spirit, living the Lasallian call to make things happen with excellence and Animo!",
  },
  {
    uni: "University of the Philippines",
    name: "UP",
    color: "#800000",
    head: "UP Fight! You're an Iskolar ng Bayan!",
    body: "You are bold, independent, and socially conscious. With a mind sharpened by freedom and a heart for the people, you seek truth and justice wherever you go. Like a Fighting Maroon, you are unafraid to take a stand, challenge systems, and embrace creativity with grit. You thrive in diverse communities, always ready to make a difference—and you carry the Iskolar ng Bayan spirit of service and activism.",
  },
  {
    uni: "University of Santo Tomas",
    name: "UST",
    color: "#FFD700",
    head: "Go Uste! You're a Thomasian!",
    body: "You are grounded, faithful, and artistic at heart. Tradition and community are your strongholds, but your creativity and warmth make you shine. Like a Growling Tiger, you're resilient, loyal, and passionate, drawing strength from history and spirituality. You thrive in environments full of culture, faith, and camaraderie, carrying your Thomasian pride with every victory, celebration, and heartfelt moment.",
  },
];

async function findUniversity(answers) {
  // Find the index of the maximum score
  let maxScore = Math.max(...answers);
  let maxIndex = answers.indexOf(maxScore);

  // Map the index to the corresponding university

  return universities[maxIndex];
}
