let angle = 0;

function inc_angle() {
    angle++;
    if(angle>=361){
        angle=0;
    }
}

// ms
var interval = setInterval(inc_angle, 50);
let vel_rps = 1/(50*360);

const sliderVelocity = document.getElementById("RANGEVELOCITY");
const valueVelocity = document.getElementById("VALVELOCITY");
let progressVelocity = ((parseInt(vel_rps) - 1) / (sliderVelocity.max - sliderVelocity.min)) * 100;

sliderVelocity.addEventListener("input", () => {
    let Velocity = sliderVelocity.value;
    valueVelocity.textContent=parseInt(Velocity);
    clearInterval(interval);
    if(Velocity <= 0){
    }else{
        let Vel_in_Rpms =360/(Velocity * 1);
        interval = setInterval(inc_angle, parseInt(Vel_in_Rpms));
    }
    
    let progressVelocity = ((Velocity - 1) / (sliderVelocity.max - sliderVelocity.min)) * 100;
    sliderVelocity.style.background = `linear-gradient(to right, rgb(99, 99, 238) ${progressVelocity}%, #ccc ${progressVelocity}%)`;
});


sliderVelocity.style.background = `linear-gradient(to right, rgb(99, 99, 238) ${progressVelocity}%, #ccc ${progressVelocity}%)`;
valueVelocity.textContent=parseInt(vel_rps);

function updateGlobeSize() {
    // update size when resizing
    const elem = document.getElementById('Exoplanet');
    exoplanet
        .width(elem.clientWidth)
        .height(elem.clientHeight);
}


//Loading data to vars

    
function ambientLightOn() {
    const directionalLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
            directionalLight.intensity=0;
        }
        const ambientLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'AmbientLight');
        if (ambientLight) {
            ambientLight.intensity=3.14;
        }
}

function ambientLightOFF() {
    const ambientLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'AmbientLight');
        if (ambientLight) {
            ambientLight.intensity=0;
        }
        const directionalLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
            directionalLight.intensity=2;
        }
}

function dayCycle(orbitSpeed) {
    setTimeout(() => {
        // Wait for the scene to be populated (asynchronously)
        ambientLightOFF();
    }, 500);

    // Create an orbit path
    const orbitRadius = 5; // Adjust the radius of the orbit path as needed
    const orbitSegments = 64; // Adjust the number of segments for a smoother appearance
    const orbitGeometry = new THREE.CircleGeometry(orbitRadius, orbitSegments);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2; // Rotate the orbit path to be horizontal
    exoplanet.scene().add(orbit);

    // Define a function to make the directional light orbit
    function orbitDirectionalLight() {
        const directionalLight = exoplanet.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
        // Adjust the orbit speed as needed
        //const orbitSpeed = 0.00005;

        // Update the position of the directional light to follow the orbit path
        //const currentTime = Date.now();
        //angle = (currentTime * orbitSpeed) % (Math.PI * 2); // Calculate the angle based on time
        //console.log(angle)
        const angle_rad=angle/57.2958;
        const x = orbitRadius * Math.cos(angle_rad);
        const z = orbitRadius * Math.sin(angle_rad);
        directionalLight.position.set(x, 1, z);
        valueRotation.textContent=parseInt(angle);
        let progressRotation = ((parseInt(angle) - 1) / (sliderRotation.max - sliderRotation.min)) * 100;
        sliderRotation.style.background = `linear-gradient(to right, rgb(99, 99, 238) ${progressRotation}%, #ccc ${progressRotation}%)`;
        sliderRotation.value=parseInt(angle);
        }
        
        // Request the next animation frame
        requestAnimationFrame(orbitDirectionalLight);
    }

    // Call the orbitDirectionalLight function to start the orbit animation
    orbitDirectionalLight();
}



const exoplanetContainer = document.getElementById('Exoplanet');
const exoplanet = Globe()
    .backgroundImageUrl('/textures/background.jpg')
    .showGraticules(toggle_Grat.checked)
    .showAtmosphere(toggle_atmosphere.checked)
    (exoplanetContainer);
const sliderRotation = document.getElementById("rangeRotation");
const valueRotation = document.getElementById("valueRotation");
sliderRotation.addEventListener("input", () => {
    updateRotation();
});


// Function to update Rotation
function updateRotation() {
    let Rotation = sliderRotation.value;
    let progressRotation = ((Rotation - 1) / (sliderRotation.max - sliderRotation.min)) * 100;
    sliderRotation.style.background = `linear-gradient(to right, rgb(99, 99, 238) ${progressRotation}%, #ccc ${progressRotation}%)`;
    angle = Rotation;
}

// working now
const canvas = document.createElement('canvas');
// Генерация текстуры с использованием Canvas
function generateTexture() {
    const noise = new SimplexNoise();
    const ctx = canvas.getContext('2d');
    canvas.width = 2048;
    canvas.height = 2048;

    const imgData = ctx.createImageData(canvas.width, canvas.height);
    const palettes = [
        {
            colors: {
                first: '#001f3f',  // Палитра 0 nept h2so4
                second: '#f1e7b6',
                third: '#d9d9d9',
                fourth: '#7fdbff',
                fifth: '#4d4d4d',
                sixth: '#8e44ad',
                seventh: '#f39c12',
                 eight: '#001f3f'
            },
            thresholds: [0.30, 0.45, 0.65, 0.75, 0.85, 0.95, 0.99, 1.0] // Пороговые значения для палитры 1
        },
        {
            colors: {
                first: '#005F73',  // Палитра 1 nept water
                second: '#008C9E',
                third: '#A1D8E6',
                fourth: '#3B3B3B',
                fifth: '#B7B6B6',
                sixth: '#D9C5E0',
                seventh: '#00BFFF',
                 eight: '#001f3f'
            },
            thresholds: [0.40, 0.65, 0.80, 0.90, 0.95, 0.98, 0.99, 1.0] // Пороговые значения для палитры 2
        },
        {
            colors: {
            first: '#FF4500',  // Палитра 2 gas giant molten silicon
            second: '#B22222',
            third: '#8B0000',
            fourth: '#C0C0C0',
            fifth: '#FFD700',
            sixth: '#800080',
            seventh: '#00008B',
             eight: '#001f3f'
        },
        thresholds: [0.35, 0.55, 0.70, 0.80, 0.88, 0.95, 0.99, 1.0] // Пороговые значения для палитры 2
        },
        {
            colors:{
                first: '#654321',  // Палитра 3 super earth
                second: '#004d00', //#004d00
                third: '#3d9970',
                fourth: '#0074d9',
                fifth: '#0056A0',
                sixth: '#001f3f',
                seventh: '#a9e2f3',
                 eight: '#F6F8FF'
            },
            thresholds: [0.20, 0.35, 0.50, 0.75, 0.85, 0.91, 0.95, 1.00] // Пороговые значения для палитры 2
        },
        {
            colors:{
                first: '#0c0c0c',  // Палитра 4 terrestial
                second: '#4d4d4d',
                third: '#8b4513',
                fourth: '#c0c0c0',
                fifth: '#8b0000',
                sixth: '#ff4500',
                seventh: '#fdfd96',
                eight: '#001f3f'
            },
            thresholds: [0.20, 0.40, 0.65, 0.80, 0.90, 0.95, 0.98, 1.0] // Пороговые значения для палитры 2
        }
            
    
    ];
    let paletteIndex = 0; // Инициализация индекса палитры

    // Получаем выбранное значение из select
    const paletteSel = document.getElementById('exoTypeSelect').value;
    
    // Определяем индекс палитры в зависимости от выбранного типа
    if (paletteSel === "neptunian") {
        paletteIndex = 1;
    } else if (paletteSel === "terrestial") {
        paletteIndex = 4;
    } else if (paletteSel == "superEarth") {
        paletteIndex = 3;
    }
    else {
        paletteIndex = 2;
    }
    
    // Теперь, когда индекс установлен, мы можем получить палитру и пороги
    const palette = palettes[paletteIndex].colors;
    const thresholds = palettes[paletteIndex].thresholds;


    function getColor(value) {
        if (value < thresholds[0]) return palette.first;
        if (value < thresholds[1]) return palette.second;
        if (value < thresholds[2]) return palette.third;
        if (value < thresholds[3]) return palette.fourth;
        if (value < thresholds[4]) return palette.fifth;
        if (value < thresholds[5]) return palette.sixth;
        if (value < thresholds[6]) return palette.seventh;
        return palette.eight;
    }



    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const value = noise.noise2D(x / 500, y / 500);  // Генерация шума
            const normalizedValue = (value + 1) / 2; // Приведение значения к диапазону [0, 1]
            const color = getColor(normalizedValue); // Получение цвета на основе порогов

            const index = (x + y * canvas.width) * 4;
            imgData.data[index + 0] = parseInt(color.substring(1, 3), 16); // Красный
            imgData.data[index + 1] = parseInt(color.substring(3, 5), 16); // Зелёный
            imgData.data[index + 2] = parseInt(color.substring(5, 7), 16); // Синий
            imgData.data[index + 3] = 255; // Прозрачность
        }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL(); // Возвращает URL текстуры

}
// Обновление текстуры глобуса и установка в exoplanet
function updateGlobeImageUrl() {
    const dataURL = canvas.toDataURL();
    exoplanet.globeImageUrl(dataURL); // Установка текстуры в exoplanet
    exoplanet.bumpImageUrl(dataURL); // Установка текстуры в exoplanet
}

generateTexture();
// Начальная генерация текстуры
updateGlobeImageUrl();
//Load data to variables
// Call the setupScene function to initialize your scene
dayCycle();
//Load Texture
//loadTexture();

// Listen for the resize event and update the globe size
