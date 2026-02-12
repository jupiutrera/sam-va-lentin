import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section1_Inicio from './components/Section1_Inicio'
import Section2_Cronograma from './components/Section2_Cronograma'
import Section3_Pregunta from './components/Section3_Pregunta'
import Section4_Carta from './components/Section4_Carta'
import Section5_Quiz from './components/Section5_Quiz'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [direction, setDirection] = useState(0)
  const totalSections = 5

  const sections = [
    Section1_Inicio,
    Section2_Cronograma,
    Section3_Pregunta,
    Section4_Carta,
    Section5_Quiz
  ]

  const goToSection = (newSection) => {
    if (newSection >= 0 && newSection < totalSections) {
      setDirection(newSection > currentSection ? 1 : -1)
      setCurrentSection(newSection)
    }
  }

  const nextSection = () => goToSection(currentSection + 1)
  const prevSection = () => goToSection(currentSection - 1)

  // Navegación con teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      // BLOQUEAR teclas en la sección 3 (pregunta) - solo se puede avanzar con botón "Sí"
      if (currentSection === 2 && (e.key === 'ArrowRight' || e.key === 'ArrowDown')) {
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSection()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSection()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSection])

  // Detección de swipe para móvil mejorada
  useEffect(() => {
    let touchStartY = 0
    let touchStartX = 0
    let scrollElement = null

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
      // Encontrar el elemento con scroll
      scrollElement = document.querySelector('.section-wrapper')
    }

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const diffY = touchStartY - touchEndY
      const diffX = touchStartX - touchEndX

      // BLOQUEAR SWIPE en la sección 3 (pregunta) - solo se puede avanzar con botón "Sí"
      if (currentSection === 2) {
        return
      }

      // Solo detectar swipe vertical significativo
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 70) {
        // Verificar posición de scroll
        if (scrollElement) {
          const isAtTop = scrollElement.scrollTop <= 5
          const isAtBottom = scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight <= 5

          // Swipe up (ir a siguiente) solo si está en el final del scroll
          if (diffY > 0 && isAtBottom) {
            nextSection()
          }
          // Swipe down (ir a anterior) solo si está en el tope del scroll
          else if (diffY < 0 && isAtTop) {
            prevSection()
          }
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSection])

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1
    },
    exit: (direction) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  }

  const CurrentSectionComponent = sections[currentSection]

  return (
    <div className="app-container">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSection}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: 'easeInOut'
          }}
          className="section-wrapper"
        >
          <CurrentSectionComponent onNext={nextSection} onPrev={prevSection} />
        </motion.div>
      </AnimatePresence>

      {/* Indicadores de sección - Ocultos en sección pregunta */}
      {currentSection !== 2 && (
        <div className="section-indicators">
          {[...Array(totalSections)].map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSection ? 'active' : ''}`}
              onClick={() => goToSection(index)}
              aria-label={`Ir a sección ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Botones de navegación para desktop - Ocultos en sección pregunta */}
      {currentSection > 0 && currentSection !== 2 && (
        <button className="nav-button prev" onClick={prevSection} aria-label="Sección anterior">
          ←
        </button>
      )}
      {currentSection < totalSections - 1 && currentSection !== 2 && (
        <button className="nav-button next" onClick={nextSection} aria-label="Siguiente sección">
          →
        </button>
      )}
    </div>
  )
}

export default App
