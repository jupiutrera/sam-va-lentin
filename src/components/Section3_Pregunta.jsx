import { useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import './Section3_Pregunta.css'

const Section3_Pregunta = ({ onNext }) => {
  const [moveAttempts, setMoveAttempts] = useState(0)
  const controls = useAnimation()
  const containerRef = useRef(null)

  const moveNoButton = () => {
    if (containerRef.current) {
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()

      // Obtener dimensiones reales del botón y contenedor
      const isMobile = window.innerWidth <= 768
      const btnWidth = isMobile ? 180 : 200
      const btnHeight = isMobile ? 60 : 70

      // Espacio disponible (considerando padding del contenedor)
      const padding = isMobile ? 40 : 60

      // Calcular límites seguros
      const minX = -containerRect.width / 2 + btnWidth / 2 + padding
      const maxX = containerRect.width / 2 - btnWidth / 2 - padding
      const minY = -containerRect.height / 2 + btnHeight / 2 + padding
      const maxY = containerRect.height / 2 - btnHeight / 2 - padding

      // Dividir en cuadrantes para mejor distribución
      const quadrants = [
        { xRange: [minX, 0], yRange: [minY, 0] },           // Top-left
        { xRange: [0, maxX], yRange: [minY, 0] },           // Top-right
        { xRange: [minX, 0], yRange: [0, maxY] },           // Bottom-left
        { xRange: [0, maxX], yRange: [0, maxY] }            // Bottom-right
      ]

      // Seleccionar cuadrante aleatorio
      const quadrant = quadrants[Math.floor(Math.random() * quadrants.length)]

      // Generar posición aleatoria dentro del cuadrante seleccionado
      const randomX = quadrant.xRange[0] + Math.random() * (quadrant.xRange[1] - quadrant.xRange[0])
      const randomY = quadrant.yRange[0] + Math.random() * (quadrant.yRange[1] - quadrant.yRange[0])

      // Animar a la nueva posición con movimiento brusco
      controls.start({
        x: randomX,
        y: randomY,
        transition: {
          type: 'tween',
          duration: 0.15,
          ease: 'easeOut'
        }
      })

      setMoveAttempts(prev => prev + 1)
    }
  }

  // Calcular escala basada en intentos
  const getScale = () => {
    if (moveAttempts > 15) return 0.6
    if (moveAttempts > 10) return 0.7
    if (moveAttempts > 5) return 0.85
    return 1
  }

  // Calcular opacidad
  const getOpacity = () => {
    if (moveAttempts > 15) return 0.5
    return 1
  }

  return (
    <section id="pregunta" className="section section-pregunta">
      <div className="content">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Una Pregunta Importante
        </motion.h2>

        <motion.p
          className="question-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          ¿Quieres ser mi San Valentín?
        </motion.p>

        <div className="buttons-container" ref={containerRef}>
          <motion.button
            className="btn-yes"
            onClick={onNext}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
          >
            ¡Sí! 💖
          </motion.button>

          <motion.button
            className="btn-no"
            onHoverStart={moveNoButton}
            onTouchStart={(e) => {
              e.preventDefault()
              moveNoButton()
            }}
            onClick={(e) => {
              e.preventDefault()
              moveNoButton()
            }}
            animate={controls}
            initial={{ x: 0, y: 0, opacity: 0 }}
            whileInView={{ opacity: getOpacity() }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            style={{
              scale: getScale(),
              position: 'absolute'
            }}
          >
            No
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default Section3_Pregunta
