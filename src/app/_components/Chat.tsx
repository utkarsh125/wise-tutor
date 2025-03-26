"use client";

import React, { useState } from "react";

import AIInput from "../(protected)/chat/ai-input";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "ai";
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSend = async (input: string) => {
    const parts = input.split(",").map((part) => part.trim());

    let grade: string | undefined;
    let marker: number | undefined;
    let subject: string | undefined;
    let difficulty: string | undefined;
    let topic: string | undefined;

    if (parts.length === 1) {
      // Only a generic prompt is provided.
      topic = parts[0];
    } else if (parts.length === 5) {
      // Format: Grade, Marker, Subject, Difficulty, Topic
      grade = parts[0];
      marker = parts[1] ? parseInt(parts[1]) : undefined;
      subject = parts[2];
      difficulty = parts[3];
      topic = parts[4];
    } else if (parts.length >= 3) {
      // Fallback format: Grade, Marker, Subject, (optional Topic)
      grade = parts[0];
      marker = parts[1] ? parseInt(parts[1]) : undefined;
      subject = parts[2];
      if (parts.length === 4) {
        topic = parts[3];
      }
    } else {
      alert(
        "Please provide input as either:\n • A generic prompt, OR\n • Grade, Marker, Subject, (optional Difficulty, optional Topic)"
      );
      return;
    }

    // Append the user's message to the conversation.
    setMessages((prev) => [...prev, { role: "user", text: input }]);

    try {
      // Call the secure API route that uses server-side Gemini logic.
      const payload = {
        grade,
        marker,
        subject,
        difficulty, // may be undefined if not provided
        input: topic, // topic or generic prompt
      };

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { text: string };
      if (data?.text) {
        setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching from /api/gemini:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error generating response." },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      {/* Animated header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-purple-100 p-5 rounded-md w-full max-w-xl"
      >
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white">
          Ask GEN. to craft the perfect questions for students and test their capabilities.
        </h1>
      </motion.div>
      {/* Chat conversation area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-64 overflow-y-auto"
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Conversation will appear here...
          </p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              {msg.role === "user" ? (
                <span className="inline-block p-2 rounded-lg bg-blue-500 text-white">
                  {msg.text}
                </span>
              ) : (
                // Render AI messages as markdown.
                <div className="prose dark:prose-dark">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              )}
            </div>
          ))
        )}
      </motion.div>
      {/* Animated input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-4 w-full max-w-xl"
      >
        <AIInput
          onSend={handleSend}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
      </motion.div>
    </div>
  );
};

export default Chat;
