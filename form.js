document.getElementById('contactForm').addEventListener('submit', SendMail);

function SendMail(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var messageme = document.getElementById('messageme').value;

  // Validate if any field is empty
  if (name === '' || email === '' || phone === '' || messageme === '') {
    alert('Please fill in all the fields.');
    return;
  }

  // Validate name (should not contain numbers)
  if (!validateName(name)) {
    alert('Name cannot contain numbers or special characters.');
    return;
  }

  // Validate email
  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Validate phone
  if (!validatePhone(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  var templateParams = {
    name: name,
    email: email,
    phone: phone,
    messageme: messageme
  };

  emailjs.send('service_l64zgfw', 'template_4z4ncl3', templateParams).then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Your message has been sent successfully.');
      document.getElementById('contactForm').reset(); // Clear the form
    },
    (error) => {
      console.log('FAILED...', error);
      alert('Failed to send your message.');
    }
  );
}

function validateName(name) {
  // Name should only contain alphabets and spaces
  var re = /^[A-Za-z\s]+$/;
  return re.test(String(name));
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}
