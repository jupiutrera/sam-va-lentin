import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Section3_Pregunta.css'

const Section3_Pregunta = ({ onNext }) => {
  const [noCount, setNoCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const noButtonRef = useRef(null)

  const messages = [
    "¿Segura? 🥺",
    "Piénsalo mejor 💕",
    "Vamos... di que sí 🙏",
    "No seas cruel 😢",
    "¡Por favor! 💝",
    "¿Por qué no? ❤️",
    "¡Dale! 😊",
    "Ya casi... 😅",
    "¡Última oportunidad! 🥰"
  ]

  const moveButton = () => {
    // Calcular límites de la pantalla
    const maxX = window.innerWidth * 0.35  // 35% del ancho
    const maxY = window.innerHeight * 0.25 // 25% del alto

    // Generar posición aleatoria
    const newX = (Math.random() - 0.5) * maxX
    const newY = (Math.random() - 0.5) * maxY

    setNoPosition({ x: newX, y: newY })
  }

  const handleNoClick = () => {
    if (noCount < 9) {
      setNoCount(noCount + 1)
      setShowMessage(true)
      moveButton()
      setTimeout(() => setShowMessage(false), 2000)
    }
  }

  // Calcular tamaños
  const yesSize = 1 + noCount * 0.2
  const noSize = Math.max(0.4, 1 - noCount * 0.1)
  const noOpacity = Math.max(0.3, 1 - noCount * 0.1)

  return (
    <section className="section section-pregunta">
      <div className="pregunta-content">
        <motion.h2
          className="pregunta-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          La Pregunta Más Importante
        </motion.h2>

        <motion.p
          className="pregunta-question"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          ¿Quieres ser mi San Valentín? 💝
        </motion.p>

        {/* Mensaje dinámico */}
        <div className="message-container">
          <AnimatePresence mode="wait">
            {showMessage && (
              <motion.p
                className="pregunta-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {messages[Math.min(noCount - 1, messages.length - 1)]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Botones */}
        <div className="pregunta-buttons">
          <motion.button
            className="btn-yes"
            onClick={onNext}
            style={{ transform: `scale(${yesSize})` }}
            whileHover={{ scale: yesSize * 1.05 }}
            whileTap={{ scale: yesSize * 0.95 }}
          >
            ¡Sí! 💖
          </motion.button>

          {noCount < 9 ? (
            <motion.button
              ref={noButtonRef}
              className="btn-no"
              onMouseEnter={moveButton}
              onClick={handleNoClick}
              animate={{
                x: noPosition.x,
                y: noPosition.y,
                scale: noSize,
                opacity: noOpacity
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
            >
              No
            </motion.button>
          ) : (
            <motion.p
              className="surrender-message"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              Sabía que dirías que sí ✨
            </motion.p>
          )}
        </div>

        {/* Contador */}
        {noCount > 0 && noCount < 9 && (
          <motion.p
            className="pregunta-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
          >
            Intentos: {noCount} 😏
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default Section3_Pregunta
