import { motion } from "framer-motion";

function CTA() {
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


        <section className="py-32  bg-slate-50">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div {...fadeInUp}>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Transform Your School's Future?
                    </h2>
                    <p className="text-xl mb-8 leading-relaxed">
                        Join thousands of educational institutions that have revolutionized their operations with EduManage Pro.
                        Start your free trial today and experience the difference.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/*<button className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-50 transition-colors font-semibold text-lg shadow-lg">
                Start Free 30-Day Trial
              </button>*/}
                        <button className="bg-indigo-800 text-white px-8 py-4 rounded-xl hover:bg-indigo-900 transition-colors font-semibold text-lg border-2 border-indigo-700" onClick={() => navigate("/login")}>
                            View Live Demo
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
export default CTA;