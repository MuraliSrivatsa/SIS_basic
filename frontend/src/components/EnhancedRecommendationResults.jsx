import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  DollarSign,
  Building,
  CheckCircle,
  Lightbulb,
  Globe,
  Star,
  Award,
  Briefcase
} from 'lucide-react';
import Sidebar from '../pages/Students/Student_Sidebar';

export default function EnhancedRecommendationResults({ recommendations }) {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar/>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-12 space-y-8"
      >
        {/* Market Insights Header */}
        {recommendations.market_insights && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="rounded-2xl shadow-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8">
              <div className="flex justify-center mb-4">
                <Globe className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Industry Intelligence Summary</h2>
              <p className="text-cyan-100 text-lg max-w-3xl mx-auto">
                {recommendations.market_insights.recommendation_rationale}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {recommendations.market_insights.industry_trends && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Current Industry Trends
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.market_insights.industry_trends.map((trend, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                          {trend}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {recommendations.market_insights.emerging_skills && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Emerging Skills in Demand
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.market_insights.emerging_skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Your Personalized Course Recommendations
          </h2>
          <p className="text-slate-600">Based on current industry data and career trends</p>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="grid grid-cols-2 mb-8 bg-slate-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("courses")}
              className={`py-2 font-medium ${activeTab === "courses" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-200"}`}
            >
              Course Details
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-2 font-medium ${activeTab === "overview" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-200"}`}
            >
              Quick Overview
            </button>
          </div>

          {/* Course Details Tab */}
          {activeTab === "courses" && (
            <div className="space-y-8">
              {recommendations.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                >
                  <div className="rounded-xl shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                    <div className="flex">
                      <div className="w-2 bg-gradient-to-b from-cyan-400 to-blue-500" />
                      <div className="flex-1 p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{rec.course_title}</h3>
                            <div className="flex flex-wrap gap-2">
                              {rec.trending_keywords?.map((keyword, kidx) => (
                                <span key={kidx} className="px-2 py-1 rounded-md bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 text-sm border border-cyan-200">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500 mb-1">Relevance Score</div>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-3 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600"
                                  style={{ width: `${rec.relevance_score}%` }}
                                />
                              </div>
                              <span className="font-bold text-xl text-blue-600">{rec.relevance_score}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="p-4 bg-slate-50/80 rounded-lg mb-4">
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4" />
                            Course Overview
                          </h4>
                          <p className="text-slate-700">{rec.course_description}</p>
                        </div>

                        {/* Learning Outcomes */}
                        {rec.learning_outcomes && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4" />
                              Learning Outcomes
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {rec.learning_outcomes.map((outcome, oidx) => (
                                <div key={oidx} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                  <span>{outcome}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Industry + Career */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                          <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              Industry Relevance
                            </h4>
                            <p className="text-green-700 text-sm">{rec.industry_relevance}</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              Career Impact
                            </h4>
                            <p className="text-blue-700 text-sm">{rec.career_impact}</p>
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg mb-4">
                          {rec.duration && (
                            <div className="text-center">
                              <Clock className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                              <div className="text-xs text-slate-500">Duration</div>
                              <div className="font-semibold text-sm">{rec.duration}</div>
                            </div>
                          )}
                          {rec.course_format && (
                            <div className="text-center">
                              <Lightbulb className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                              <div className="text-xs text-slate-500">Format</div>
                              <div className="font-semibold text-sm">{rec.course_format}</div>
                            </div>
                          )}
                          {rec.salary_impact && (
                            <div className="text-center">
                              <DollarSign className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                              <div className="text-xs text-slate-500">Salary Impact</div>
                              <div className="font-semibold text-sm">{rec.salary_impact}</div>
                            </div>
                          )}
                          {rec.prerequisites && (
                            <div className="text-center">
                              <BookOpen className="w-5 h-5 mx-auto mb-1 text-slate-500" />
                              <div className="text-xs text-slate-500">Prerequisites</div>
                              <div className="font-semibold text-sm">{rec.prerequisites}</div>
                            </div>
                          )}
                        </div>

                        {/* Companies Hiring */}
                        {rec.companies_hiring && (
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              Companies Actively Hiring These Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {rec.companies_hiring.map((company, cidx) => (
                                <span key={cidx} className="px-2 py-1 flex items-center gap-1 rounded-md border border-purple-200 bg-purple-50 text-purple-700 text-sm">
                                  <Briefcase className="w-3 h-3" />
                                  {company}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="h-full rounded-xl shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all p-6">
                    <h3 className="text-lg font-bold mb-2">{rec.course_title}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2 py-1 text-xs rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        {rec.relevance_score}% Match
                      </span>
                      {rec.duration && <div className="text-xs text-slate-500">{rec.duration}</div>}
                    </div>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-3">{rec.course_description}</p>
                    {rec.trending_keywords && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {rec.trending_keywords.slice(0, 3).map((keyword, kidx) => (
                          <span key={kidx} className="px-2 py-1 rounded-md text-xs bg-slate-100 text-slate-700">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                    {rec.salary_impact && (
                      <div className="text-xs text-green-600 font-medium">💰 {rec.salary_impact}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
