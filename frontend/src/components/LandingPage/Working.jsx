import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Users,
  Calendar,
  BookOpen,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Cloud,
  Zap,
  Check,
  Star,
  ArrowRight,
  Globe,
  Award,
  TrendingUp,
} from "lucide-react";
function LandingWork() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div className="text-center mb-20" {...fadeInUp}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Get Started in Three Simple Steps
                    </h2>
                    <p className="text-xl text-slate-600">
                        Our streamlined onboarding process gets your school up and running quickly.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {[
                        {
                            step: "01",
                            title: "Quick Setup & Onboarding",
                            desc: "Create your account and configure your school's basic information with our guided setup wizard. Import existing data or start fresh.",
                            color: "from-blue-500 to-indigo-600"
                        },
                        {
                            step: "02",
                            title: "Configure Academic Structure",
                            desc: "Set up classes, subjects, and academic calendar. Enroll students and teachers with bulk import tools and role-based access controls.",
                            color: "from-indigo-500 to-purple-600"
                        },
                        {
                            step: "03",
                            title: "Launch & Monitor Operations",
                            desc: "Begin daily operations with attendance tracking, fee management, and communication tools. Monitor progress with comprehensive analytics.",
                            color: "from-purple-500 to-pink-600"
                        },
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="text-center relative"
                        >
                            <div className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                                <span className="text-white font-bold text-xl">{step.step}</span>
                            </div>
                            {idx < 2 && (
                                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent"></div>
                            )}
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed max-w-sm mx-auto">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

    );
}

export default LandingWork;