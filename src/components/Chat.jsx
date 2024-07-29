// src/components/Chat.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';


const api_key = import.meta.env.VITE_API_KEY;

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Hi there, How can I help you?");
  const [error, setError] = useState("");

  async function generateAi() {
    if (!question.trim()) {
      setAnswer("Hi there, How can I help you?");
      return;
    }
    try {
      setAnswer("⏳ Loading answer...");
      setError("");
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`,
        {
          contents: [{ parts: [{ text: question }] }],
        }
      );
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setError("An error occurred while fetching the response. Please try again.");
      setAnswer("");
    }
  }

  return (
    <div className="min-h-screen bg-purple-400 flex flex-col items-center justify-center py-10">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 lg:w-full md:w-full max-w-md "
        style={{ marginTop: '-100px' }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
             <motion.h1
          className="text-3xl font-extrabold mb-4 text-center text-purple-800"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          Chitty AI 
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ display: 'inline-block' }}
          >
            🤖
          </motion.span>
        </motion.h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-600"
          placeholder="Message Chitty ..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              generateAi();
            }
          }}
          rows="4"
        />
        <motion.button
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-800 transition duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateAi}
        >
          Generate
        </motion.button>
      </motion.div>
      <motion.div
        className="bg-gray-100 shadow-lg rounded-lg p-6 lg:w-full md:w-full max-w-md mt-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
         {answer && (
          <motion.div
            className="mt-4 p-4 bg-white text-purple-800 font-semibold border-l-4 border-purple-600 rounded shadow-inner overflow-x-auto whitespace-pre-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            dangerouslySetInnerHTML={{ __html: answer.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}
          />
        )}
        {error && (
          <p className="mt-4 p-2 bg-red-100 border border-red-300 rounded text-red-800">
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Chat;
