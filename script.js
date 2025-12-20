
const box = document.getElementById("box");
const text = document.getElementById("coolText"); // Define this globally!

// Toggle states
let moved = false;
let faded = true;
let popped = false;
let rotation = 0;
let textShown = false;

// 1. SETUP: Split text into spans immediately on load
// This turns "GSAP" into <span>G</span><span>S</span>...
text.innerHTML = text.textContent
  .split("")
  .map(char => `<span>${char === " " ? "&nbsp;" : char}</span>`)
  .join("");

// Hide the spans initially so they can "animate in"
const letters = text.querySelectorAll("span");
gsap.set(letters, { opacity: 0, x: 20 });

// ===== Move, Fade, Pop, Spin, Burst Buttons =====
// (Keep your existing code for these as it was working!)

// ===== Text Button (Fixed & Polished) =====
document.getElementById("textBtn").addEventListener("click", () => {
  const letters = text.querySelectorAll("span");

  if (!textShown) {
    // 1. Entrance Animation
    gsap.to(letters, {
      opacity: 1,
      x: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out",
      onStart: () => {
        // 2. Individual Letter Flicker
        gsap.to(letters, {
          color: () => `hsl(${Math.random() * 360}, 80%, 70%)`, 
          textShadow: () => `0 0 10px hsl(${Math.random() * 360}, 80%, 70%)`,
          repeat: 3,
          yoyo: true,
          duration: 0.1,
          stagger: 0.05
        });
      }
    }); // <--- This closes the Entrance Animation
  } else {
    // 3. Exit Animation
    gsap.to(letters, {
      opacity: 0,
      x: -20,
      stagger: 0.02,
      duration: 0.3,
      // Randomize the glow one last time as it vanishes
      textShadow: () => `0 0 20px hsl(${Math.random() * 360}, 70%, 60%)`,
      ease: "power2.in"
    });
  }
  
  textShown = !textShown;
});

// (Keep your createParticleBurst function below)
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