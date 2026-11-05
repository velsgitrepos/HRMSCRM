import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
}) => {
  const getDirections = () => {
    switch (direction) {
      case 'up':
        return { initial: { y: distance, x: 0 }, animate: { y: 0, x: 0 } };
      case 'down':
        return { initial: { y: -distance, x: 0 }, animate: { y: 0, x: 0 } };
      case 'left':
        return { initial: { x: distance, y: 0 }, animate: { x: 0, y: 0 } };
      case 'right':
        return { initial: { x: -distance, y: 0 }, animate: { x: 0, y: 0 } };
      case 'none':
      default:
        return { initial: { x: 0, y: 0 }, animate: { x: 0, y: 0 } };
    }
  };

  const { initial, animate } = getDirections();

  return (
    <motion.div
      initial={{ ...initial, opacity: 0 }}
      whileInView={{ ...animate, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 1.02, 0.43, 1.01],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
