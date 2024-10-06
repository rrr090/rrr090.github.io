const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');
const dialogImage = document.getElementById('dialog-image'); // Слот для изображения
const dialogVideo = document.getElementById('dialog-video'); // Слот для видео
const videoSource = document.getElementById('video-source');
const nextButton = document.getElementById('next-btn');
const rocket = document.getElementById("character-image");
const audio = document.getElementById('background-music'); // Получаем элемент audio
const musicToggle = document.getElementById('music-toggle'); // Получаем кнопку
const musicStatus = document.getElementById('music-status'); // Получаем текст статуса музыки
const volumeSlider = document.getElementById('volume-slider'); // Получаем ползунок громкости
const nasa = document.getElementById('open-link');


// Массив с фразами диалога
const dialogues = [
    "What do you know about exoplanets?",
    "My name is Nasabek and I am your on-board computer that will guide you through this adventure",
    "There are innumerable amount of Exoplanets in space, which means that some of them can be habitable for humanity",
    'The habitable exoplanet should be in the "Habitable Zone"',
    "For a planet, the habitable zone is the distance from a star that allows liquid water to persist on its surface – as long as that planet has a suitable atmosphere.",
    "In order to find all of the secrets of the space humanity came up with 5 main methods of finding Exoplanets",
    'When an exoplanet passes in front of a star, it blocks out some of the light, like a solar eclipse. We call that “transit!” The more light that is blocked from a star, the bigger the planet. Scientists can use this information to learn about the type of exoplanet that is discovered.',
    "Radial velocity method 1092 planets were discovered using this method",
    "Direct imaging method, 82 exoplanet were discovered by this method",
    "Astronometry method, only 3 planets were discovered by this method",
    "And last method - Gravitational microlensing, 225 exoplanets were unveiled using this method",
    "In conclusion, scientists divided all Exoplanets to the 4 types: Gas giants, Terrestial, Super-Earths and Neptunian"
];

// Массив с изображениями и видео (для определенных диалогов)
const media = [
    { type: 'none', src: null },  
    { type: 'none', src: null },
    { type: 'none', src: null },
    { type: 'none', src: null },

    { type: 'image', src: '/textures/habitatable.jpg' },  
    { type: 'video', src: '/textures/transit.mp4' },  
    { type: 'video', src: '/textures/radial.mp4' },  
    { type: 'video', src: '/textures/direct.mp4' },  
    { type: 'video', src: '/textures/astrometry.mp4' },
    { type: 'image', src: '/textures/gravimicro.jpg'},
    { type: 'image', src: '/textures/exotypes.jpg'},
     { type: 'none', src: null },

];

const character = [
    '/rocket/racketa2.png',
    '/rocket/racketa3.png',
    '/rocket/racketa4.png',
    '/rocket/racketa5.png',
    '/rocket/racketa6.png',
    '/rocket/racketa7.png',
    '/rocket/racketa8.png',
    '/rocket/racketa9.png',
    '/rocket/racketa10.png',
];

let currentDialogueIndex = 0;
let typingTimeout;  // Переменная для хранения таймаута печати
let isTyping = false;  // Флаг для отслеживания процесса печати

// Функция для смены текста
function showNextDialogue() {
    // Если уже идет печать текста, останавливаем ее
    if (isTyping) {
        stopTyping();
    } else {
        if (currentDialogueIndex < dialogues.length) {
            // Вызываем функцию печати текста для текущей фразы
            typeText(dialogues[currentDialogueIndex], dialogText);
                // Обновляем изображение ракеты
                const randomNumber = getRandomNumber();
                rocket.src = character[randomNumber - 1];
    

            // Проверяем тип медиа и отображаем соответствующий элемент
            const currentMedia = media[currentDialogueIndex];
            if (currentMedia.type === 'video') {
                videoSource.src = currentMedia.src;
                dialogVideo.style.display = 'block'; // Показываем видео
                dialogVideo.load(); // Загружаем видео
                dialogVideo.play(); // Автоматически воспроизводим видео
                dialogImage.style.display = 'none'; // Скрываем изображение
            } else if (currentMedia.type === 'image') {
                dialogImage.src = currentMedia.src;
                dialogImage.style.display = 'block'; // Показываем изображение
                dialogVideo.style.display = 'none'; // Скрываем видео
            } else {
                dialogImage.style.display = 'none'; // Скрываем изображение
                dialogVideo.style.display = 'none'; // Скрываем видео
            }

            currentDialogueIndex++;
        } else {
            dialogImage.style.display = 'none'; // Скрываем изображение после диалога
            dialogVideo.style.display = 'none'; // Скрываем видео после диалога
            nextButton.style.display = 'none'; // Скрываем кнопку после завершения диалога
            dialogText.textContent = "Prepare for the cutting-edge adventure to the end of the galaxy!";
            setTimeout(() => {
                window.location.href='/nasabek/index.html';
            }, 1500);
        }
    }
}

// Функция для эффекта печати текста
function typeText(text, element, speed = 50) {
    element.textContent = "";  // Очищаем текст перед печатью
    let index = 0;
    isTyping = true;  // Устанавливаем флаг печати

    function type() {
        if (index < text.length) {
            element.innerHTML += text[index];
            index++;
            typingTimeout = setTimeout(type, speed);
        } else {
            isTyping = false;  // Печать завершена
        }
    }

    element.style.opacity = 1;  // Показать текст
    type();
}

// Функция для остановки печати текста
function stopTyping() {
    clearTimeout(typingTimeout);  // Останавливаем текущий таймаут печати
    isTyping = false;  // Сбрасываем флаг печати
    dialogText.textContent = dialogues[currentDialogueIndex - 1];  // Полностью выводим текущий текст
}


// Функция для генерации случайного числа от 1 до 9
function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

// Запуск генерации случайного числа каждые 250 мс (если нужно)
function startRandomNumberGeneration() {
    setInterval(() => {
        randomNumber = getRandomNumber();  // Обновляем глобальную переменную randomNumber
    }, 250); // 250 миллисекунд = четверть секунды
}

// Показ первого текста при загрузке страницы
showNextDialogue();

// Добавляем обработчик клика по кнопке
nextButton.addEventListener('click', showNextDialogue);

// Переменная для отслеживания состояния музыки
let isMusicPlaying = false;

// Функция для переключения музыки
function toggleMusic() {
    if (isMusicPlaying) {
        audio.pause(); // Остановить музыку
        musicStatus.textContent = 'Play Music'; // Изменить текст
    } else {
        audio.play(); // Запустить музыку
        musicStatus.textContent = 'Pause Music'; // Изменить текст
    }
    isMusicPlaying = !isMusicPlaying; // Переключить состояние
}

// Добавляем обработчик события на кнопку
musicToggle.addEventListener('click', toggleMusic);


// Устанавливаем начальную громкость
audio.volume = 1; // Уровень громкости от 0 до 1
// Добавляем обработчик события для ползунка громкости
volumeSlider.addEventListener('input', function() {
    audio.volume = volumeSlider.value / 100; // Устанавливаем громкость от 0 до 1
    document.getElementById('volume-value').textContent = `${volumeSlider.value}%`; // Обновляем отображаемое значение громкости
});

document.getElementById('open-link').addEventListener('click', function() {
    window.open('https://www.nasa.gov', '_blank'); 
});
