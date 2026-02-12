import { useState } from 'react'
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
    </div>
  )
}

export default App
