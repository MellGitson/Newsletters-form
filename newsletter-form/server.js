const express = require('express');
const app = express();
const PORT = 3000;

let subscribers = []; 

app.use(express.json());
app.use(express.static('.'));

app.post('/subscribe', (req, res) => {
  const { email, firstName, lastName } = req.body;

  
  let isEmailInDb = false;
  let success = true;

  
  if (!email || !firstName || !lastName) {
    return res.json({
      success: false,
      errors: ["Données manquantes."],
      isEmailInDb: false
    });
  }

  
  if (subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase())) {
    isEmailInDb = true;
    success = false;
  }

  
  if (isEmailInDb) {
    return res.json({
      success: false,
      isEmailInDb: true,
      errors: ["Email déjà présent dans la base."]
    });
  }

  
  subscribers.push({ email, firstName, lastName });
  console.log('Nouvel abonné :', { email, firstName, lastName });

  res.json({
    success: true,
    isEmailInDb: false
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});