import { motion } from 'framer-motion'
import './Section2_Cronograma.css'

const Section2_Cronograma = ({ onNext }) => {

  const timelineData = [
    {
      icon: '❤️',
      title: 'Primer Encuentro',
      date: '29 Noviembre 2025',
      description: 'Aunque haya sido un primer encuentro para el olvido, para mí será inolvidable.',
      position: 'left',
      image: 'img/white-dog-shaking.gif'
    },
    {
      icon: '💕',
      title: 'Primera Cita',
      date: '5 Diciembre 2025',
      description: 'Nos dejamos todos los torreznos y nos pusimos a toser como tontos en el restaurante.',
      position: 'right',
      image: 'img/idris-elba-coughing.gif'
    },
    {
      icon: '💝',
      title: 'Día Clave',
      date: '18 Diciembre 2025',
      description: 'Aquí fue el momento en el que nos empezamos a querer sin saberlo.',
      position: 'left',
      image: 'img/stan-twt-skeleton-banging-shield.gif'
    },
    {
      icon: '💗',
      title: 'Primer "Te Quiero"',
      date: '20 Enero 2026',
      description: 'El primero de muchos, te quiero.',
      position: 'right',
      image: 'img/squid-game-front-man.gif'
    },
    {
      icon: '🌟',
      title: 'Empezamos a Salir',
      date: '22 Enero 2026',
      description: 'Aunque no hay fecha concreta.',
      position: 'left',
      image: 'img/choso-is-handing-over-the-rose-to-v0-tnutaef0vxhc1.webp'
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
                {item.image && (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="timeline-gif"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                )}
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
