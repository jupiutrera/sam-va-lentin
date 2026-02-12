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
              Mi querida Paula,
            </motion.p>

            <motion.p variants={paragraphVariants}>
              En este día especial quiero que sepas lo importante que eres para mí.
              Desde el momento en que entraste en mi vida, todo cambió. Tu sonrisa
              ilumina mis días, tu risa es mi melodía favorita y tu presencia es el
              mejor regalo que podría pedir.
            </motion.p>

            <motion.p variants={paragraphVariants}>
              Contigo he aprendido que el amor verdadero existe, que la felicidad se
              encuentra en los pequeños momentos compartidos y que cada día a tu lado
              es una nueva aventura. Eres mi mejor amiga, mi cómplice, mi inspiración
              y mi hogar.
            </motion.p>

            <motion.p variants={paragraphVariants}>
              Gracias por ser exactamente como eres, por tu paciencia, tu cariño y por
              elegirme cada día. Prometo seguir cuidando de este amor que hemos construido
              juntos, de hacerte sonreír incluso en los días grises y de estar a tu lado
              siempre que me necesites.
            </motion.p>

            <motion.p variants={paragraphVariants}>
              Este San Valentín es solo una excusa más para recordarte lo mucho que te amo,
              pero la verdad es que te lo diré cada día, porque eres y serás siempre mi
              persona favorita.
            </motion.p>

            <motion.p className="signature" variants={paragraphVariants}>
              Con todo mi amor,<br />Tu enamorado
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
