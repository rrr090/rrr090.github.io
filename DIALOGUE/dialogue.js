const dialogBox = document.getElementById('dialog-box');
const dialogText = document.getElementById('dialog-text');

// Массив с фразами диалога
const dialogues = [
    "taimas",
    "sat?",
    "1520 sat!",
    "ielts?",
    "8.0!",
];


let currentDialogueIndex = 0;

// Функция для смены текста
function showNextDialogue() {
    if (currentDialogueIndex < dialogues.length) {
        dialogText.textContent = dialogues[currentDialogueIndex];
        currentDialogueIndex++;
    } else {
        dialogText.textContent = "taimas!";
    }
}

// Показ первого текста при загрузке страницы
showNextDialogue();

// Добавляем обработчик клика по экрану
dialogBox.addEventListener('click', showNextDialogue);
