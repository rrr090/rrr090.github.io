const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');
const dialogImage = document.getElementById('dialog-image'); // Слот для изображения
const dialogVideo = document.getElementById('dialog-video'); // Слот для видео
const videoSource = document.getElementById('video-source');
const nextButton = document.getElementById('next-btn');
const rocket = document.getElementById("character-image");

// Массив с фразами диалога
const dialogues = [
    "What do you know about exoplanets???",
    "Do you know what they are?",
    "What Is the Habitable Zone?",
    "For a planet, the habitable zone is the distance from a star that allows liquid water to persist on its surface – as long as that planet has a suitable atmosphere.",
    "transit method",
    "radial velocity method",
    "direct imaging method",
    "astronometry method",
    "gravitational microlensing",
];

// Массив с изображениями и видео (для определенных диалогов)
const media = [
    { type: 'none', src: null },  // Для первых трёх диалогов нет медиа
    { type: 'none', src: null },
    { type: 'none', src: null },
    { type: 'image', src: '/textures/habitatable.jpg' },  // Видео появится на 4 строке
    { type: 'video', src: '/textures/transit.mp4' },  // Картинка на 5 строке
    { type: 'video', src: '/textures/radial.mp4' },  // Видео на 6 строке
    { type: 'video', src: '/textures/direct.mp4' },  // Картинка на 7 строке
    { type: 'video', src: '/textures/astrometry.mp4' },  // Картинка на 8 строке
    { type: 'image', src: '/textures/gravimicro.jpg'}
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
                window.location.href='/site/work.html';
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
