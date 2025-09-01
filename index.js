import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
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
  console.log(`Registration: ID ${idNumber}, Name: ${fullName}, email: ${email}`);
  
  // For now, just redirect to a success page or back to home
  // You can add database logic here later
  res.sendFile(__dirname + "/views/family-quiz.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
