import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Target, TrendingUp, Globe, BookOpen, Clock, Heart, Briefcase, Users, Star } from 'lucide-react';
import Sidebar from '../pages/Students/Student_Sidebar';

// Pre-defined subject and career field lists
const subjects = [
  "Programming & Software Development",
  "Data Science & Analytics",
  "Artificial Intelligence & Machine Learning",
  "Cybersecurity & Information Security",
  "Digital Marketing & Social Media",
  "UX/UI Design & User Experience",
  "Project Management & Leadership",
  "Financial Technology (FinTech)",
  "Cloud Computing & DevOps",
  "Blockchain & Cryptocurrency",
  "Business Strategy & Entrepreneurship",
  "Sustainability & Green Technology",
  "Healthcare Technology & Biotechnology",
  "Content Creation & Digital Media"
];

const careerFields = [
  "Technology & Software",
  "Healthcare & Biotechnology",
  "Finance & Banking",
  "Marketing & Communications",
  "Consulting & Strategy",
  "Education & Training",
  "Government & Public Policy",
  "Non-profit & Social Impact",
  "Entertainment & Media",
  "Entrepreneurship & Startups"
];

// Main component for the career questionnaire form
export default function Questionnaire({ onSubmit, isLoading }) {
  // State to hold all form answers
  const [answers, setAnswers] = useState({
    careerGoals: '',
    targetIndustry: '',
    enjoyedSubjects: [],
    skillsToDevelop: '',
    currentChallenges: '',
    futureAspiration: '',
    learningStyle: 'Practical',
    workload: 'Medium',
    timeframe: '1-2 years'
  });

  /**
   * Toggles the selection of a subject in the 'enjoyedSubjects' array.
   * @param {string} subject - The subject to add or remove.
   */
  const handleSubjectChange = (subject) => {
    setAnswers(prev => ({
      ...prev,
      enjoyedSubjects: prev.enjoyedSubjects.includes(subject)
        ? prev.enjoyedSubjects.filter(s => s !== subject)
        : [...prev.enjoyedSubjects, subject]
    }));
  };

  /**
   * Handles changes for all other input fields.
   * @param {string} field - The name of the state field to update.
   * @param {*} value - The new value for the field.
   */
  const handleChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Handles the form submission.
   * @param {object} e - The form event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  // Variants for section and button animations using Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-2">
            Your Career Path Awaits
          </h1>
          <p className="text-center text-lg text-slate-600 mb-10">
            Answer a few questions to get your personalized career roadmap.
          </p>
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Career Goals */}
            <motion.div className="space-y-4" variants={sectionVariants} initial="hidden" animate="visible">
              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Rocket className="w-6 h-6 text-blue-500" />
                What are your long-term career goals?
              </label>
              <textarea
                value={answers.careerGoals}
                onChange={(e) => handleChange('careerGoals', e.target.value)}
                placeholder="e.g., Lead a tech startup, become a data scientist, transition into product management..."
                className="w-full h-32 p-4 text-slate-700 bg-slate-100 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-200 transition-colors duration-200"
                required
              />
            </motion.div>

            {/* Target Industry */}
            <motion.div className="space-y-4" variants={sectionVariants} initial="hidden" animate="visible">
              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-500" />
                Which industry interests you most?
              </label>
              <input
                type="text"
                value={answers.targetIndustry}
                onChange={(e) => handleChange('targetIndustry', e.target.value)}
                placeholder="e.g., Technology, Healthcare, Finance..."
                className="w-full p-4 text-slate-700 bg-slate-100 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-200 transition-colors duration-200"
                list="career-fields"
                required
              />
              <datalist id="career-fields">
                {careerFields.map(field => (
                  <option key={field} value={field} />
                ))}
              </datalist>
            </motion.div>

            {/* Subject Interests */}
            <motion.div className="space-y-4" variants={sectionVariants} initial="hidden" animate="visible">
              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                What subjects or fields excite you most?
              </label>
              <p className="text-sm text-slate-500 mt-1 mb-4">Select all that apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map(subject => (
                  <motion.div
                    key={subject}
                    className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer select-none border-2 border-slate-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      id={subject}
                      checked={answers.enjoyedSubjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    />
                    <label htmlFor={subject} className="text-sm font-medium text-slate-700 flex-1 cursor-pointer">
                      {subject}
                    </label>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills, Challenges, and Aspirations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div className="space-y-4" variants={sectionVariants} initial="hidden" animate="visible">
                <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  Key skills for career advancement?
                </label>
                <textarea
                  value={answers.skillsToDevelop}
                  onChange={(e) => handleChange('skillsToDevelop', e.target.value)}
                  placeholder="e.g., Advanced Python, leadership, financial modeling..."
                  className="w-full h-28 p-4 text-slate-700 bg-slate-100 rounded-xl border border-slate-200 focus:ring-4 focus:ring-purple-200 transition-colors duration-200"
                  required
                />
              </motion.div>

              <motion.div className="space-y-4" variants={sectionVariants} initial="hidden" animate="visible">
                <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Star className="w-6 h-6 text-orange-500" />
                  Where do you see yourself in 5 years?
                </label>
                <textarea
                  value={answers.futureAspiration}
                  onChange={(e) => handleChange('futureAspiration', e.target.value)}
                  placeholder="e.g., Leading a team, running my own company..."
                  className="w-full h-28 p-4 text-slate-700 bg-slate-100 rounded-xl border border-slate-200 focus:ring-4 focus:ring-orange-200 transition-colors duration-200"
                  required
                />
              </motion.div>
            </div>

            {/* Learning Preferences */}
            <motion.div className="space-y-4" variants={sectionVariants} initial="hidden" animate="visible">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-pink-500" />
                Your Learning Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Learning Style */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-slate-700">Learning approach?</label>
                  {["Theoretical", "Practical", "Project-based", "Mixed"].map(style => (
                    <label key={style} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={style}
                        checked={answers.learningStyle === style}
                        onChange={(e) => handleChange('learningStyle', e.target.value)}
                        className="h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span>{style}</span>
                    </label>
                  ))}
                </div>

                {/* Workload */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-slate-700">Desired course load?</label>
                  {["Light", "Medium", "Heavy"].map(load => (
                    <label key={load} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={load}
                        checked={answers.workload === load}
                        onChange={(e) => handleChange('workload', e.target.value)}
                        className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500"
                      />
                      <span>{load}</span>
                    </label>
                  ))}
                </div>

                {/* Timeframe */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-slate-700">Timeframe for impact?</label>
                  {["6 months", "1-2 years", "3-5 years"].map(time => (
                    <label key={time} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={time}
                        checked={answers.timeframe === time}
                        onChange={(e) => handleChange('timeframe', e.target.value)}
                        className="h-5 w-5 text-purple-600 focus:ring-2 focus:ring-purple-500"
                      />
                      <span>{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div className="text-center pt-6">
              <motion.button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-12 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isLoading ? (
                  <>
                    <Clock className="w-6 h-6 animate-spin" />
                    <span>Analyzing Trends...</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-6 h-6 justify-center item-center" />
                    <span>Get AI-Powered Recommendations</span>
                  </>
                )}
              </motion.button>
              <p className="text-xs text-slate-500 mt-4">
                Powered by career trend analysis and real-time industry data.
              </p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
