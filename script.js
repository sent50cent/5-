// Balenciaga / Apple Showcase Engine
// Powered by GSAP ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

// Director's Pitch Data Array
const media = [
    { type: 'video', src: 'images_optimized/video1.mp4', title: "ACT I:<br>THE AWAKENING", desc: "Оупенинг. Медленный наезд камеры (dolly in). Мы задаем масштаб пространства. Обволакивающий объемный свет погружает зрителя в абсолютно стерильную, гиперреалистичную среду." },
    { type: 'image', src: 'images_optimized/2.png', title: "SCENE 02:<br>THE ICON", desc: "Портретный план. Фокус на фактуре материалов и холодном, 'журнальном' свете. Героиня отстранена, взгляд направлен сквозь объектив. Чистая эстетика high fashion." },
    { type: 'image', src: 'images_optimized/3.png', title: "SCENE 03:<br>THE WARDROBE", desc: "Симметричная композиция а-ля Уэс Андерсон, утопленная в строгой глянцевой эстетике. Масштаб пространства подчеркивает статус и тотальный контроль героини." },
    { type: 'image', src: 'images_optimized/4.png', title: "SCENE 04:<br>THE DRIVE", desc: "Динамичный кадр с нижнего ракурса (low angle). Имитация съемки на экстремальный рыбий глаз. Чистая агрессия, скорость и визуальная свобода движения." },
    { type: 'image', src: 'images_optimized/5.png', title: "SCENE 05:<br>THE FITTING", desc: "Клаустрофобный, интимный кадр. Тяжелая игра света и тени сквозь жалюзи. Современный нео-нуар, переосмысленный через пастельные тона." },
    { type: 'image', src: 'images_optimized/6.png', title: "SCENE 06:<br>THE ESTATE", desc: "Общий план (Extreme Wide Shot). Парящий дрон-шот. Эпичность архитектуры контрастирует с чувством пугающей изоляции в идеальном мире." },
    { type: 'image', src: 'images_optimized/7.png', title: "SCENE 07:<br>THE DOLLHOUSE", desc: "Искусственная изометрическая 3D-перспектива. Статичная камера. Актеры позируют как безжизненные манекены. Абсолютный эффект 'зловещей долины'." },
    { type: 'image', src: 'images_optimized/8.png', title: "SCENE 08:<br>THE STUDIO", desc: "Клиповый, рваный сверхбыстрый монтаж. Обилие макро-деталей, хромированных бликов. Цветокоррекция с жестким уходом в холодный синий неон." },
    { type: 'image', src: 'images_optimized/9.png', title: "SCENE 09:<br>THE BANQUET", desc: "Сюрреалистичный натюрморт. Идеальная фуд-стилистика, граничащая с абсурдом потребления. Глубокие падающие тени и гипер-высокий контраст." },
    { type: 'image', src: 'images_optimized/10.png', title: "SCENE 10:<br>THE PRIVILEGE", desc: "Тяжелый дым, плотное контровое освещение. Силуэты выхватываются резкими вспышками блайндеров. Дорогая, закрытая аура элитарного клуба." },
    { type: 'image', src: 'images_optimized/11.png', title: "SCENE 11:<br>THE STAKES", desc: "Медленное, гипнотическое вращение фишек и купюр (slow-mo 1000fps). Фокус пульсирует, визуализируя нарастающее звуковое напряжение бита." },
    { type: 'image', src: 'images_optimized/12.png', title: "SCENE 12:<br>THE PULSE", desc: "Кинетический световой формализм. Динамика создается не актерами, а агрессивным движением цветных световых пятен по их застывшим лицам." },
    { type: 'image', src: 'images_optimized/13.png', title: "SCENE 13:<br>THE HORIZON", desc: "Огромный панорамный задник, который нарочито не скрывает, что он фальшивый. Визуальная метафора тотального отрыва от земной реальности." },
    { type: 'image', src: 'images_optimized/14.png', title: "SCENE 14:<br>THE FRACTURE", desc: "Безумная ломаная геометрия кадра. Деконструкция пространства с помощью огромных зеркал. Камера агрессивно заваливает горизонт ('голландский угол')." },
    { type: 'image', src: 'images_optimized/15.png', title: "SCENE 15:<br>THE HAUL", desc: "Fetish-съемка неодушевленных объектов. Обволакивающая пленка, стерильные световые блики на матовом пластике. Гипер-консьюмеризм как искусство." },
    { type: 'image', src: 'images_optimized/16.png', title: "SCENE 16:<br>THE BREEZE", desc: "Заполняющий, предельно мягкий свет (Soft box). Движение легкой ткани в кадре дает медитативный ритм и заполняет паузу в музыкальном бите." },
    { type: 'image', src: 'images_optimized/17.png', title: "SCENE 17:<br>THE PEAK", desc: "Ослепляющий прямой солнечный свет. Жесткий визуальный формализм. Композиция кадра математически выстроена строго по золотому сечению." },
    { type: 'image', src: 'images_optimized/18.png', title: "SCENE 18:<br>THE OASIS", desc: "Вид строго сверху (Top-down shot, God's eye). Абстрактный паттерн из шезлонгов и бликов воды. Гипнотический визуальный релакс перед финалом." },
    { type: 'image', src: 'images_optimized/19.png', title: "SCENE 19:<br>THE GLARE", desc: "'Папарацци' стайл. Жесткие, стробящие вспышки камер прямо в объектив (Flashing lights). Абсолютный визуальный хаос, глэм и первобытный драйв." },
    { type: 'image', src: 'images_optimized/20.png', title: "SCENE 20:<br>THE CLIMAX", desc: "Гранд-кадр. Эпилог. Вся мизансцена собирается воедино. Камера плавно, монументально отъезжает назад (dolly out), погружая сцену в глубокую тьму." }
];

document.addEventListener("DOMContentLoaded", () => {

    // Простая анимация появления стартового экрана
    gsap.to('.hero-title', { opacity: 1, y: -20, duration: 1.5, ease: "power3.out", delay: 0.2 });
    gsap.to('.hero-subtitle', { opacity: 1, y: -10, duration: 1.5, ease: "power3.out", delay: 0.6 });

    const container = document.getElementById('scroll-container');

    // 1. Динамическая Генерация DOM-дерева контента
    media.forEach((item, index) => {
        const isVideo = item.type === 'video';

        // Рендерим теги video или img
        const mediaTag = isVideo
            ? `<video class="scene-media" src="${item.src}" muted loop playsinline></video>`
            : `<img class="scene-media" src="${item.src}" alt="${item.title.replace('<br>', ' ')}">`;

        const slideNumber = String(index + 1).padStart(2, '0');

        // Собираем HTML блок
        container.innerHTML += `
            <section class="scene-block" id="scene-${index}">
                <div class="media-wrapper">
                    ${mediaTag}
                </div>
                <div class="scene-text-overlay">
                    <span class="scene-number">SHOT ${slideNumber} / 20</span>
                    <h2 class="scene-title">${item.title}</h2>
                    <p class="scene-desc">${item.desc}</p>
                </div>
            </section>
        `;
    });

    // 2. Инициализация Анимаций ScrollTrigger 
    // Даем небольшую задержку, чтобы DOM успел отрендериться
    setTimeout(() => {

        const sections = gsap.utils.toArray('.scene-block');

        sections.forEach((section) => {
            const mediaWrapper = section.querySelector('.media-wrapper');
            const mediaElem = section.querySelector('.scene-media');
            const textOverlay = section.querySelector('.scene-text-overlay');

            // Задаем базовое состояние до того как произойдет скролл (Сжатая картинка, текст внизу)
            gsap.set(mediaWrapper, { clipPath: 'inset(15% 15% 15% 15%)', opacity: 0, scale: 0.95 });
            gsap.set(textOverlay, { y: 100, opacity: 0 });

            // Таймлайн появления (Fade In & Scale Up)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%", // Срабатывает когда верх секции достигает 75% экрана
                    end: "bottom 30%",
                    toggleActions: "play reverse play reverse", // Проигрывать туда-обратно
                    onEnter: () => {
                        if (mediaElem.tagName === 'VIDEO') mediaElem.play().catch(() => { });
                    }
                }
            });

            // Магия появления а-ля Apple
            tl.to(mediaWrapper, {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: "power3.out"
            }, 0)
                .to(textOverlay, {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out"
                }, 0.2); // Текст выплывает с мили-задержкой

            // Эффект Параллакса (Parallax) – Картинка внутри рамки едет медленнее чем страница
            gsap.to(mediaElem, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true // Анимация привязывается к позиции колесика мышки
                }
            });
        });

    }, 100);
});
