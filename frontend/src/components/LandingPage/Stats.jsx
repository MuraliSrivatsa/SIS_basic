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
function LandingStats() {
    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };
    return (
        <section className="py-20 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { number: "N/A", label: "Schools Trust Us", icon: <Globe className="w-6 h-6" /> },
                        { number: "N/A", label: "Students Managed", icon: <Users className="w-6 h-6" /> },
                        { number: "N/A", label: "Uptime Guarantee", icon: <ShieldCheck className="w-6 h-6" /> },
                        { number: "24/7", label: "Support Available", icon: <MessageSquare className="w-6 h-6" /> },
                    ].map((stat, idx) => (
                        <motion.div key={idx} variants={fadeInUp} className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl mb-4">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</h3>
                            <p className="text-slate-600 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default LandingStats;