import React, {useState} from 'react'
import axios from 'axios';

const api_key = import.meta.env.VITE_API_KEY;


const Chat = () => {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
  
    async function generateAi() {
      try {
        setAnswer("⏳ Loading answer...") 
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`,
          method: "POST",
          data: {
            "contents": {
              "parts": [
                {
                  "text": `${question}`
                }
              ]
            }
          }
        });
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">AI ChatApp</h1>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                generateAi();
              }
            }}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={generateAi}
          >
            Generate
          </button>
          {answer && (
            <pre className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded text-gray-800 overflow-x-auto whitespace-pre-wrap">
              {answer}
            </pre>
          )}
        </div>
      </div>
    );
}

export default Chat