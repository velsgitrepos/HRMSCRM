import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const letters = "TALENT CARPET".split("");

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.2,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#1E378B] to-[#112361] text-white"
    >
      {/* Premium Loader Ring */}
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#75BB3F]/20 border-t-[#75BB3F] rounded-full"
        />
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute w-8 h-8 bg-[#1E378B]/40 rounded-full blur-sm"
        />
      </div>

      {/* Brand Text Stagger */}
      <h2 className="flex space-x-1 text-2xl md:text-3xl font-extrabold tracking-widest text-white/90">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className={char === " " ? "w-2" : "inline-block"}
            style={{
              background: char !== " " ? "linear-gradient(to right, #ffffff, #75BB3F)" : "none",
              WebkitBackgroundClip: char !== " " ? "text" : "none",
              WebkitTextFillColor: char !== " " ? "transparent" : "none",
            }}
          >
            {char}
          </motion.span>
        ))}
      </h2>

      {/* Elegant subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-3 text-xs md:text-sm font-medium tracking-wider text-slate-300 uppercase"
      >
        Laying the Red Carpet for Elite Talents
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
