document.addEventListener("DOMContentLoaded", () => {

    // 1. Сбор Информации
    const imageFiles = [
        "1.png",
        "10.png",
        "11.png",
        "12.png",
        "13.png",
        "14.png",
        "15.png",
        "16.png",
        "17.png",
        "18.png",
        "19.png",
        "2.png",
        "20.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
        "7.png",
        "8.png",
        "9.png"
    ];
    for (let i = 1; i <= 20; i++) {
        imageFiles.push(`${i}.jpg`);
    }

    const maxSlides = imageFiles.length;
    let currentIndex = 0;
    let isAnimating = false; // Блокировка частых кликов

    const catchphrases = [
        { title: "SCENE_01", desc: "Главный тизер. Музыкальное шоу, загрузка видеоряда." },
        { title: "SCENE_02", desc: "Анна на главной сцене. Блики и текстура одежды." },
        { title: "SCENE_03", desc: "Гардеробная Мечты. Симметрия и масштаб пространства." },
        { title: "SCENE_04", desc: "Розовый Кабриолет. Динамика и глубина кадра." },
        { title: "SCENE_05", desc: "Примерочная. Идеальная игра света и тени." },
        { title: "SCENE_06", desc: "Эпичный Особняк. Широкий архитектурный план." },
        { title: "SCENE_07", desc: "Студийная Съемка. Идеальные пропорции 'Sims'." },
        { title: "SCENE_08", desc: "Музыкальная Студия. Детализация инструментов." },
        { title: "SCENE_09", desc: "Идеальный Ужин. Композиция и фуд-стилистика." },
        { title: "SCENE_10", desc: "Мужской Клуб. Дымчатая и приватная эстетика." },
        { title: "SCENE_11", desc: "Азартная Игра. Фокус на фишках и долларах." },
        { title: "SCENE_12", desc: "Клубная Ночь. Неоновый свет и визуальный ритм." },
        { title: "SCENE_13", desc: "Воздушная Прогулка. Огромные элементы природы." },
        { title: "SCENE_14", desc: "Сердце-Зеркало. Искусственная 3D перспектива." },
        { title: "SCENE_15", desc: "Покупка. Крупная фактура матового пластика." },
        { title: "SCENE_16", desc: "Летний Бриз. Освещение, движение и легкость." },
        { title: "SCENE_17", desc: "Пуховик в Раю. Яркий залитый солнцем кадр." },
        { title: "SCENE_18", desc: "Релакс у Бассейна. Розовые шезлонги и вода." },
        { title: "SCENE_19", desc: "Гламурная Вечеринка. Контраст и вспышки камер." },
        { title: "SCENE_20", desc: "Гранд-Финал. Общий план всех элементов." }
    ];

    // 2. DOM Elements
    // Основные элементы
    const screenImg = document.getElementById('current-slide');
    const videoElem = document.getElementById('current-video');

    // Элементы динамичного СВЕЧЕНИЯ
    const glowImg = document.getElementById('glow-slide');
    const glowVideo = document.getElementById('glow-video');

    const descTitle = document.getElementById('desc-title');
    const descText = document.getElementById('desc-text');
    const slideCurrent = document.getElementById('slide-current');
    const slideTotal = document.getElementById('slide-total');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    slideTotal.innerHTML = String(maxSlides).padStart(2, '0');

    // 3. Events - AUTO PLAY LOGIC
    // Сценарий: Как только видео завершилось, ВРУБИТЬ СЛАЙД 2 АВТОМАТИЧЕСКИ
    videoElem.addEventListener('ended', () => {
        if (!isAnimating && currentIndex === 0) {
            changeSlide(1);
        }
    });

    // Initial Load
    updateContent(0, 0);

    // 4. Events - BUTTON LOGIC
    btnNext.addEventListener('click', () => {
        if (isAnimating) return;
        if (currentIndex < maxSlides - 1) {
            changeSlide(1);
        } else {
            // Эффект пружинки при сбое переключения в конец
            const activeElem = currentIndex === 0 ? videoElem : screenImg;
            gsap.fromTo(activeElem, { scale: 0.98 }, { scale: 1, duration: 0.2, ease: "bounce.out" });
        }
    });

    btnPrev.addEventListener('click', () => {
        if (isAnimating) return;
        if (currentIndex > 0) {
            changeSlide(-1);
        } else {
            const activeElem = currentIndex === 0 ? videoElem : screenImg;
            gsap.fromTo(activeElem, { scale: 0.98 }, { scale: 1, duration: 0.2, ease: "bounce.out" });
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'd') btnNext.click();
        if (e.key === 'ArrowLeft' || e.key === 'a') btnPrev.click();
    });

    // 5. Logic Functions: TV GLITCH ANIMATION
    function changeSlide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const nextIndex = currentIndex + direction;

        // Текущие видимые экраны
        const activeElemCurrent = currentIndex === 0 ? videoElem : screenImg;
        const activeGlowCurrent = currentIndex === 0 ? glowVideo : glowImg;

        // Вспышка ШУМА из 90-х как при переключении ЭЛТ телевизора
        gsap.to('.tv-noise', { opacity: 0.6, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" });

        // Эффект ВЫКЛЮЧЕНИЯ канала (плавное схлопывание)
        gsap.to([activeElemCurrent, activeGlowCurrent], {
            scaleY: 0.02,
            scaleX: 1.02,
            opacity: 0,
            filter: "brightness(2) grayscale(0.5)",
            duration: 0.25,
            ease: "power2.inOut",
            onComplete: () => {

                // Переключаем сам контент
                currentIndex = nextIndex;
                updateContent(currentIndex, direction);

                // Будущие видимые экраны
                const activeElemNext = currentIndex === 0 ? videoElem : screenImg;
                const activeGlowNext = currentIndex === 0 ? glowVideo : glowImg;

                // Включаем новый канал (Плавное разворачивание)
                gsap.fromTo([activeElemNext, activeGlowNext],
                    { scaleY: 0.02, scaleX: 1.02, filter: "brightness(2) grayscale(0.5)", opacity: 1 },
                    {
                        scaleY: 1, scaleX: 1, filter: "brightness(1) saturate(1.1) grayscale(0)", duration: 0.35, ease: "power3.out",
                        onComplete: () => setTimeout(() => { isAnimating = false; }, 100)
                    }
                );
            }
        });

        // Плавная анимация интерфейса (текст и номер слайда как у Apple)
        gsap.fromTo([descTitle, descText, slideCurrent],
            { y: Math.sign(direction) * 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
    }

    // 6. Обновление Source для Главного экрана и контейнера Glow
    function updateContent(index, direction) {

        // --- 01. ВИДЕО --- 
        if (index === 0) {
            screenImg.style.display = 'none';
            glowImg.style.display = 'none';

            videoElem.style.display = 'block';
            glowVideo.style.display = 'block';

            // Включаем оба видео синхронно с начала
            videoElem.currentTime = 0;
            glowVideo.currentTime = 0;
            videoElem.play().catch(e => console.log("Autoplay blocked:", e));
            glowVideo.play().catch(e => { });

        }
        // --- 02-20. ФОТОГРАФИИ ---
        else {
            videoElem.style.display = 'none';
            glowVideo.style.display = 'none';
            videoElem.pause();
            glowVideo.pause();

            screenImg.style.display = 'block';
            glowImg.style.display = 'block';

            // Меняем source у обеих картинок
            const imgSrc = `images_optimized/${imageFiles[index]}`;
            screenImg.src = imgSrc;
            glowImg.src = imgSrc;
        }

        // --- TEXT DATA ---
        const defaultData = { title: `SCENE_${String(index + 1).padStart(2, '0')}`, desc: "Данные загружаются..." };
        const data = catchphrases[index] || defaultData;

        descTitle.innerHTML = data.title;
        descText.innerHTML = data.desc;
        slideCurrent.innerHTML = String(index + 1).padStart(2, '0');

        // --- UI BUTTON STATE ---
        btnPrev.style.opacity = index === 0 ? "0.3" : "1";
        btnPrev.style.cursor = index === 0 ? "default" : "pointer";

        btnNext.style.opacity = index === maxSlides - 1 ? "0.3" : "1";
        btnNext.style.cursor = index === maxSlides - 1 ? "default" : "pointer";
    }

    // Легкая анимация появления UI при самой первой загрузке страницы
    gsap.fromTo('.info-panel', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" });
    gsap.fromTo('.remote-panel', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power3.out" });
});
