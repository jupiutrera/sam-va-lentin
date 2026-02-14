import { motion } from 'framer-motion'
import './Section4_Carta.css'

const Section4_Carta = ({ onNext }) => {

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  }

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="carta" className="section section-carta">
      <div className="content">
        <motion.div
          className="letter"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="section-title"
            variants={paragraphVariants}
          >
            Para Ti
          </motion.h2>

          <div className="letter-content">
            <motion.p variants={paragraphVariants}>
              Hola Paula,
            </motion.p>

            <motion.p variants={paragraphVariants}>
              Contigo he aprendido que el amor existe, y aunque al inicio da un poco de miedo,
              lo que siento por ti es mucho más grande que el miedo que pueda llegar a sentir.
            </motion.p>

            <motion.p variants={paragraphVariants}>
              Gracias por ser exactamente como eres y por quererme por ser como soy.
            </motion.p>

            <motion.p variants={paragraphVariants}>
              Este San Valentín es solo una excusa más para recordarte lo mucho que te quiero,
              pero la verdad es que te lo diré cada día, porque eres mi persona favorita.
            </motion.p>

            <motion.p className="signature" variants={paragraphVariants}>
              Te quiero,<br />Juan
            </motion.p>
          </div>

          <motion.button
            className="btn-primary"
            onClick={onNext}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            variants={paragraphVariants}
          >
            Continuar ❤️
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Section4_Carta
