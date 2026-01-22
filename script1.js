// Basic card animations with GSAP
gsap.registerPlugin(ScrollTrigger);

// Fade in and slide up on load
gsap.utils.toArray('.card').forEach((card, index) => {
  gsap.from(card, {
    opacity: 0,
    y: 50,
    duration: 1.2,
    delay: index * 0.5,
    ease: 'power2.out',
  });
});

// Hover animation
gsap.utils.toArray('.card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.1,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
});
