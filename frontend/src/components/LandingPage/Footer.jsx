{/* Footer */ }
import {
    BookOpen
} from "lucide-react";
function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white-900">ZENDESK <span className="text-sm font-bold text-white-900">By ITS Phoneix</span></span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">
                            Empowering educational institutions with modern, efficient management solutions.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#features" className="hover:text-white transition-colors text-decoration-none">Features</a></li>
                            <li><a href="#advantages" className="hover:text-white transition-colors text-decoration-none">Benifits</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Training</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li><a href="#" className="hover:text-white transition-colors text-decoration-none">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors text-decoration-none">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} Zendesk. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;