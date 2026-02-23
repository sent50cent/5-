document.addEventListener("DOMContentLoaded", () => {
    // Включаем поддержку ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Главное окно при загрузке (Y2K Window)
    gsap.fromTo('.y2k-window',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.2, ease: "elastic.out(1, 0.75)" }
    );

    // Анимация каждого основного блока при скролле
    const blocks = document.querySelectorAll('.block:not(.hero-block)');

    blocks.forEach(block => {
        gsap.fromTo(block,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: block,
                    start: "top 85%", // Срабатывает когда верх элемента на 85% окна
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Каскадная анимация (стэггер) для сеток фото/карточек
    const grids = document.querySelectorAll('.media-grid');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.media-box');
        gsap.fromTo(items,
            { y: 50, scale: 0.9, opacity: 0 },
            {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Деликатный параллакс эффект для Y2K-фоновых пятен (блобов) при скроллинге
    gsap.to('.y2k-bg', {
        yPercent: 30, // Сдвигается вниз при скролле
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: true // Плавная привязка к скроллу мыши
        }
    });

});
