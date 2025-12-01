document.getElementById('newsletterForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();

  
  document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));
  document.getElementById('message').innerHTML = '';

  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('email').classList.add('is-invalid');
    return;
  }
  if (!firstName) document.getElementById('firstName').classList.add('is-invalid');
  if (!lastName) document.getElementById('lastName').classList.add('is-invalid');
  if (!firstName || !lastName) return;

  
  try {
    const response = await fetch('/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstName, lastName })
    });

    const result = await response.json();

    const messageDiv = document.getElementById('message');

    if (result.success) {
      messageDiv.innerHTML = '<div class="alert alert-success">Merci, votre email a bien été ajouté.</div>';
      document.getElementById('newsletterForm').reset();
    } else {
      
      messageDiv.innerHTML = '<div class="alert alert-danger">Attention, nous n’avons pas été en mesure de traiter votre demande.</div>';
    }
  } catch (err) {
    document.getElementById('message').innerHTML = '<div class="alert alert-danger">Attention, nous n’avons pas été en mesure de traiter votre demande.</div>';
  }
});