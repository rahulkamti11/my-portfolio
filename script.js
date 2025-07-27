const phrases = ["Web Development", "Android Development", "Software Development"];
const changingText = document.querySelector(".changing-text");
let index = 0;
let charIndex = 0;
let typing = true;

function typeEffect() {
  if (typing) {
    if (charIndex < phrases[index].length) {
      changingText.textContent += phrases[index].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 100);
    } else {
      typing = false;
      setTimeout(typeEffect, 1000);
    }
  } else {
    if (charIndex > 0) {
      changingText.textContent = phrases[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      typing = true;
      index = (index + 1) % phrases.length;
      setTimeout(typeEffect, 300);
    }
  }
}
typeEffect();

const form = document.getElementById('contactForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value
  };

  try {
    const res = await fetch('https://portfolio-backend-ua7x.onrender.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Failed to send message.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ Server error. Try again later.");
  }
});

