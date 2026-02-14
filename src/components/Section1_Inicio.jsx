import { motion } from 'framer-motion'
import './Section1_Inicio.css'

const Section1_Inicio = ({ onNext }) => {
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    }
  }

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        type: 'spring',
        stiffness: 200
      }
    }
  }

  const heartVariants = {
    float: (custom) => ({
      y: [0, -120, -240, -360, -480, -600, -720, -840, -960],
      opacity: [0, 1, 1, 1, 1, 1, 0.9, 0.7, 0],
      rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
      scale: [0.8, 1, 1.1, 1, 0.9, 1, 1.1, 1, 0.8],
      transition: {
        duration: 7,
        repeat: Infinity,
        delay: custom * 1.5,
        ease: 'easeInOut'
      }
    })
  }

  return (
    <section id="inicio" className="section section-inicio">
      {/* Corazones Flotantes Mejorados */}
      <div className="hearts-bg">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <motion.div
            key={index}
            className="heart"
            custom={index}
            variants={heartVariants}
            animate="float"
            style={{
              left: `${5 + index * 12}%`,
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="content">
        <motion.h1
          className="title-main"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Feliz San Valentín
        </motion.h1>

        <motion.h2
          className="title-name"
          variants={nameVariants}
          initial="hidden"
          animate="visible"
        >
          Paula
        </motion.h2>

        <motion.button
          className="btn-primary"
          onClick={onNext}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Empezar ❤️
        </motion.button>
      </div>
    </section>
  )
}

export default Section1_Inicio
