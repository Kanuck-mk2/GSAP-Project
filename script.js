const stage = document.getElementById("particle-stage");
const btn = document.getElementById("burstBtn");
const chars = "GSAP-CORE-DATA-777-X".split("");

function createBurst() {
    const count = 50; 
    
    // Hide button so it doesn't distract
    gsap.to(btn, { opacity: 0, scale: 0, duration: 0.5 });

    for (let i = 0; i < count; i++) {
        // 1. Setup Elements
        const pivot = document.createElement("div");
        const letter = document.createElement("span");
        
        pivot.className = "pivot";
        letter.className = "letter-particle";
        letter.textContent = gsap.utils.random(chars);
        
        pivot.appendChild(letter);
        stage.appendChild(pivot);

        // 2. Initial Positioning (Perfect Circle Distribution)
        // Spread the pivots evenly in a 360-degree circle
        gsap.set(pivot, { 
            rotation: (i / count) * 360 
        });
        
        // Hide letters in the center initially
        gsap.set(letter, { 
            x: 0, 
            opacity: 0,
            backgroundColor: `hsl(${gsap.utils.random(0, 360)}, 70%, 50%)`,
            borderRadius: "50%"
        });

        // 3. THE BURST (Fly out from center)
        const radius = gsap.utils.random(50, 250);
        
        gsap.to(letter, {
            x: radius,
            opacity: 1,
            rotation: gsap.utils.random(-70, 70), // Initial spin
            duration: gsap.utils.random(1, 2),
            ease: "expo.out",
            force3D: true // Forces GPU acceleration to prevent stutter
        });

        // 4. THE CONTINUOUS ORBIT (The Parent "Pivot" rotates)
        gsap.to(pivot, {
            rotation: "+=760",
            duration: gsap.utils.random(25, 55), // Different speeds for drift
            repeat: -1,
            ease: "none"
        });

// 5. THE PULSE & SCRAMBLE
gsap.to(letter, {
    scale: 1.4,
    rotation: "+=360",
    filter: `hue-rotate(${gsap.utils.random(360, 720)}deg)`, 
    
    // We update the shadow only at the start/end of the pulse to save CPU
    boxShadow: `0 0 30px hsl(${gsap.utils.random(0, 360)}, 70%, 50%)`,
    
    repeat: -1,
    yoyo: true,
    duration: gsap.utils.random(1.5, 3),
    ease: "sine.inOut",
    force3D: true,
    
    // THIS PART RANDOMIZES THE TEXT
    onRepeat: function() {
        // Change the letter every time the pulse loops
        this.targets()[0].textContent = gsap.utils.random(chars);
    }
});
    }
}

btn.addEventListener("click", createBurst);