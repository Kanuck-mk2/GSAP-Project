const stage = document.getElementById("particle-stage");
const btn = document.getElementById("burstBtn");

// Characters to use for the burst
const chars = "GSAP-CIRCULAR-BURST-10101-MATH-ROTATION".split("");

function createBurst() {
  const count = 100; // Total letters in the circle
  
  for (let i = 0; i < count; i++) {
    // 1. Create a "pivot" div and a letter inside it
    const pivot = document.createElement("div");
    const letter = document.createElement("span");
    
    pivot.className = "pivot";
    letter.className = "letter-particle";
    
    letter.textContent = gsap.utils.random(chars);
    pivot.appendChild(letter);
    stage.appendChild(pivot);

    // 2. Setup initial state (all in center)
    gsap.set(pivot, { position: "absolute", rotation: (i / count) * 360 });
    gsap.set(letter, { x: 0, opacity: 0 });

    // 3. THE BURST: Letters fly out to a random radius
    const radius = gsap.utils.random(150, 300);
    const duration = gsap.utils.random(1.5, 2.5);
    
    gsap.to(letter, {
      x: radius,
      opacity: 1,
      duration: duration,
      ease: "expo.out"
    });

    // 4. THE ORBIT: The pivot rotates forever
    // We use a different duration for each so they "drift" apart
    gsap.to(pivot, {
      rotation: "+=780",
      duration: gsap.utils.random(10, 20),
      repeat: -1,
      borderRadius: "50%",
      backgroundColor: `hsl(${gsap.utils.random(0, 360)}, 70%, 60%)`,
      ease: "none"
    });

    // 5. THE PULSE: Make the letters flicker or scale
    gsap.to(letter, {
      scale: 1.5,
      rotation: gsap.utils.random(-65, 45),
      repeat: -1,
      yoyo: true,
      borderRadius: "100%",
      duration: gsap.utils.random(0.5, 1.5),
      backgroundColor: `hsl(${gsap.utils.random(0, 360)}, 70%, 60%)`,
      ease: "sine.inOut"
    });
  }
  
  // Hide button after burst for the "pure" visual
  gsap.to(btn, { opacity: 1, pointerEvents: "none" });
}

btn.addEventListener("click", createBurst);