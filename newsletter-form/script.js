document.getElementById('newsletterForm').addEventListener('submit', async function (e) {
  e.preventDefault(); 

  
  const email = document.getElementById('email').value.trim();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();

  
  document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

  
  let errors = [];

  if (!email) {
    errors.push('email');
    document.getElementById('email').classList.add('is-invalid');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { 
    errors.push('email');
    document.getElementById('email').classList.add('is-invalid');
  }

  if (!firstName) {
    errors.push('firstName');
    document.getElementById('firstName').classList.add('is-invalid');
  }

  if (!lastName) {
    errors.push('lastName');
    document.getElementById('lastName').classList.add('is-invalid');
  }

  
  if (errors.length > 0) return;

  /* envoi AJAX */
  try {
    const response = await fetch('/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName })
    });

    const result = await response.json();

    const messageDiv = document.getElementById('message');
    if (result.success) {
      messageDiv.innerHTML = '<div class="alert alert-success">Merci pour votre inscription !</div>';
      document.getElementById('newsletterForm').reset(); 
    } else {
      const errorMsg = result.errors.length ? result.errors.join('<br>') : 'Une erreur est survenue.';
      messageDiv.innerHTML = `<div class="alert alert-danger">${errorMsg}</div>`;
    }
  } catch (err) {
    document.getElementById('message').innerHTML = '<div class="alert alert-danger">Erreur de connexion au serveur.</div>';
  }
});