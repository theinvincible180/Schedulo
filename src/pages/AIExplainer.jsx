import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const AIExplainer = () => {
  const ai = new GoogleGenAI({ apiKey: apiKey });
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hi there! Ask me any computer science or scheduling question!" },
  ]);
  const [loading, setLoading] = useState(false);

  async function fetchExplanation() {
    if (!question.trim()) return;
    const newMessages = [...messages, { sender: "user", text: question }];
    setMessages(newMessages);
    setQuestion("");
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
You are an AI explainer who responds in a **clear, structured, and beautifully formatted** way using Markdown.  
Use **bold**, *italics*, bullet points, and line breaks for readability.  
Avoid giant paragraphs — use short, neat sentences.  
Keep your tone friendly and natural, like ChatGPT.

Question: ${question}
                `,
              },
            ],
          },
        ],
      });

      const answerText =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No answer returned.";
      setMessages([...newMessages, { sender: "ai", text: answerText }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "ai", text: "⚠️ Error fetching explanation from AI." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0b132b] text-white">
      {/* Header */}
      <header className="p-4 text-center bg-[#1c2541] shadow-md font-bold text-lg text-blue-400">
        🤖 AI Explainer
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-100 rounded-bl-none"
              }`}
            >
              <div className="bg-gray-800 text-gray-100 p-4 rounded-2xl shadow-md mt-3 whitespace-pre-line leading-relaxed">
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 text-sm p-3 rounded-2xl rounded-bl-none animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#1c2541] flex items-center gap-3 border-t border-gray-700">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={1}
          className="flex-1 p-3 bg-[#0b132b] text-white border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask your question..."
        />
        <button
          onClick={fetchExplanation}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-5 py-2 rounded-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIExplainer;
