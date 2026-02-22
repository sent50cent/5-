document.addEventListener("DOMContentLoaded", () => {
    // 1. Image List
    const imageFiles = [
        "A_cinematic_medium_2k_202602211049_1.jpg",
        "A_dynamic_mediumwide_2k_202602211131_2.jpg",
        "A_medium_shot_2k_202602211035_1.jpg",
        "Prompt_1__2k_202602202202_1.jpg",
        "Prompt_a_cinematic_202602211313_1.jpg",
        "Prompt_a_cinematic_2k_202602201105-2_2.jpg",
        "Prompt_a_closeup_2k_202602201105_1.jpg",
        "Prompt_a_vibrant_2k_202602211313_2.jpg",
        "Take_a_still_2k_202602221130_1_1.jpg",
        "freepik__-__23038_1.jpg",
        "freepik__-__23042_1.jpg",
        "freepik__-__64990_1_1.jpg",
        "freepik__-__91247_1.jpg",
        "freepik__-img4-__71505_1.jpg",
        "hf_20260221_125005_a101d66e-dbca-4112-8af0-4573f7e9dc4c_3_1.jpg",
        "hf_20260221_125845_e5d02e05-0081-4f3e-8f54-1d85b9c3a713_1_1.jpg",
        "hf_20260221_165540_31739cdf-0044-46fb-a7c4-d3d55bc0d1bf_2.jpg"
    ];

    const app = document.getElementById('app');
    const pagination = document.querySelector('.pagination');

    // Funny placeholder titles and texts for Barbie context
    const catchphrases = [
        "Welcome to the Dream Reality!",
        "Every Day is a Fashion Show.",
        "Step Into the Pink Dimension.",
        "Where Dreams Meet Design.",
        "Luxury at Every Corner.",
        "A Doll's Cinematic Universe.",
        "Pink is the New Black.",
        "Your Plastic Perfection Awaits.",
        "Living in a Pastel Paradise.",
        "The Ultimate Dreamhouse.",
        "Beyond the Doll Box.",
        "Shine as Bright as Neon.",
        "Retro Meets the Future.",
        "A World Unbound by Rules.",
        "Aesthetically Yours.",
        "Where Style Reigns Supreme.",
        "The Finale of Fabulous."
    ];

    // 2. Generate Slides
    imageFiles.forEach((filename, index) => {
        // Create Slides
        const slide = document.createElement('section');
        slide.className = 'slide';
        // HTML structure for parallax and glass effect
        slide.innerHTML = `
            <div class="slide-bg-container">
                <div class="slide-overlay"></div>
                <div class="slide-bg" style="background-image: url('images_optimized/${encodeURIComponent(filename)}')"></div>
            </div>
            <div class="glass-card">
                <h2>Scene ${index + 1}</h2>
                <p>${catchphrases[index]}</p>
                <p>Welcome to an immersive visual experience. Let this high-end aesthetic take you on a journey through vibrant colors and dreamlike architecture.</p>
                <button class="glow-btn">Discover More</button>
            </div>
        `;
        app.appendChild(slide);

        // Create Navigation Dots
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
            lenis.scrollTo(slide, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        });
        pagination.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // 3. Initialize Smooth Scrolling (Lenis)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Integrated Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 4. GSAP Animations
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.querySelector('.progress-fill');

    // Make the progress bar update on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // Animate each slide
    slides.forEach((slide, i) => {
        const bg = slide.querySelector('.slide-bg-container');
        const content = slide.querySelector('.glass-card');

        // Set initial active dot
        if (i === 0) dots[0].classList.add('active');

        // Update dots on scroll
        ScrollTrigger.create({
            trigger: slide,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                if (self.isActive) {
                    dots.forEach(d => d.classList.remove('active'));
                    dots[i].classList.add('active');
                }
            }
        });

        // Background Parallax
        gsap.to(bg, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: slide,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Content Fade-in and Float up
        gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: slide,
                start: "top 75%", // Triggers animation when the top of the slide hits 75% down the viewport
                toggleActions: "play none none reverse" // re-animates if hovered back up
            }
        });
    });
});
