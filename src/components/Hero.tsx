// src/components/Hero.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Users, Award, TrendingUp } from 'lucide-react';

interface HeroProps {
  onEnrollClick: () => void;
  batchStartDate?: string;
  spotsRemaining?: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC<HeroProps> = ({ 
  onEnrollClick, 
  batchStartDate = '2025-11-25T00:00:00',
  spotsRemaining = 5 
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isUrgent, setIsUrgent] = useState(false);

  // Calculate time remaining until batch starts
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +new Date(batchStartDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [batchStartDate]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Set urgency if less than 3 days remaining
      const totalHours = newTimeLeft.days * 24 + newTimeLeft.hours;
      setIsUrgent(totalHours < 72);
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Format number with leading zero
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const stats = [
    { icon: Users, label: 'Transformations', value: '500+' },
    { icon: Award, label: 'Mr. India', value: 'Champion' },
    { icon: TrendingUp, label: 'Success Rate', value: '96%' }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 bg-mesh-gradient" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative container-custom pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 z-10 animate-slide-in-left">
            
            {/* Spots Remaining Badge */}
            <div className="badge badge-orange inline-flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm font-medium">
                {spotsRemaining} Spots Remaining
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-balance">
                Transform Your
                <span className="block gradient-text">
                  Body in 60 Days
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
                Join 500+ successful transformations led by Mr. India & 4× Mr. Tamil Nadu Champion 
                <span className="text-orange-500 font-semibold"> Pandi Sakthi</span>
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="space-y-3">
              <p className={`text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                isUrgent ? 'text-red-400 animate-pulse' : 'text-gray-400'
              }`}>
                Next Batch Starts In:
              </p>
              <div className="flex space-x-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item) => (
                  <div 
                    key={item.label}
                    className={`card-gradient flex flex-col items-center justify-center p-4 min-w-[80px] hover-lift ${
                      isUrgent ? 'border-red-500/50' : 'border-orange-500/30'
                    }`}
                  >
                    <span className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
                      isUrgent ? 'text-red-400' : 'text-orange-500'
                    }`}>
                      {formatNumber(item.value)}
                    </span>
                    <span className="text-xs text-gray-400 uppercase mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onEnrollClick}
                className="btn-primary group text-lg py-4"
                aria-label="Enroll in 60-day transformation challenge"
              >
                <span className="relative z-10 flex items-center">
                  Enroll Now - ₹3,999
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={() => {
                  document.getElementById('transformations')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className="btn-secondary text-lg py-4"
                aria-label="View transformation results"
              >
                View Transformations
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="flex flex-col items-start space-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <stat.icon className="w-5 h-5 text-orange-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative lg:block hidden animate-slide-in-right">
            <div className="relative z-10">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500/30 hover-lift">
                <img
                  src="/images/pandi-hero.jpg"
                  alt="Pandi Sakthi - Mr. India Champion demonstrating fitness pose"
                  className="w-full h-[600px] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback gradient if image doesn't load
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.classList.add('bg-gradient-to-br', 'from-orange-500', 'to-orange-700');
                    }
                  }}
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4">
                  <p className="text-white font-bold text-lg">Mr. India Champion</p>
                  <p className="text-orange-400 text-sm">4× Mr. Tamil Nadu | 500+ Transformations</p>
                </div>
              </div>

              {/* Decorative Glow Elements */}
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-radial opacity-30 animate-pulse" 
                   style={{ animationDuration: '3s' }}
                   aria-hidden="true" />
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-radial opacity-30 animate-pulse" 
                   style={{ animationDuration: '4s', animationDelay: '1s' }}
                   aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" 
           aria-hidden="true" />
    </section>
  );
};

export default Hero;
