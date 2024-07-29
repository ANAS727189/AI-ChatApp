import React from 'react';
import { motion } from 'framer-motion';
import githubIcon from '../assets/github.png';

const Navbar = () => {
  return (
    <>
      <motion.nav
        className="bg-purple-700 text-white shadow-md py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto cursor-pointer flex items-center justify-between px-4">
          <div className="text-2xl font-extrabold">
            <motion.span
              className="text-pink-500"
              initial={{ x: -100 }}
              animate={{ x: [0, 20, 0, 0]}}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ display: 'inline-block' }}
            >
              Chitty
            </motion.span>AI 🤖
          </div>
          <div>
            <a href="https://github.com/ANAS727189" target="_blank" rel="noopener noreferrer">
              <motion.img
                src={githubIcon}
                className="cursor-pointer"
                alt="My Github Profile"
                width={40}
                whileHover={{ scale: 1.2 }}
              />
            </a>
          </div>
        </div>
      </motion.nav>
      <motion.p
        className="bg-purple-800 text-purple-300 font-bold text-center shadow-md p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Made using Google <span className="text-red-600">Gemini</span> API.
      </motion.p>
    </>
  );
}

export default Navbar;
