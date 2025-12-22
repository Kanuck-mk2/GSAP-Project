const stage = document.getElementById("particle-stage");
const btn = document.getElementById("burstBtn");
const chars = "GSAP-CORE-DATA-777-X".split("");

function createBurst() {
    const count = 50;

    gsap.to(btn, { opacity: 0, scale: 0, duration: 0.5 });

    for (let i = 0; i < count; i++) {
        const pivot = document.createElement("div");
        const letter = document.createElement("span");

        pivot.className = "pivot";
        letter.className = "letter-particle";
        letter.textContent = gsap.utils.random(chars);

        pivot.appendChild(letter);
        stage.appendChild(pivot);

        // --- VITAL: THE MATH OF THE CIRCLE ---
        // By rotating the pivot (the parent) before moving the child, 
        // we determine which "spoke" of the wheel the letter will travel on.
        gsap.set(pivot, {
            rotation: (i / count) * 360 // Distributes 50 letters evenly across 360 degrees
        });

        gsap.set(letter, {
            x: 0,
            opacity: 0,
            backgroundColor: `hsl(${gsap.utils.random(0, 360)}, 70%, 50%)`,
            borderRadius: "50%"
        });

        // --- VITAL: THE DEPTH ---
        const radius = gsap.utils.random(50, 250);

        gsap.to(letter, {
            x: radius, // Moves the letter AWAY from the center along its pivot's angle
            opacity: 1,
            rotation: gsap.utils.random(-70, 70),
            duration: gsap.utils.random(1, 2),
            ease: "expo.out", // "Expo" creates that 'explosion' feel: fast start, slow finish
            force3D: true     // VITAL: Tells the GPU to handle this layer (prevents stutter)
        });

        // --- VITAL: THE ORBIT ---
        gsap.to(pivot, {
            rotation: "+=760",    // "+=" means "add to current rotation" (relative value)
            duration: gsap.utils.random(25, 55), 
            repeat: -1,           // Infinite loop
            ease: "none"          // VITAL: "none" (Linear) is required for smooth, constant spinning
        });

        // --- VITAL: THE DYNAMICS ---
        gsap.to(letter, {
            scale: 1.4,
            rotation: "+=360",
            // filter: hue-rotate is easier on the CPU than animating backgroundColor directly
            filter: `hue-rotate(${gsap.utils.random(360, 720)}deg)`,
            boxShadow: `0 0 30px hsl(${gsap.utils.random(0, 360)}, 70%, 50%)`,
            repeat: -1,
            yoyo: true,           // Makes the letter scale up AND THEN scale back down
            duration: gsap.utils.random(1.5, 3),
            ease: "sine.inOut",   // Sine is a soft, wavy ease—perfect for pulsing
            force3D: true,
            
            // --- VITAL: THE SCRAMBLER ---
            onRepeat: function() {
                // 'this.targets()[0]' refers to the specific letter span being animated
                this.targets()[0].textContent = gsap.utils.random(chars);
            }
        });
    }
}

btn.addEventListener("click", createBurst);