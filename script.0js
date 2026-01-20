const stage = document.getElementById('particle-stage');
const btn = document.getElementById('burstBtn');
const chars = 'GSAP-CORE-DATA-777-X0123456789%@#&*'.split('');
const color1 = `hsl(${gsap.utils.random(0, 360)}, 80%, 60%)`;
const color2 = `hsl(${gsap.utils.random(0, 360)}, 80%, 60%)`;
const color3 = `hsl(${gsap.utils.random(0, 360)}, 80%, 60%)`;

function createBurst() {
  const count = 70;

  gsap.to(btn, { opacity: 0, scale: 0, duration: 0.5 });

  for (let i = 0; i < count; i++) {
    const pivot = document.createElement('div');
    const letter = document.createElement('span');

    pivot.className = 'pivot';
    letter.className = 'letter-particle';
    letter.textContent = gsap.utils.random(chars);

    pivot.appendChild(letter);
    stage.appendChild(pivot);

    // --- VITAL: THE MATH OF THE CIRCLE ---
    // By rotating the pivot (the parent) before moving the child,
    // we determine which "spoke" of the wheel the letter will travel on.
    gsap.set(pivot, {
      rotation: (i / count) * 360, // Distributes 50 letters evenly across 360 degrees
    });

 gsap.set(letter, { 
    x: 0, 
    opacity: 0,
    // VITAL: Use a Template Literal to build the gradient string
    backgroundImage: `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.3)"
});

    // --- VITAL: THE DEPTH ---
    const radius = gsap.utils.random(50, 250);

    gsap.to(letter, {
      x: radius, // Moves the letter AWAY from the center along its pivot's angle
      opacity: 1,
      rotation: gsap.utils.random(-70, 70),
      duration: gsap.utils.random(1, 2),
      ease: 'expo.out', // "Expo" creates that 'explosion' feel: fast start, slow finish
      force3D: true, // VITAL: Tells the GPU to handle this layer (prevents stutter)
    });

    // --- VITAL: THE ORBIT ---
    gsap.to(pivot, {
      rotation: '+=760', // "+=" means "add to current rotation" (relative value)
      duration: gsap.utils.random(25, 55),
      repeat: -1, // Infinite loop
      ease: 'none', // VITAL: "none" (Linear) is required for smooth, constant spinning
    });

    // --- VITAL: THE DYNAMICS ---
    gsap.to(letter, {
      scale: 1.4,
      rotation: '+=360',
      // filter: hue-rotate is easier on the CPU than animating backgroundColor directly
      filter: `hue-rotate(${gsap.utils.random(360, 720)}deg)`,
      boxShadow: `0 0 30px hsl(${gsap.utils.random(0, 360)}, 70%, 50%)`,
      repeat: -1,
      yoyo: true, // Makes the letter scale up AND THEN scale back down
      duration: gsap.utils.random(1.5, 3),
      ease: 'sine.inOut', // Sine is a soft, wavy ease—perfect for pulsing
      force3D: true,

      // --- VITAL: THE SCRAMBLER ---
      onRepeat: function () {
        // 50% chance to show a letter, 50% chance to show a number
        const isNumber = Math.random() > 0.5;
        if (isNumber) {
          this.targets()[0].textContent = Math.floor(Math.random() * 10);
        } else {
          this.targets()[0].textContent = gsap.utils.random(chars);
        }
      },
    });
  }
}

btn.addEventListener('click', createBurst);
