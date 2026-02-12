import { motion } from 'framer-motion'
import './Section2_Cronograma.css'

const Section2_Cronograma = ({ onNext }) => {

  const timelineData = [
    {
      icon: '❤️',
      title: 'Primer Encuentro',
      date: 'Enero 2024',
      description: 'El día que nuestras miradas se cruzaron por primera vez y supe que algo especial comenzaba.',
      position: 'left'
    },
    {
      icon: '💕',
      title: 'Primera Cita',
      date: 'Febrero 2024',
      description: 'Una tarde mágica llena de risas, nervios y la certeza de que quería verte de nuevo.',
      position: 'right'
    },
    {
      icon: '💋',
      title: 'Primer Beso',
      date: 'Marzo 2024',
      description: 'Bajo las estrellas, el momento perfecto que quedará grabado en mi memoria para siempre.',
      position: 'left'
    },
    {
      icon: '✈️',
      title: 'Primer Viaje Juntos',
      date: 'Junio 2024',
      description: 'Aventuras, descubrimientos y la felicidad de explorar el mundo a tu lado.',
      position: 'right'
    },
    {
      icon: '🌟',
      title: 'Cada Día Contigo',
      date: 'Presente',
      description: 'Cada momento a tu lado es especial, cada día contigo es un regalo.',
      position: 'left'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="cronograma" className="section section-cronograma">
      <div className="content">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nuestro Tiempo Juntos
        </motion.h2>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${item.position}`}
              variants={item.position === 'left' ? itemVariants : itemVariantsRight}
            >
              <div className="timeline-content">
                <motion.div
                  className="timeline-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {item.icon}
                </motion.div>
                <h3>{item.title}</h3>
                <p className="date">{item.date}</p>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="btn-primary"
          onClick={onNext}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          Siguiente ❤️
        </motion.button>
      </div>
    </section>
  )
}

export default Section2_Cronograma
