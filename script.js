// Make sure this is at the top
const box = document.getElementById("box");

// Toggle states
let moved = false;
let faded = true;
let popped = false;
let rotation = 0;
let textShown = false;

// ===== Move Button =====
document.getElementById("moveBtn").addEventListener("click", () => {
  gsap.to(box, {
    x: moved ? 0 : 400,
    y: moved ? 0 : -100,
    duration: 1.7,
    ease: "power2.out"
  });
  moved = !moved;
});

// ===== Fade Button =====
document.getElementById("fadeBtn").addEventListener("click", () => {
  gsap.to(box, {
    opacity: faded ? 0 : 1,
    duration: 0.7,
    ease: "power1.out"
  });
  faded = !faded;
});

// ===== Pop Button =====
document.getElementById("popBtn").addEventListener("click", () => {
  gsap.to(box, {
    scale: popped ? 1 : 1.5,
    duration: 0.7,
    ease: "back.out(2)"
  });
  popped = !popped;
});

// ===== Spin Button =====
document.getElementById("spinBtn").addEventListener("click", () => {
  rotation += 270;
  gsap.to(box, {
    rotation: rotation,
    duration: 0.2,
    ease: "power2.out"
  });
});

// ===== Burst Button =====
document.getElementById("burstBtn").addEventListener("click", createParticleBurst);

// ===== Text Button =====
document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("box");

  // Your existing box button code...
  // Move, Fade, Pop, Spin, Burst

  // ===== Text setup =====
  const text = document.getElementById("coolText");
  text.innerHTML = text.textContent
    .split("")
    .map(char => `<span>${char}</span>`)
    .join("");

  gsap.from("#coolText span", {
    opacity: 0,
    x: 20,
    stagger: 0.05,
    duration: 0.5,
    ease: "back.out(1.7)"
  });

  // Text toggle example (optional)
  let textShown = true;
  document.getElementById("textBtn").addEventListener("click", () => {
    const letters = text.querySelectorAll("span");

    gsap.to(letters, {
      opacity: textShown ? 0 : 1,
      x: textShown ? -20 : 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "back.out(1.7)"
    });

    textShown = !textShown;
  });
});

//particle burst function
function createParticleBurst() {
  const rect = box.getBoundingClientRect();
  // Get the true center of the box
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const particleCount = 100; // Reduced slightly for better performance

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    document.body.appendChild(particle);

    
    // Initial state
    gsap.set(particle, { 
      x: centerX, 
      y: centerY, 
      scale: Math.random() * 0.5 + 0.5, // Random sizes
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)` // Random colors
    });

    const angle = Math.random() * Math.PI * 2;
    const dist = 100 + Math.random() * 200;

    // Create a timeline for each particle
    const tl = gsap.timeline({
      onComplete: () => particle.remove()
    });

    tl.to(particle, {
      x: centerX + Math.cos(angle) * dist,
      y: centerY + Math.sin(angle) * dist,
      rotation: Math.random() * 360,
      duration: 1.2,
      ease: "power4.out"
    })
    .to(particle, {
      opacity: 0,
      scale: 0,
      duration: 0.4
    }, "-=0.4"); // Starts 0.4s before the previous animation ends (overlap)
  }
}