"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is KidsLearn?",
    answer: "KidsLearn is an educational app designed for children to help them learn various subjects through interactive games and quizzes.",
  },
  {
    question: "How does the app work?",
    answer: "The app provides a variety of educational games and quizzes for different subjects. Children can earn rewards and progress through levels as they learn.",
  },
  {
    question: "Is the app free?",
    answer: "KidsLearn offers a free version with basic content. There is also a premium subscription available for access to additional features and content.",
  },
  {
    question: "How can I contact support?",
    answer: "You can contact our support team through the 'Help' section in the app or by emailing support@kidslearn.com.",
  },
  {
    question: "Can I track my child’s progress?",
    answer: "Yes, you can track your child's progress through the 'Parent Dashboard' available in the app.",
  },
];

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Frequently Asked Questions</h1>
      <div>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="flex w-full items-center justify-between rounded-md bg-blue-100 p-4 text-left hover:bg-blue-200"
              onClick={() => handleToggle(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl font-medium text-gray-800">{faq.question}</span>
              <span className="text-2xl text-gray-600">{expandedIndex === index ? "-" : "+"}</span>
            </motion.button>
            {expandedIndex === index && (
              <motion.div
                className="bg-blue-50 p-4 text-gray-700"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
