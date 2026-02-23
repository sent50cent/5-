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

    // --- VIDEO LOADER LOGIC ---
    const allVideos = document.querySelectorAll('.video-loader-wrapper video');
    allVideos.forEach(vid => {
        vid.style.opacity = '0'; // hide until loaded
        vid.style.transition = 'opacity 0.8s ease';

        const markLoaded = () => {
            const wrapper = vid.closest('.video-loader-wrapper');
            if (wrapper && !wrapper.classList.contains('is-loaded')) {
                wrapper.classList.add('is-loaded');
                vid.style.opacity = '1';
            }
        };

        // Trigger if data is available right away
        if (vid.readyState >= 2) {
            markLoaded();
        } else {
            vid.addEventListener('loadeddata', markLoaded);
            vid.addEventListener('canplay', markLoaded);
            vid.addEventListener('playing', markLoaded);
        }

        // Forcefully show video after timeout in case of browser strict autoplay blocks
        setTimeout(markLoaded, 3500);
    });

    // --- PARALLAX CLOUDS LOGIC ---
    const clouds = document.querySelectorAll('.pixel-clouds');
    clouds.forEach(cloud => {
        const speed = cloud.getAttribute('data-speed');
        gsap.to(cloud, {
            y: () => -ScrollTrigger.maxScroll(window) * speed * 0.2, // Move based on speed relative to max scroll
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1, // Smooth scrub
                invalidateOnRefresh: true
            }
        });
    });

    // --- FORCE PLAY VIDEOS ON MOBILE/SAFARI ---
    const forcePlayVideos = () => {
        allVideos.forEach(vid => {
            if (vid.paused && vid.readyState >= 2) {
                vid.play().catch(e => {
                    /* Catch playback errors smoothly (e.g. strict document interactions) */
                });
            }
        });
    };

    // Check periodically to ensure no video randomly freezes in carousel
    setInterval(forcePlayVideos, 1000);

    // Also try to play on interaction just in case
    document.addEventListener('touchstart', forcePlayVideos, { passive: true });
    document.addEventListener('click', forcePlayVideos, { passive: true });

});
