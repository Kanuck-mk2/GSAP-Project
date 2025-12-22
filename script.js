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
        const radius = gsap.utils.random(150, 350);
        
        gsap.to(letter, {
            x: radius,
            opacity: 1,
            rotation: gsap.utils.random(-360, 360), // Initial spin
            duration: gsap.utils.random(1, 2),
            ease: "expo.out",
            force3D: true // Forces GPU acceleration to prevent stutter
        });

        // 4. THE CONTINUOUS ORBIT (The Parent "Pivot" rotates)
        gsap.to(pivot, {
            rotation: "+=360",
            duration: gsap.utils.random(15, 25), // Different speeds for drift
            repeat: -1,
            ease: "none"
        });

        // 5. THE PULSE & WOBBLE (The Child "Letter" animates)
        gsap.to(letter, {
            scale: 1.4,
            rotation: "+=45", // Small wobbling
            backgroundColor: `hsl(${gsap.utils.random(0, 360)}, 80%, 60%)`, // Color cycling
            repeat: -1,
            yoyo: true,
            duration: gsap.utils.random(0.7, 1.5),
            ease: "sine.inOut",
            // Helper to keep the animation smooth on older screens
            force3D: true 
        });
    }
}

btn.addEventListener("click", createBurst);