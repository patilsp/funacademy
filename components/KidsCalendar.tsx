"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';


const KidsCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="rounded-3xl bg-gradient-to-br from-yellow-300 via-red-300 to-pink-400 p-6 shadow-lg"
  >
      <h2 className="mb-6 text-center text-4xl font-extrabold text-white">Pick a Date!</h2>
      <Calendar
        onChange={onChange}
        value={date}
        className="calendar-custom mx-auto"
        prevLabel={<ChevronLeft className="text-purple-600" />}
        nextLabel={<ChevronRight className="text-purple-600" />}
        prev2Label={null}
        next2Label={null}
      />
      <div className="mt-6 text-center">
        <p className="text-2xl font-bold text-white">
          Selected Date: {date.toDateString()}
        </p>
      </div>
    </motion.div>
  );
};

export default KidsCalendar;
