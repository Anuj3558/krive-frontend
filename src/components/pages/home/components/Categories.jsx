'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { featureKidsParty, FeatureKurta, featurePlatedSkirt, FeaturePlazo, TraditionalLengh } from '../../../../asstes'

const ProductCard = ({ title, subtitle, image, isLarge = false, delay = 0, price }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={`relative overflow-hidden shadow-2xl group ${
        isLarge ? 'h-96' : 'h-80'
      }`}
    >
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-110 "
        style={{ backgroundImage:`url(${image})` }}
      />
      {/* Added two overlay layers - a gradient base layer and a hover effect layer */}
      <div className="absolute inset-1 bg-[#5f60b9]/50 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-purple-600/0 transition-colors duration-300 group-hover:bg-[#5f60b9]/50" />
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
            className="text-3xl font-bold text-black transition-colors duration-300 group-hover:text-white/90 "
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: delay + 0.3 }}
            className="text-black group-hover:text-white/90 transition-colors duration-300"
          >
            {subtitle}
          </motion.p>
       
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
          className="self-start px-6 py-2 bg-black text-white hover:bg-[#00000090] hover:text-white transition-colors duration-300"
        >
          SHOP NOW
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function ProductCategories() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ProductCard
          title="Designer Kurta Set"
          subtitle="Elegant Embroidered Collection"
          price="2,999"
          isLarge
          delay={0}
          image={FeatureKurta}
        />
        <ProductCard
          title="Pleated Skirts"
          subtitle="Contemporary Style"
          price="1,499"
          isLarge
          delay={0.2}
          image={featurePlatedSkirt}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductCard
          title="Kids' Party Wear"
          subtitle="Festive Collection"
          price="1,999"
          delay={0.4}
          image={featureKidsParty}
        />
        <ProductCard
          title="Traditional Lehenga"
          subtitle="Wedding Collection"
          price="4,999"
          delay={0.5}
          image={TraditionalLengh}
        />
        <ProductCard
          title="Cotton Palazzo Set"
          subtitle="Summer Comfort"
          price="1,299"
          delay={0.6}
          image={FeaturePlazo}
        />
      </div>
    </section>
  )
}

