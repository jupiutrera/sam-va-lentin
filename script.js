// ========================================
// Navegación entre secciones
// ========================================

function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// Botón "No" que se mueve
// ========================================

const btnNo = document.getElementById('btnNo');
let moveAttempts = 0;

// Función para mover el botón a una posición aleatoria
function moveNoButton() {
    const container = document.querySelector('#pregunta .buttons-container');
    const containerRect = container.getBoundingClientRect();

    // Dimensiones del botón
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;

    // Calcular posiciones aleatorias dentro del contenedor
    // Dejando margen para que no se salga
    const maxX = containerRect.width - btnWidth - 20;
    const maxY = containerRect.height - btnHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Aplicar la nueva posición
    btnNo.style.position = 'absolute';
    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';

    moveAttempts++;

    // Después de varios intentos, hacer el botón más pequeño
    if (moveAttempts > 5) {
        btnNo.style.transform = 'scale(0.8)';
    }
    if (moveAttempts > 10) {
        btnNo.style.transform = 'scale(0.6)';
    }
    if (moveAttempts > 15) {
        btnNo.style.opacity = '0.5';
    }
}

// Event listeners para el botón "No"
if (btnNo) {
    // Para desktop: detectar cuando el mouse se acerca
    btnNo.addEventListener('mouseenter', moveNoButton);

    // Para móvil: detectar cuando intentan tocarlo
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Click adicional por si acaso logran clickearlo
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });
}

// ========================================
// Quiz - Datos de Muestra
// ========================================

const quizData = [
    {
        question: "¿Cuál es mi comida favorita?",
        options: ["Pizza 🍕", "Sushi 🍣", "Pasta 🍝", "Hamburguesa 🍔"],
        correct: 0  // Índice de la respuesta correcta (0 = Pizza)
    },
    {
        question: "¿Cuál es mi color favorito?",
        options: ["Azul 💙", "Rojo ❤️", "Verde 💚", "Negro 🖤"],
        correct: 0  // Azul
    },
    {
        question: "¿Mi género de película favorito?",
        options: ["Acción 💥", "Comedia 😂", "Romance 💕", "Ciencia Ficción 🚀"],
        correct: 3  // Ciencia Ficción
    },
    {
        question: "¿Cuál es mi pasatiempo favorito?",
        options: ["Videojuegos 🎮", "Deportes ⚽", "Leer 📚", "Cocinar 👨‍🍳"],
        correct: 0  // Videojuegos
    },
    {
        question: "¿Qué prefiero para una cita?",
        options: ["Cena romántica 🍽️", "Cine 🎬", "Paseo por el parque 🌳", "Quedarnos en casa 🏠"],
        correct: 3  // Quedarnos en casa
    }
];

let currentQuestion = 0;
let userAnswers = [];
let score = 0;

// ========================================
// Quiz - Funciones
// ========================================

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = quizData[currentQuestion];

    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <div class="quiz-option" onclick="selectAnswer(${index})">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;

    // Restaurar respuesta previa si existe
    if (userAnswers[currentQuestion] !== undefined) {
        const options = questionContainer.querySelectorAll('.quiz-option');
        options[userAnswers[currentQuestion]].classList.add('selected');
    }

    updateNavigationButtons();
}

function selectAnswer(answerIndex) {
    // Guardar la respuesta del usuario
    userAnswers[currentQuestion] = answerIndex;

    // Actualizar visualmente la selección
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[answerIndex].classList.add('selected');

    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    // Mostrar/ocultar botón anterior
    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';

    // Mostrar botón siguiente o submit
    if (currentQuestion < quizData.length - 1) {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = userAnswers[currentQuestion] !== undefined ? 'block' : 'none';
    }
}

function nextQuestion() {
    if (userAnswers[currentQuestion] !== undefined && currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function submitQuiz() {
    // Calcular puntuación
    score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });

    // Mostrar resultado
    const quizContainer = document.getElementById('quiz-container');
    const resultDiv = document.getElementById('quiz-result');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    const resultScore = document.getElementById('result-score');

    quizContainer.style.display = 'none';
    resultDiv.style.display = 'block';

    // Mensajes personalizados según la puntuación
    let title, message;
    const percentage = (score / quizData.length) * 100;

    if (percentage === 100) {
        title = "¡Perfecto! 💖";
        message = "¡Me conoces a la perfección! Definitivamente eres mi persona favorita. Nadie me entiende como tú.";
    } else if (percentage >= 80) {
        title = "¡Excelente! 💕";
        message = "¡Casi perfecto! Me conoces muy bien. Está claro que prestas atención a los detalles.";
    } else if (percentage >= 60) {
        title = "¡Muy bien! 💗";
        message = "¡Nada mal! Conoces lo esencial sobre mí. Seguiremos descubriéndonos juntos.";
    } else if (percentage >= 40) {
        title = "¡Buen intento! 💝";
        message = "Aún nos queda mucho por descubrir el uno del otro, ¡y eso es emocionante!";
    } else {
        title = "¡Hay que conocerse más! 💓";
        message = "Parece que tenemos muchas conversaciones pendientes. ¡Me encanta la idea de que me conozcas mejor!";
    }

    resultTitle.textContent = title;
    resultMessage.textContent = message;
    resultScore.textContent = `${score} de ${quizData.length} correctas (${percentage.toFixed(0)}%)`;
}

// ========================================
// Inicialización
// ========================================

// Cargar la primera pregunta del quiz cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();

    // Opcional: Auto-scroll a la siguiente sección después de unos segundos en la pantalla inicial
    // setTimeout(() => {
    //     navigateToSection('cronograma');
    // }, 5000);
});
