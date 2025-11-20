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

function Testimonials() {
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

        <section id="testimonials" className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div className="text-center mb-20" {...fadeInUp}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Trusted by Education Leaders
                    </h2>
                    <p className="text-xl text-slate-600">
                        See what our clients say about their experience with EduManage Pro.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {[
                        {
                            quote: "EduManage Pro transformed our administrative efficiency. What used to take hours now takes minutes. The parent communication features have significantly improved our engagement rates.",
                            name: "Dr. Priya Sharma",
                            role: "Principal, Delhi Public School",
                            rating: 5,
                            image: "🏫"
                        },
                        {
                            quote: "The analytics dashboard provides incredible insights into student performance. We can now identify struggling students early and provide targeted support. Game-changing platform.",
                            name: "Rajesh Kumar",
                            role: "Academic Director, Kendriya Vidyalaya",
                            rating: 5,
                            image: "📊"
                        },
                        {
                            quote: "As a parent, I love being able to track my child's progress in real-time. The mobile app is intuitive and keeps me connected with teachers and school activities.",
                            name: "Sneha Patel",
                            role: "Parent, Ryan International School",
                            rating: 5,
                            image: "👩‍💼"
                        },
                    ].map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
                        >
                            <div className="flex mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <blockquote className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                                "{testimonial.quote}"
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl mr-4">
                                    {testimonial.image}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default Testimonials;