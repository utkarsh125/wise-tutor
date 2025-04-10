"use client";

import React, { useState } from "react";

import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

interface Message {
  role: "user" | "ai";
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // State variables for the filter form.
  const [grade, setGrade] = useState<string>("");
  const [boardType, setBoardType] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [customSubject, setCustomSubject] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [marker, setMarker] = useState<number | undefined>(undefined);
  const [topic, setTopic] = useState<string>("");

  const handleSend = async () => {
    // Validate required fields.
    if (
      !grade ||
      !boardType ||
      (!subject && !customSubject) ||
      !difficulty ||
      marker === undefined
    ) {
      alert("No options were selected, please select some options to continue");
      return;
    }

    // Use custom subject if "Other" is selected.
    const finalSubject = subject.toLowerCase() === "other" ? customSubject : subject;
    const userMessage = `Grade: ${grade}, Board: ${boardType}, Subject: ${finalSubject}, Difficulty: ${difficulty}, Marks: ${marker}, Topic: ${topic}`;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsGenerating(true);

    try {
      const payload = {
        grade,
        boardType,
        marker,
        subject: finalSubject,
        difficulty,
        input: topic,
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
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full min-h-screen p-4 dark:bg-gray-900">
      {/* Animated header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-purple-100 p-5 rounded-md w-full"
      >
        <h1 className="text-2xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white">
          Ask GEN. to craft the perfect questions for students and test their capabilities.
        </h1>
      </motion.div>

      {/* Filter form area with dropdowns and a single button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 w-full bg-white dark:bg-gray-800 rounded-lg border-1 border-black shadow-lg shadow-amber-200 p-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Grade Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded"
            >
              <option value="">Select Grade</option>
              {["5", "6", "7", "8", "9", "10", "11", "12"].map((g) => (
                <option key={g} value={g}>
                  Grade {g}
                </option>
              ))}
            </select>
          </div>

          {/* Board Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Board Type
            </label>
            <select
              value={boardType}
              onChange={(e) => setBoardType(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded"
            >
              <option value="">Select Board</option>
              {["CBSE", "ICSE"].map((board) => (
                <option key={board} value={board}>
                  {board}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded"
            >
              <option value="">Select Subject</option>
              {["Maths", "Science", "English", "Social Studies", "Other"].map(
                (subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                )
              )}
            </select>
            {subject.toLowerCase() === "other" && (
              <input
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder="Enter custom subject"
                className="mt-1 block w-full border-gray-300 rounded"
              />
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded"
            >
              <option value="">Select Difficulty</option>
              {["Easy", "Medium", "Hard"].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Marks Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Marks
            </label>
            <input
              type="number"
              value={marker ?? ""}
              onChange={(e) =>
                setMarker(e.target.value ? parseInt(e.target.value) : undefined)
              }
              placeholder="e.g. 5"
              className="mt-1 block w-full border-gray-300 rounded"
            />
          </div>

          {/* Topic / Additional Info Input */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Topic / Additional Info
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Optional: Enter specific focus or topic"
              className="mt-1 block w-full border-gray-300 rounded"
            />
          </div>
        </div>

        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full bg-purple-100 text-gray-900 py-2 rounded"
        >
          Generate Question
        </motion.button>
      </motion.div>

      {/* Chat conversation area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border-1 border-black shadow-red-300 p-4 h-64 overflow-y-auto"
      >
        {messages.length === 0 && !isGenerating ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Conversation will appear here...
          </p>
        ) : (
          <>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
              >
                {msg.role === "user" ? (
                  <span className="inline-block p-2 rounded-lg bg-blue-500 text-white">
                    {msg.text}
                  </span>
                ) : (
                  <div className="prose dark:prose-dark">
                    <ReactMarkdown 
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex, rehypeRaw]}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </motion.div>
            ))}

            {isGenerating && (
              <div className="flex flex-col items-center justify-center mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Awaiting response from AI
                </p>
                <div className="w-full mt-2 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Chat;
