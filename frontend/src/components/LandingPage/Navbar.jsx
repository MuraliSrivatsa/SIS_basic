import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

function LandNavbar() {
    const navigate = useNavigate();
    return (
        < nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50" >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">ZENDESK <span className="text-sm font-bold text-slate-900">By ITS Phoneix</span></span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Features</a>
                    <a href="#advantages" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Benifits</a>
                    {/*<a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Pricing</a>
            <a href="#testimonials" className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-decoration-none">Reviews</a>*/}
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium" onClick={() => navigate("/onBoard")}>
                        Get Started
                    </button>
                </div>
            </div>
        </nav >
    );
}

export default LandNavbar;