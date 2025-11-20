{/* Hero Section */ }
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight
} from "lucide-react";


function LandingHero() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" }
    };
    const navigate = useNavigate();
    return (
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div {...fadeInUp} className="max-w-xl">
                        {/*<div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 500+ Educational Institutions
              </div>*/}
                        <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                            Modern School
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                {" "}Management
                            </span>
                            <br />
                            Made Simple
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            Transform your educational institution with our comprehensive Student Management System.
                            Streamline operations, enhance communication and empower learning outcomes with AI Support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center group" onClick={() => navigate("/login")}>
                                Watch Demo
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                            {/*} <button className="bg-white text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-lg border-2 border-slate-200 hover:border-slate-300" >
                  Watch Demo
                </button>*/}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img src="/Dash2.png"></img>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default LandingHero;