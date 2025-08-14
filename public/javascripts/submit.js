document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // stop default form submission

  const form = event.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/thankyou.html';  // redirect on success
    } else {
      alert('Oops! There was a problem submitting your form.');
    }
  })
  .catch(() => alert('Oops! There was a problem submitting your form.'));
});
