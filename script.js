const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}
if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

// This code calculates the cart total quantity and updates the badge
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cart-count");
    if (badge) {
    badge.textContent = totalQuantity;
    }
}

// Call on page load
updateCartCount();

 // jS for sign up newsletter
const scriptURL = 'https://script.google.com/macros/s/AKfycby__rWGZxVA0IY_MENZpjM-BHfxI3u1cFC_YszwMJW-Ds-E_fuYX4OgFSzjrhfU_2FRqg/exec';

function submitEmail() {
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();
    const message = document.getElementById('newsletter-message');

    if (!email.includes("@")) {
    message.style.color = 'red';
    message.textContent = "Please enter a valid email.";
    return;
    }

    fetch(scriptURL, {
    method: 'POST',
    body: new URLSearchParams({ email })
    })
    .then(res => res.text())
    .then(response => {
        response = response.trim(); // Clean up response; remove whitespace or newlines
        console.log("Server response:", response); // You should see exactly what's returned
    if (response === "Success") {
        message.style.color = 'green';
        message.textContent = "Thanks for subscribing!";
        emailInput.value = "";
    } else if (response === "Duplicate") {
        message.style.color = 'blue';
        message.textContent = "You're already subscribed!";
    } else if (response === "Invalid") {
        message.style.color = 'red';
        message.textContent = "Please enter a valid email.";
    } else {
        message.style.color = 'red';
        message.textContent = "Something went wrong. Try again.";
    }
    })
    .catch(error => {
    message.style.color = 'red';
    message.textContent = "Error occurred. Try later.";
    console.error(error);
    });
}

// JavaScript to Handle contact form messages submission in contact page
const contactScriptURL = 'https://script.google.com/macros/s/AKfycbyl7_nqIJ9YCMvSn9glMd8pZ1bL_Lm3GiD2Y_MBMYkRFovMtUF2oBi7lH70wfqZO9TLVA/exec';

function submitContactForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("contact-status");

  if (!name || !email.includes("@") || !subject || message.length < 5) {
    status.style.color = "red";
    status.textContent = "Please fill all fields correctly.";
    return;
  }

  /* Use FormData instead of raw JSON .This will ensure compatibility with Google Apps Script 100% of the time.*/
const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("subject", subject);
  formData.append("message", message);

  fetch(contactScriptURL, {
    method: 'POST',
    body: formData
  })

  .then(res => res.text())
  .then(res => {
    if (res === "Success") {
      status.style.color = "green";
      status.textContent = "Message sent successfully!";
      document.getElementById("contact-form").reset();
    } else {
      status.style.color = "red";
      status.textContent = "Something went wrong. Try again.";
    }
  })
  .catch(err => {
    console.error(err);
    status.style.color = "red";
    status.textContent = "Error sending message. Please try again later.";
  });
}

 