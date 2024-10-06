        // Track the current section
const accordion = document.getElementsByClassName('contentBx');
for(i = 0; i < accordion.length; i++){
  accordion[i].addEventListener('click', function(){
    this.classList.toggle('active')
  })
}



        var acc = document.getElementsByClassName("accordion");
        var i;
        
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
          });
        }
        let currentSection = 0;
        const sections = document.querySelectorAll('section');
        const totalSections = sections.length;

// Function to update section visibility
function updateSection() {
  const translateX = currentSection * -100;
  document.querySelector('.container').style.transform = `translateX(${translateX}vw)`;

  // Reset the reveal classes for all sections
  sections.forEach(section => {
      const content = section.querySelector('.content');
      const image = section.querySelector('img');
      const textBlockLeft = section.querySelector('.text-block-left');
      const textBlockRight = section.querySelector('.text-block-right');
      content.classList.remove('reveal');
      image.classList.remove('reveal');
      textBlockLeft.classList.remove('reveal');
      textBlockRight.classList.remove('reveal');
  });

  // Reveal the elements of the current section
  setTimeout(() => {
      const currentContent = sections[currentSection].querySelector('.content');
      const currentImage = sections[currentSection].querySelector('img');
      const currentTextBlockLeft = sections[currentSection].querySelector('.text-block-left');
      const currentTextBlockRight = sections[currentSection].querySelector('.text-block-right');
      currentContent.classList.add('reveal');
      currentImage.classList.add('reveal');
      currentTextBlockLeft.classList.add('reveal');
      currentTextBlockRight.classList.add('reveal');
              // Проверяем, на последней ли мы секции
              if (currentSection === totalSections - 1) {
                document.getElementById('prevBtn').style.display = 'none';
                document.getElementById('nextBtn').style.display = 'none';
            } else {
              pass
            }
        }, 200); // Adjust delay if needed for smooth transitions
}

        // Next button event
        document.getElementById('nextBtn').addEventListener('click', function() {
            if (currentSection < totalSections - 1) {
                currentSection++;
                updateSection();
            }
        });

        // Previous button event
        document.getElementById('prevBtn').addEventListener('click', function() {
          if (currentSection === 0) {
              // Redirect to main.html if we are on the first section
              window.location.href = "/rrr090.github.io/index.html"; // Change to the correct path if necessary
          } else {
              if (currentSection > 0) {
                  currentSection--;
                  updateSection();
              }
          }
      });
// Функция для начала теста - переход на другую страницу
function startTest() {
    window.location.href = "/test/test.html"; // Ссылка на новую страницу с тестом
}

// Изначальная загрузка страницы - обновляем секции
updateSection();