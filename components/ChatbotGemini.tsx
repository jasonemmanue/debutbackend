// components/ChatbotGemini.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ChatbotGemini.css';
// [MODIFIÉ] Importer le nouveau contexte depuis le fichier dédié
import { BUSINESS_BOOK_HOW_TO_CONTEXT } from '@/lib/chatbotContext';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Erreur: La clé API Gemini n'est pas définie. Vérifiez votre fichier .env.local (NEXT_PUBLIC_GEMINI_API_KEY).");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

// Définition des types pour les messages
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

function ChatbotGemini() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ text: "Bonjour ! Je suis l'assistant BusinessBook. Comment puis-je vous aider à utiliser la plateforme ?", sender: 'bot' }]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !model) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // [MODIFIÉ] Utilisation du nouveau contexte importé
      const prompt = `${BUSINESS_BOOK_HOW_TO_CONTEXT}\n\nQuestion de l'utilisateur: ${userMessage.text}\n\nRéponse:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botMessage: Message = { text: response.text(), sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Erreur lors de la communication avec Gemini:", error);
      setMessages(prev => [...prev, { text: "Désolé, une erreur est survenue.", sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container flex flex-col h-[60vh]">
      <div className="chatbot-messages flex-grow p-4 overflow-y-auto flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message p-3 rounded-xl max-w-[80%] ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="message p-3 rounded-lg bg-gray-200 self-start text-left mr-auto">
            Tape en cours...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input-form flex p-4 border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading || !API_KEY}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={loading || !input.trim() || !API_KEY}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ChatbotGemini;