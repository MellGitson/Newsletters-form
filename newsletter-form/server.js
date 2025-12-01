const express = require("express");
const app = express();
const PORT = 3000;


let subscribers = [];


app.use(express.json());


app.post("/subscribe", (req, res) => {
  const { email, firstName, lastName } = req.body;
  const errors = [];

  
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.push("Email invalide.");
  }

  if (!firstName || typeof firstName !== "string" || firstName.trim() === "") {
    errors.push("Prénom requis.");
  }

  if (!lastName || typeof lastName !== "string" || lastName.trim() === "") {
    errors.push("Nom requis.");
  }

  
  if (
    subscribers.some((sub) => sub.email.toLowerCase() === email.toLowerCase())
  ) {
    errors.push("Cet email est déjà inscrit.");
  }

  if (errors.length > 0) {
    return res.json({ success: false, errors });
  }

  
  subscribers.push({ email, firstName, lastName });
  console.log("Nouvel abonné :", { email, firstName, lastName });

  res.json({ success: true });
});


app.use(express.static("."));


app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
