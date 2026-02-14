import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizData } from '../data/quizData'
import './Section5_Quiz.css'

const Section5_Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answerIndex
    setUserAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitQuiz = () => {
    let calculatedScore = 0
    quizData.forEach((question, index) => {
      // Si correct es 999, todas las respuestas son correctas
      if (question.correct === 999) {
        calculatedScore++
      } else if (userAnswers[index] === question.correct) {
        calculatedScore++
      }
    })
    setScore(calculatedScore)
    setShowResult(true)
  }

  const getResultMessage = () => {
    const percentage = (score / quizData.length) * 100

    if (percentage === 100) {
      return {
        title: "¡Perfecto! 💖",
        message: "¡Me conoces a la perfección! Definitivamente eres mi persona favorita. Nadie me entiende como tú."
      }
    } else if (percentage >= 80) {
      return {
        title: "¡Excelente! 💕",
        message: "¡Casi perfecto! Me conoces muy bien. Está claro que prestas atención a los detalles."
      }
    } else if (percentage >= 60) {
      return {
        title: "¡Muy bien! 💗",
        message: "¡Nada mal! Conoces lo esencial sobre mí. Seguiremos descubriéndonos juntos."
      }
    } else if (percentage >= 40) {
      return {
        title: "¡Buen intento! 💝",
        message: "Aún nos queda mucho por descubrir el uno del otro, ¡y eso es emocionante!"
      }
    } else {
      return {
        title: "¡Hay que conocerse más! 💓",
        message: "Parece que tenemos muchas conversaciones pendientes. ¡Me encanta la idea de que me conozcas mejor!"
      }
    }
  }

  const questionVariants = {
    enter: {
      x: 100,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <section id="quiz" className="section section-quiz">
      <div className="content">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ¿Cuánto Me Conoces?
        </motion.h2>

        {!showResult ? (
          <div className="quiz-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                className="quiz-question"
                variants={questionVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h3>{quizData[currentQuestion].question}</h3>
                <div className={`quiz-options ${quizData[currentQuestion].hasImages ? 'with-images' : ''}`}>
                  {quizData[currentQuestion].options.map((option, index) => (
                    <motion.div
                      key={index}
                      className={`quiz-option ${userAnswers[currentQuestion] === index ? 'selected' : ''}`}
                      onClick={() => selectAnswer(index)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {typeof option === 'object' && option.image ? (
                        <div className="option-with-image">
                          <img src={option.image} alt={option.text} className="option-image" />
                          <span>{option.text}</span>
                        </div>
                      ) : (
                        option
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="quiz-navigation">
              {currentQuestion > 0 && (
                <motion.button
                  className="btn-secondary"
                  onClick={previousQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  ← Anterior
                </motion.button>
              )}

              {currentQuestion < quizData.length - 1 ? (
                <motion.button
                  className="btn-secondary"
                  onClick={nextQuestion}
                  disabled={userAnswers[currentQuestion] === undefined}
                  whileHover={{ scale: userAnswers[currentQuestion] !== undefined ? 1.05 : 1 }}
                  whileTap={{ scale: userAnswers[currentQuestion] !== undefined ? 0.95 : 1 }}
                  style={{
                    opacity: userAnswers[currentQuestion] !== undefined ? 1 : 0.5,
                    cursor: userAnswers[currentQuestion] !== undefined ? 'pointer' : 'not-allowed'
                  }}
                >
                  Siguiente →
                </motion.button>
              ) : (
                userAnswers[currentQuestion] !== undefined && (
                  <motion.button
                    className="btn-primary"
                    onClick={submitQuiz}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    Ver Resultado 💖
                  </motion.button>
                )
              )}
            </div>
          </div>
        ) : (
          <motion.div
            className="quiz-result"
            variants={resultVariants}
            initial="hidden"
            animate="visible"
          >
            <h3>{getResultMessage().title}</h3>
            <p>{getResultMessage().message}</p>
            <p className="score">
              {score} de {quizData.length} correctas ({((score / quizData.length) * 100).toFixed(0)}%)
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Section5_Quiz
