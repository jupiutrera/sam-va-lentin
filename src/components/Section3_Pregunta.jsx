import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import './Section3_Pregunta.css'

const Section3_Pregunta = ({ onNext }) => {
  const [attempts, setAttempts] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState([])
  const noButtonControls = useAnimation()
  const containerRef = useRef(null)

  // Mensajes que aparecen según los intentos
  const messages = [
    "¿Estás segura? 🥺",
    "Por favor di que sí 💕",
    "Venga, solo un sí pequeñito 🙏",
    "¿De verdad vas a decir que no? 😢",
    "Mi corazón se rompe un poquito 💔",
    "¡Solo dale al botón grande! 😊",
    "Sabes que quieres decir que sí ❤️",
    "Última oportunidad... 🎭",
    "¡Ya casi lo tienes! Solo di sí 🌟",
    "Por favor, por favor, por favor 🥰"
  ]

  // Crear corazones flotantes al intentar dar "No"
  const createFloatingHeart = (x, y) => {
    const id = Date.now() + Math.random()
    const newHeart = { id, x, y }
    setFloatingHearts(prev => [...prev, newHeart])
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== id))
    }, 2000)
  }

  // Mover el botón "No"
  const moveNoButton = (event) => {
    // Prevenir cualquier comportamiento por defecto
    event.preventDefault()
    event.stopPropagation()

    if (containerRef.current && attempts < 10) {
      const rect = containerRef.current.getBoundingClientRect()

      // Crear corazón flotante en la posición del cursor
      const x = event.clientX || (event.touches && event.touches[0].clientX) || rect.width / 2
      const y = event.clientY || (event.touches && event.touches[0].clientY) || rect.height / 2
      createFloatingHeart(x - rect.left, y - rect.top)

      const isMobile = window.innerWidth <= 768
      const btnWidth = isMobile ? 120 : 150
      const btnHeight = 50
      const padding = 80

      const maxX = rect.width / 2 - btnWidth / 2 - padding
      const maxY = rect.height / 2 - btnHeight / 2 - padding

      // Posición aleatoria mejorada
      const randomX = (Math.random() - 0.5) * maxX * 2
      const randomY = (Math.random() - 0.5) * maxY * 2

      noButtonControls.start({
        x: randomX,
        y: randomY,
        rotate: Math.random() * 360,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 15
        }
      })

      setAttempts(prev => prev + 1)
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 2000)
    }
  }

  // Tamaño del botón "Sí" crece con los intentos
  const getYesButtonScale = () => {
    return 1 + (attempts * 0.15)
  }

  // Tamaño del botón "No" se reduce con los intentos
  const getNoButtonScale = () => {
    return Math.max(0.3, 1 - (attempts * 0.08))
  }

  // Opacidad del botón "No"
  const getNoButtonOpacity = () => {
    return Math.max(0.2, 1 - (attempts * 0.08))
  }

  return (
    <section id="pregunta" className="section section-pregunta">
      {/* Corazones flotantes */}
      <AnimatePresence>
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            className="floating-heart-effect"
            initial={{
              opacity: 1,
              scale: 0,
              x: heart.x,
              y: heart.y
            }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: heart.y - 100,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="content">
        <motion.div
          className="question-container"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="section-title"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Una Pregunta Especial
          </motion.h2>

          <motion.p
            className="question-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ¿Quieres ser mi San Valentín? 💝
          </motion.p>

          {/* Mensaje dinámico */}
          <AnimatePresence>
            {showMessage && attempts > 0 && (
              <motion.p
                className="dynamic-message"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {messages[Math.min(attempts - 1, messages.length - 1)]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contenedor de botones */}
        <div className="buttons-container-new" ref={containerRef}>
          {/* Botón SÍ - Crece con cada intento */}
          <motion.button
            className="btn-yes-new"
            onClick={onNext}
            animate={{
              scale: getYesButtonScale(),
            }}
            whileHover={{
              scale: getYesButtonScale() * 1.1,
              boxShadow: "0 0 40px rgba(255, 23, 68, 0.8)"
            }}
            whileTap={{ scale: getYesButtonScale() * 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.8)",
                  "0 0 10px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ¡Sí! 💖
            </motion.span>
          </motion.button>

          {/* Botón NO - Se reduce y se mueve */}
          {attempts < 10 && (
            <motion.button
              className="btn-no-new"
              onMouseEnter={moveNoButton}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                moveNoButton(e)
              }}
              onTouchStart={(e) => {
                e.preventDefault()
                e.stopPropagation()
                moveNoButton(e)
              }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                return false
              }}
              animate={noButtonControls}
              style={{
                scale: getNoButtonScale(),
                opacity: getNoButtonOpacity()
              }}
              initial={{ x: 0, y: 0 }}
              whileHover={{
                backgroundColor: 'rgba(100, 100, 100, 0.9)'
              }}
            >
              No
            </motion.button>
          )}

          {/* Mensaje final después de 10 intentos */}
          {attempts >= 10 && (
            <motion.p
              className="final-message"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              ¡Sabía que dirías que sí! 🥰✨
            </motion.p>
          )}
        </div>

        {/* Contador de intentos (solo para diversión) */}
        {attempts > 0 && attempts < 10 && (
          <motion.p
            className="attempts-counter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
          >
            Intentos de escapar: {attempts} 😅
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default Section3_Pregunta
