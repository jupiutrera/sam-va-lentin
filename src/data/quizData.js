// Calcular días juntos desde el 29 de noviembre de 2025
const calculateDaysTogether = () => {
  const startDate = new Date('2025-11-29')
  const today = new Date()
  const diffTime = Math.abs(today - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const daysTogether = calculateDaysTogether()

export const quizData = [
  {
    question: "¿Cuál es mi inicial de agua favorito?",
    options: [
      { text: "Mudkip", image: "img/mudkip.png" },
      { text: "Squirtle", image: "img/Squirtle.webp" },
      { text: "Piplup", image: "img/piplup.png" },
      { text: "Quaxly", image: "img/quaxly.png" }
    ],
    correct: 0,
    hasImages: true
  },
  {
    question: "¿Cuál es mi comida favorita?",
    options: ["Sushi 🍣", "Pizza 🍕", "Entrecot 🥩", "No sé 🤷"],
    correct: 3
  },
  {
    question: "¿Qué he estudiado?",
    options: [
      "Administración de Sistemas Informáticos en Red",
      "Desarrollo de Aplicaciones Web",
      "Desarrollo de Aplicaciones Multiplataforma",
      "Administración de Bases de Datos"
    ],
    correct: 0
  },
  {
    question: "¿Cuál es mi videojuego favorito?",
    options: [
      { text: "Skyrim", image: "img/the-elder-scrolls-v-skyrim-pc-juego-steam-europe-cover.jpg" },
      { text: "Terraria", image: "img/H2x1_NSwitchDS_Terraria.jpg" },
      { text: "Minecraft", image: "img/minecraft-java-bedrock-edition-pc-mac-cover.jpg" },
      { text: "Stardew Valley", image: "img/stardew_valley.jpg" }
    ],
    correct: 0,
    hasImages: true
  },
  {
    question: "¿Cuántas fotos tenemos juntos?",
    options: ["0", "1", "2", "3"],
    correct: 1
  },
  {
    question: "¿Cuántos días llevamos juntos?",
    options: [
      `${daysTogether - 2}`,
      `${daysTogether}`,
      `${daysTogether + 2}`,
      `${daysTogether + 4}`
    ],
    correct: 1
  },
  {
    question: "¿Qué peli vimos primero?",
    options: [
      { text: "Batman Begins", image: "img/batman_begins.webp" },
      { text: "The Dark Knight", image: "img/the dark knight.webp" },
      { text: "The Dark Knight Rises", image: "img/TheDarkKnightRises_Poster-1.webp" },
      { text: "Man of Steel", image: "img/man_of_steel.jpg" }
    ],
    correct: 1,
    hasImages: true
  },
  {
    question: "¿Cuál es el nombre del Shikigami más fuerte de Megumi que nunca ha sido domado?",
    options: [
      { text: "Rey Bestia", image: "img/Rey_Bestia_pregunta_fushiguro.webp" },
      { text: "Agito", image: "img/chimera-beast-agito-is-one-of-the-most-underrated-and-v0-9tki7aczwkqd1.webp" },
      { text: "Mahoraga", image: "img/makora.jpg" },
      { text: "Gran Serpiente Blanca", image: "img/Great_Serpent_29.webp" }
    ],
    correct: 2,
    hasImages: true
  },
  {
    question: "¿Cuánto te quiero?",
    options: ["Mucho 💕", "Muchísimo 💖", "Muchísísimo 💗", "Como la trucha al trucho 🐟"],
    correct: 3
  }
]
