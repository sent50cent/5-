document.addEventListener("DOMContentLoaded", () => {

    // 1. Сбор Информации
    const imageFiles = [
        "1.png",
        "2.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
        "7.png",
        "8.png",
        "9.png",
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
        "20.png",
        "21.png",
        "22.png",
        "23.png",
        "24.png"
    ];

    const maxSlides = imageFiles.length;
    let currentIndex = 0;
    let isAnimating = false; // Блокировка частых кликов

    const catchphrases = [
        { title: "SCENE_01", desc: "Главный тизер. Музыкальное шоу, загрузка видеоряда." },
        { title: "SCENE_02", desc: "Шоу-рум. Неоновые акценты и глянцевый манекен." },
        { title: "SCENE_03", desc: "Архитектура. Глубокая симметрия и пастельные тона." },
        { title: "SCENE_04", desc: "Крупный План. Идеальная пластика и свет." },
        { title: "SCENE_05", desc: "Студия. Минимализм, геометрия теней и пустоты." },
        { title: "SCENE_06", desc: "Внимание к Деталям. Текстура одежды крупным планом." },
        { title: "SCENE_07", desc: "Глянец. Дорогой журнальный сеттинг." },
        { title: "SCENE_08", desc: "Абсолютная Роскошь. Розовый интерьер и мягкий блюр." },
        { title: "SCENE_09", desc: "В движении. Размытие и эффект скорости." },
        { title: "SCENE_10", desc: "Контраст. Строгий силуэт на светлом фоне." },
        { title: "SCENE_11", desc: "Гардеробная Мечты. Запредельный масштаб." },
        { title: "SCENE_12", desc: "Арт-Объект. Футуристичный дизайн и холодный свет." },
        { title: "SCENE_13", desc: "Ожидание. Интимная и кинематографичная мизансцена." },
        { title: "SCENE_14", desc: "Высокая Мода. Безупречная стилистика кадра." },
        { title: "SCENE_15", desc: "За сценой. Атмосфера бэкстейджа." },
        { title: "SCENE_16", desc: "Силуэт. Игра с контровым светом." },
        { title: "SCENE_17", desc: "Интерьер. Классика в современной обработке." },
        { title: "SCENE_18", desc: "Городской Шик. Урбанистический фон и неон." },
        { title: "SCENE_19", desc: "Стритстайл. Динамичный уличный сеттинг." },
        { title: "SCENE_20", desc: "Абстракция. Форма, цвет и отсутствие лишнего." },
        { title: "SCENE_21", desc: "Новый Ракурс. Нестандартная операторская работа." },
        { title: "SCENE_22", desc: "Идеальный Ужин. Фуд-стилистика и композиция." },
        { title: "SCENE_23", desc: "Мужской Клуб. Дымчатая и приватная эстетика." },
        { title: "SCENE_24", desc: "Азартная Игра. Фокус на фишках и деталях." },
        { title: "SCENE_25", desc: "Гранд-Финал. Общий план всех элементов." }
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

    // --- ЛОДЕР И ПЛАВНЫЙ СТАРТ ---
    const pinkLoader = document.getElementById('pink-loader');

    function removeLoader() {
        if (!pinkLoader) return;
        pinkLoader.style.opacity = '0';
        pinkLoader.style.transform = 'scale(1.1)'; // легкий зум при исчезновении
        setTimeout(() => pinkLoader.remove(), 800); // Полностью удаляем из DOM

        // Как только Лодер спрятали запускаем UI
        gsap.fromTo('.info-panel', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
        gsap.fromTo('.remote-panel', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" });
    }

    // Если видео уже в кэше и готово
    if (videoElem.readyState >= 3) {
        removeLoader();
    } else {
        // Ждем пока видео скачается
        videoElem.addEventListener('canplay', removeLoader);
        // Запасной таймер на случай багов браузера (сработает через 4с)
        setTimeout(removeLoader, 4000);
    }

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
});
