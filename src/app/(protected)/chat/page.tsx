"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";

// Optional: Type definitions
interface ChatMessage {
  text: string;
  sender: "user" | "gen";
  time: string; // e.g., "Now"
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [grade, setGrade] = useState("");
  const [marker, setMarker] = useState("1 Marker");

  // Initial single GEN message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hey this is GEN. how can I help you today?",
      sender: "gen",
      time: "Now",
    },
  ]);

  // Framer-motion variants for animating each message
  const messageVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  // Handle sending a message
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user's message
    const newMessage: ChatMessage = {
      text: message,
      sender: "user",
      time: "Now",
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate a GEN response (replace with backend call if desired)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        text: "This is GEN's response.",
        sender: "gen",
        time: "Now",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white shadow-md mt-15 rounded-md overflow-hidden">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-lg font-semibold">
        Ask GEN
      </header>

      {/* Dropdown Row (Optional) */}
      <div className="flex flex-col sm:flex-row items-center gap-2 p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <label htmlFor="grade" className="text-sm font-medium text-gray-700">
            Grade:
          </label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Grade</option>
            {Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`).map(
              (g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label
            htmlFor="marker"
            className="text-sm font-medium text-gray-700"
          >
            Question Marker:
          </label>
          <select
            id="marker"
            value={marker}
            onChange={(e) => setMarker(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Array.from({ length: 15 }, (_, i) => (
              <option key={i} value={`${i + 1} Marker`}>
                {i + 1} Marker
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          return (
            <motion.div
              key={index}
              className={`flex items-start ${
                isUser ? "justify-end" : "justify-start"
              }`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-2 ${
                  isUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {/* Timestamp */}
                <div
                  className={`text-xs mt-1 ${
                    isUser ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
