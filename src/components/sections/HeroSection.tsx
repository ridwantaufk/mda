"use client";

import React, { useState, useEffect, useRef } from "react";
import { HardHat, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FloatingCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
  position: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  icon: Icon,
  title,
  description,
  delay,
  position,
}) => {
  return (
    <div
      className={`
        absolute ${position} 
        bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20
        hover:bg-white/20 hover:scale-105 
        transition-all duration-500 ease-out
        animate-float
      `}
      style={{
        animationDelay: `${delay}ms`,
        animation: "float 6s ease-in-out infinite",
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold">{title}</h4>
          <p className="text-gray-300 text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
};

const TypewriterText: React.FC<{ text: string; speed?: number }> = ({
  text,
  speed = 100,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "500+", label: "Klien Puas", icon: Users },
    { number: "10K+", label: "Tenaga Kerja", icon: HardHat },
    { number: "99%", label: "Success Rate", icon: TrendingUp },
  ];

  return (
    <>
      <section
        ref={heroRef}
        className="relative pt-32 pb-48 flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Parallax Dots */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.3}px) rotate(${
              scrollY * 0.05
            }deg)`,
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div
              className={`text-white space-y-8 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-12 opacity-0"
              }`}
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-200 text-sm font-medium">
                  Solusi Terpercaya SDM Indonesia
                </span>
              </div>

              {/* Main Heading with Typewriter Effect */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="block">Mudahkan Kebutuhan</span>
                  <span className="block">SDM Anda dengan</span>
                  <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    MDA Partner!
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Optimalkan potensi perusahaan Anda dengan tenaga kerja
                profesional di bidangnya. Kami siap menjadi solusi kebutuhan SDM
                Anda dengan berbagai layanan dan jasa yang sesuai!
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center transform transition-all duration-700 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    <stat.icon className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="
                    bg-gradient-to-r from-orange-500 to-orange-600 
                    hover:from-orange-600 hover:to-orange-700 
                    text-white font-semibold px-8 py-4 rounded-xl
                    shadow-lg hover:shadow-xl
                    transform hover:scale-105 hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  Bergabung Sekarang Juga!
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="
                    border-2 border-white/30 text-white hover:bg-white/10
                    backdrop-blur-sm rounded-xl px-8 py-4
                    transition-all duration-300 hover:scale-105
                  "
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>

            {/* Right Content - Enhanced Image Placeholder with Floating Cards */}
            <div
              className={`relative transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {/* Main Hero Image Container */}
              <div className="relative">
                {/* Hero Image Placeholder */}
                <div
                  className="
                  w-full h-96 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 
                  rounded-3xl backdrop-blur-sm border border-white/20
                  flex items-center justify-center relative overflow-hidden
                  hover:scale-[1.02] transition-transform duration-500
                "
                >
                  {/* Professional Team Mockup */}
                  <div className="text-center">
                    <div className="flex justify-center space-x-4 mb-6">
                      {/* Worker Icons */}
                      <div
                        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center animate-bounce"
                        style={{ animationDelay: "0s" }}
                      >
                        <HardHat className="w-8 h-8 text-white" />
                      </div>
                      <div
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-bounce"
                        style={{ animationDelay: "0.5s" }}
                      >
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div
                        className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center animate-bounce"
                        style={{ animationDelay: "1s" }}
                      >
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">
                      Tim Profesional Terpilih
                    </h3>
                    <p className="text-gray-300">
                      Tenaga kerja berpengalaman dari berbagai bidang
                    </p>
                  </div>
                </div>

                {/* Floating Cards */}
                <FloatingCard
                  icon={HardHat}
                  title="Teknisi Ahli"
                  description="Berpengalaman 5+ tahun"
                  delay={1000}
                  position="top-4 -left-4"
                />

                <FloatingCard
                  icon={Users}
                  title="Tim Support"
                  description="24/7 Customer Service"
                  delay={1500}
                  position="top-8 -right-8"
                />

                <FloatingCard
                  icon={Award}
                  title="Certified"
                  description="ISO 9001:2015"
                  delay={2000}
                  position="bottom-4 -left-8"
                />
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>

        </section>
    </>
  );
};

export default HeroSection;
