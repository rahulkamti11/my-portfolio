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


