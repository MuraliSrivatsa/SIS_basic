import Footer from "./LandingPage/Footer";
import LandingHero from "./LandingPage/Hero";
import LandNavbar from "./LandingPage/Navbar";
import LandingStats from "./LandingPage/Stats";
import LandingFeatures from "./LandingPage/Features";
import LandingWork from "./LandingPage/Working";
import LandingBenefits from "./LandingPage/Benefits";
import LandingPrice from "./LandingPage/Price";
import CTA from "./LandingPage/CTA";
import Testimonials from "./LandingPage/Testimonials";

const LandingPage = () => {
  return (
    <div className="font-sans text-slate-800 bg-white">
      <LandNavbar/>
      <LandingHero />
      <LandingStats/>
      <LandingFeatures/>
      <LandingWork/>
      <LandingBenefits/>
      <LandingPrice/>
      {/*<Testimonials/>*/}
      <CTA/>
      <Footer />
    </div>
  );
};

export default LandingPage;