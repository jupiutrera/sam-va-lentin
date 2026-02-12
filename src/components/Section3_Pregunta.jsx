import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Section3_Pregunta.css'

const Section3_Pregunta = ({ onNext }) => {
  const [noCount, setNoCount] = useState(0)
  const [currentMessage, setCurrentMessage] = useState('')
  const [hearts, setHearts] = useState([])
  const noButtonRef = useRef(null)

  // Mensajes progresivos
  const messages = [
    "¿Segura? 🥺",
    "Piénsalo mejor 💕",
    "Vamos... di que sí 🙏",
    "No seas cruel 😢",
    "¡Por favor! 💝",
    "Solo un sí... 🌟",
    "¿Por qué no? ❤️",
    "¡Dale! 😊",
    "Casi me convences... 😅",
    "¡Ya no puedes escapar! 🥰"
  ]

  // Calcular tamaños dinámicos
  const yesSize = Math.min(1 + noCount * 0.15, 2.5) // Crece hasta 2.5x (más controlado en móvil)
  const noSize = Math.max(0.4, 1 - noCount * 0.08) // Se reduce hasta 0.4x

  // Crear corazón flotante
  const addHeart = () => {
    const id = Date.now()
    setHearts(prev => [...prev, id])
    setTimeout(() => setHearts(prev => prev.filter(h => h !== id)), 2000)
  }

  // Manejar intento de click en "No"
  const handleNoAttempt = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (noCount >= 10) return

    addHeart()
    setNoCount(prev => prev + 2)
    setCurrentMessage(messages[Math.min(noCount, messages.length - 1)])

    // Ocultar mensaje después de 2 segundos
    setTimeout(() => setCurrentMessage(''), 2000)

    // Mover botón a posición aleatoria
    if (noButtonRef.current) {
      const container = noButtonRef.current.parentElement
      const containerRect = container.getBoundingClientRect()

      // Calcular nueva posición aleatoria
      const maxX = containerRect.width * 0.4
      const maxY = containerRect.height * 0.3

      const newX = (Math.random() - 0.5) * maxX
      const newY = (Math.random() - 0.5) * maxY

      noButtonRef.current.style.setProperty('--move-x', `${newX}px`)
      noButtonRef.current.style.setProperty('--move-y', `${newY}px`)
    }
  }

  return (
    <section className="section section-pregunta-v2">
      {/* Corazones flotantes */}
      <div className="hearts-container">
        <AnimatePresence>
          {hearts.map(id => (
            <motion.div
              key={id}
              className="heart-float"
              initial={{ scale: 0, y: 0, opacity: 1 }}
              animate={{ scale: 1.5, y: -150, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              💖
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="content-v2">
        {/* Título */}
        <motion.h2
          className="title-v2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          La Pregunta Más Importante
        </motion.h2>

        {/* Pregunta principal */}
        <motion.p
          className="question-v2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          ¿Quieres ser mi San Valentín? 💝
        </motion.p>

        {/* Mensaje dinámico */}
        <AnimatePresence mode="wait">
          {currentMessage && (
            <motion.p
              className="message-v2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              key={currentMessage}
            >
              {currentMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Contenedor de botones */}
        <div className="buttons-wrapper-v2">
          {/* Botón SÍ */}
          <motion.button
            className="btn-yes-v2"
            onClick={onNext}
            style={{
              scale: yesSize,
              fontSize: `${1 + noCount * 0.1}rem`
            }}
            whileHover={{ scale: yesSize * 1.05 }}
            whileTap={{ scale: yesSize * 0.98 }}
          >
            ¡Sí! 💖
          </motion.button>

          {/* Botón NO */}
          {noCount < 10 ? (
            <motion.button
              ref={noButtonRef}
              className="btn-no-v2"
              type="button"
              onMouseEnter={handleNoAttempt}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleNoAttempt(e)
                return false
              }}
              onPointerDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleNoAttempt(e)
                return false
              }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                return false
              }}
              style={{
                scale: noSize,
                opacity: Math.max(0.3, 1 - noCount * 0.08),
                '--move-x': '0px',
                '--move-y': '0px',
                pointerEvents: 'auto'
              }}
            >
              No
            </motion.button>
          ) : (
            <motion.p
              className="surrender-message"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              Sabía que dirías que sí ✨
            </motion.p>
          )}
        </div>

        {/* Contador (opcional) */}
        {noCount > 0 && noCount < 10 && (
          <motion.p
            className="counter-v2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
          >
            Intentos de escape: {noCount} 😏
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default Section3_Pregunta
