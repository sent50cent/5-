document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up and strict pop animations for elements
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        const textElements = section.querySelectorAll('.text-col, .section-header');
        const visualElements = section.querySelectorAll('.image-wrap');

        if (textElements.length > 0) {
            gsap.fromTo(textElements,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%"
                    }
                }
            );
        }

        if (visualElements.length > 0) {
            gsap.fromTo(visualElements,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%"
                    }
                }
            );
        }
    });

    // Retro hover effect on images: scale up image slightly, keep brutalist border fixed
    const imageWraps = document.querySelectorAll('.image-wrap');
    imageWraps.forEach(wrap => {
        wrap.addEventListener('mouseenter', () => {
            gsap.to(wrap.querySelector('img, video'), { scale: 1.05, duration: 0.4, ease: "power2.out" });
        });
        wrap.addEventListener('mouseleave', () => {
            gsap.to(wrap.querySelector('img, video'), { scale: 1, duration: 0.4, ease: "power2.out" });
        });
    });
});
