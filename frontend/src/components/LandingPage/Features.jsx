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

function LandingFeatures() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };
    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    return (
        <section id="features" className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div className="text-center mb-20" {...fadeInUp}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Everything You Need to Manage Your School
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        Our comprehensive platform provides all the tools necessary for modern educational administration,
                        designed with user experience and efficiency in mind.
                    </p>
                </motion.div>
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {[
                        {
                            title: "Advanced Analytics Dashboard",
                            icon: <BarChart className="w-8 h-8 text-indigo-600" />,
                            desc: "Real-time insights with interactive charts, attendance tracking, grade analytics, and performance metrics for data-driven decisions.",
                            premium: false
                        },

                        {
                            title: "Intelligent Timetabling",
                            icon: <Calendar className="w-8 h-8 text-indigo-600" />,
                            desc: "AI-powered schedule optimization, conflict detection, exam scheduling, and resource allocation management.",
                            premium: true
                        },
                        {
                            title: "Unified Communication Hub",
                            icon: <MessageSquare className="w-8 h-8 text-indigo-600" />,
                            desc: "Multi-channel communication with in-app messaging, SMS/email integration, announcements, and parent engagement tools.",
                            premium: false
                        },
                        {
                            title: "Complete Learning Management",
                            icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
                            desc: "Assignment distribution, online submissions, grade book, resource library, and progress tracking system.",
                            premium: true
                        },
                        {
                            title: "Advanced AI Course Recommondation",
                            icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
                            desc: "Assignment distribution, online submissions, grade book, resource library, and progress tracking system.",
                            unique: true
                        },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeInUp}
                            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-200"
                        >
                            {feature.premium && (
                                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    Premium
                                </div>
                            )}
                            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default LandingFeatures;