heck import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import pg from "pg";

const app = express();
const port = 3000;
let userData = {};
let userFamily = "";
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
    await new Promise(res => setTimeout(res, 5000));
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

app.post("/family-quiz", (req, res) => {
  const { idNumber, fullName, email } = req.body;
  userData = { idNumber, fullName, email };
  console.log(
    `Registration: ID ${idNumber}, Name: ${fullName}, email: ${email}`
  );
  res.sendFile(__dirname + "/views/family-quiz.html");
});

app.post("/submit", async (req, res) => {
  const answers = req.body;
  console.log("Quiz results received:", answers);
  const family = await findFamily(answers);
  userFamily = family;
  const { idNumber, fullName, email } = userData;
  console.log([idNumber, fullName, email, userFamily.family]);
  
  try {
    await db.query(
      "INSERT INTO students (id, name, email, family_type) VALUES ($1, $2, $3, $4)",
      [idNumber, fullName, email, userFamily.family]
    );
    res.redirect("/result.ejs");
  } catch (err) {
    console.error("Database or submission error:", err);
    res.status(500).send("An error occurred.");
  }
});

app.get("/result.ejs", (req, res) => {
  res.render("result.ejs", { family: userFamily });
});

app.get("/this-is-not-admin", async(req, res) => {
  const query = `
    SELECT id, name, email
    FROM students
    WHERE family_type = $1;
  `;
  try {
    const blaze_family = await db.query(query,["Blaze"]);
    const wave_family = await db.query(query,["Wave"]);
    const leaf_family = await db.query(query,["Leaf"]);
    const shock_family = await db.query(query,["Shock"]
    );
    const families = [blaze_family.rows, wave_family.rows, leaf_family.rows, shock_family.rows];
    res.render("admin.ejs", { families: families });
  } catch (err) {
    console.error("Database or submission error:", err);
    res.status(500).send("An error occurred.");
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const families = [
  {
    family: "Blaze",
    color: "#f88400",
    head: "Ready to ignite and rise!",
    body: "Fire types are passionate and driven, with a natural inclination for leadership. They thrive on challenges and inspire others with their enthusiasm. While their energy helps them achieve goals, they can become impatient if things don't move quickly. Their love for high-energy activities and creative expression shows their fiery nature."
  },
  {
    family: "Wave",
    color: "#498feb",
    head: "Flow with strength, ride the tides!",
    body: "Calm and adaptable, Water types are emotionally intelligent and empathetic individuals. They navigate emotional situations with ease and serve as a calming presence for others. Their default state is serenity, but they can be overwhelmed by intense emotions. They are drawn to activities that allow for contemplation and emotional depth, like yoga or journaling."
  },
  {
    family: "Leaf",
    color: "#7ec367",
    head: "Rooted in growth, thriving together!",
    body: "Grounded and patient, Grass types are nurturing people who find joy in personal growth and stability. They act as a reliable support system and are known for their resilience and cooperation. While content with slow progress, they may struggle with confrontation. Their interests often involve nature and hands-on activities, like gardening or pottery."
  },
  {
    family: "Shock",
    color: "#e8ce24",
    head: "We see the future and make it ours!",
    body: "Electric types are quick-witted, innovative, and highly energetic thinkers. They thrive in dynamic settings and are known for their unique ideas and problem-solving skills. They are visionaries who love the thrill of new concepts but can become anxious with routine. Their hobbies, such as coding or extreme sports, reflect their need for intellectual stimulation and high-adrenaline experiences."
  }
]

async function findFamily(answers) {
  // Find the index of the maximum score
  let maxScore = Math.max(...answers);
  let maxIndex = answers.indexOf(maxScore);
  
  // Return the family with the highest score
  return families[maxIndex];
}
