import React from "react";
import { useNavigate } from "react-router-dom";
import heroBackground from "../assets/hero-background.jpg";


export default function HeroSection() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/contact");
  };
  return (
    <div
      className="relative text-white bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-accent/95" />
      <div className="relative z-10 w-full px-6 text-center max-w-4xl">
        <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground tracking-wider">
              QAELLYYY!!
        </h1>
        <p className="text-lg text-primary-foreground/80 mt-2">  Reliable Networks. Confident Growth. </p>
        </div>
        

        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Modernize Your Infrastructure.
          <br />
          <span className="text-accent-light">Automate With Confidence.</span>
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
          Expert guidance to streamline your infrastructure and reduce manual effort.
        </p>

        <div className="flex justify-center">
            <button onClick={handleButtonClick} className="border border-input text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent-light rounded-m h-11 rounded-md px-8">
              Get in Touch
            </button>
          </div>
      </div>
    </div>
  );
}
