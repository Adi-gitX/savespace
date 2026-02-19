import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProcessFlow } from "@/components/landing/ProcessFlow";
import { GradientTransition } from "@/components/landing/GradientTransition";
import { Industries } from "@/components/landing/Industries";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />
            <main>
                <Hero />
                <ProcessFlow />
                <GradientTransition />
                <Industries />
                <Testimonials />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
