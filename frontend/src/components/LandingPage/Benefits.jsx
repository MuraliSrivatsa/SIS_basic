import { motion } from "framer-motion";
import {
    ShieldCheck,
    Cloud,
    Zap
} from "lucide-react";
import { fadeInUp } from "../../animations/varient";

function LandingBenefits() {
    return (
        < section id="advantages" className="py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white" >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div className="text-center mb-20" {...fadeInUp}>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Why Leading Schools Choose EduManage Pro
                    </h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Join hundreds of educational institutions that have transformed their operations with our platform.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {[
                        {
                            icon: <Zap className="w-10 h-10" />,
                            title: "Lightning Fast Performance",
                            desc: "Built with modern technology stack ensuring rapid response times and seamless user experience across all devices.",
                            gradient: "from-yellow-400 to-orange-500"
                        },
                        {
                            icon: <Cloud className="w-10 h-10" />,
                            title: "Enterprise-Grade Scalability",
                            desc: "Grows with your institution from small schools to large university systems. Handle unlimited students, staff, and data.",
                            gradient: "from-blue-400 to-indigo-500"
                        },
                        {
                            icon: <ShieldCheck className="w-10 h-10" />,
                            title: "Bank-Level Security",
                            desc: "End-to-end encryption, regular security audits, GDPR compliance, and 99.9% uptime guarantee for peace of mind.",
                            gradient: "from-green-400 to-emerald-500"
                        },
                    ].map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                            <p className="text-slate-300 leading-relaxed">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
}

export default LandingBenefits;