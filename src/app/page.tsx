"use client"
import {MaskContainer} from './Components/ui/MaskContainer'
import { motion } from "framer-motion"
import gsap from "gsap";
import { useLayoutEffect, useRef } from 'react';

const LandingPage = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.to(containerRef.current, {
      y: 16, // Moves down by 1rem (16px)
      duration: 1.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col justify-center items-center w-full h-[100vh] relative overflow-hidden
      bg-[radial-gradient(circle,_rgba(150,150,150,0.2)_1px,_transparent_1px)] 
      [background-size:20px_20px]"
    >
      {/* SVG Mask Effect (Hidden on Mobile) */}
      <div className="hidden sm:block">
        <MaskContainer
          revealText={
            <div ref={containerRef} className="flex flex-col text-center">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-['Poppins'] font-bold text-[5vw] mb-3 text-slate-800 dark:text-white"
              >
                Welcome to
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-['UtBoldOnsedemoregular'] tracking-tighter leading-none text-[10vw] text-slate-800 dark:text-white"
              >
                BlogKaro!
              </motion.h1>
            </div>
          }
          className="h-[90vh] flex flex-col items-center justify-center rounded-md border text-white dark:text-black mix-blend-difference"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-blue-500 font-bold text-[2vw]"
          >
            Express your thoughts with BlogKaro!
          </motion.span>
        </MaskContainer>
      </div>

      {/* Visible Text on Mobile (Hidden on Larger Screens) */}
      <div className="sm:hidden text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-['Poppins'] font-bold text-[7vw] mb-3 text-slate-800 dark:text-white"
        >
          Welcome to
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-['UtBoldOnsedemoregular'] tracking-tighter leading-none text-[12vw] text-slate-800 dark:text-white"
        >
          BlogKaro!
        </motion.h1>
      </div>

      {/* BUTTON BELOW "BlogKaro!" */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md 
         mb-5
        transition-all
        hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95"
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default LandingPage;