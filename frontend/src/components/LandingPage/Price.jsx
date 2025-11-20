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

function LandingPrice() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };
    return (
        <section id="pricing" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div className="text-center mb-20" {...fadeInUp}>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Choose Your Plan
                    </h2>
                    <p className="text-xl text-slate-600">
                        Flexible pricing options designed to fit schools of all sizes and budgets.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Starter",
                            price: "Free",
                            period: "for 30 days",
                            features: [
                                "Up to 100 students",
                                "Basic attendance tracking",
                                "Parent communication",
                                "Email support",
                                "Mobile app access"
                            ],
                            highlight: false,
                            cta: "Start Free Trial"
                        },
                        {
                            name: "Professional",
                            price: "₹4",
                            period: "per student/per month",
                            features: [
                                "Unlimited students",
                                "Full feature access",
                                "Advanced analytics",
                                "Fee management",
                                "Priority support",
                                "Data export tools",
                                "Custom reports"
                            ],
                            highlight: true,
                            cta: "Get Started",
                            popular: true
                        },
                        {
                            name: "Enterprise",
                            price: "₹99,999",
                            period: "per year",
                            features: [
                                "Everything in Professional",
                                "Multi-campus support",
                                "Advanced customization",
                                "API access",
                                "Dedicated support",
                                "Training sessions",
                                "Custom integrations"
                            ],
                            highlight: false,
                            cta: "Contact Sales"
                        },
                    ].map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${plan.highlight
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-2xl scale-105"
                                : "bg-white text-slate-900 border-slate-200 hover:border-indigo-200 shadow-lg hover:shadow-xl"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className={`text-sm ml-2 ${plan.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>
                                        {plan.period}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <Check className={`w-5 h-5 mr-3 ${plan.highlight ? 'text-indigo-200' : 'text-green-500'}`} />
                                        <span className={plan.highlight ? 'text-indigo-100' : 'text-slate-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${plan.highlight
                                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default LandingPrice;