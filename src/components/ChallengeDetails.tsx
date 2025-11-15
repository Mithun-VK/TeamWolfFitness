// src/components/ChallengeDetails.tsx

import React, { useState } from 'react';

interface Challenge {
  id: string;
  duration: string;
  price: string;
  originalPrice: string;
  popular: boolean;
  features: string[];
  benefits: string[];
}

interface ChallengeDetailsProps {
  onEnrollClick?: () => void;
}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = ({ onEnrollClick }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<string>('60-day');

  const challenges: Challenge[] = [
    {
      id: '60-day',
      duration: '60 Days',
      price: '₹3,999',
      originalPrice: '₹5,999',
      popular: true,
      features: [
        'Personalized workout plan',
        'Customized nutrition & meal plans',
        'Weekly progress check-ins',
        'Form correction videos',
        'Private WhatsApp community',
        '24/7 doubt resolution',
        'Supplement guidance (Team Wolf)',
        'Daily motivation & accountability'
      ],
      benefits: [
        'Lose 8-15 kg body weight',
        'Build lean muscle mass',
        'Improve strength & endurance',
        'Boost metabolism',
        'Learn sustainable fitness habits',
        'Increase energy levels'
      ]
    },
    {
      id: '90-day',
      duration: '90 Days',
      price: '₹5,499',
      originalPrice: '₹8,999',
      popular: false,
      features: [
        'Everything in 60-day challenge',
        'Extended transformation period',
        'Advanced training protocols',
        'Detailed body composition analysis',
        'Monthly 1-on-1 video calls with Pandi',
        'Contest prep guidance (optional)',
        'Lifetime access to workout library',
        'Post-challenge maintenance plan'
      ],
      benefits: [
        'Lose 12-25 kg body weight',
        'Significant muscle definition',
        'Complete body transformation',
        'Master advanced exercises',
        'Build long-term fitness mindset',
        'Achieve competition-ready physique'
      ]
    }
  ];

  const programDetails = {
    title: 'What You Get',
    description: 'Comprehensive transformation program designed by Mr. India Champion Pandi Sakthi',
    workoutPlan: {
      title: 'Personalized Workout Plan',
      items: [
        '5-6 days/week structured training',
        'Progressive overload methodology',
        'Exercise video demonstrations',
        'Home & gym workout options',
        'Cardio integration for fat loss'
      ]
    },
    nutrition: {
      title: 'Customized Nutrition',
      items: [
        'Macro-calculated meal plans',
        'Indian vegetarian/non-veg options',
        'Simple, home-cooked recipes',
        'Flexible dieting approach',
        'Supplement recommendations'
      ]
    },
    support: {
      title: 'Community & Support',
      items: [
        'Private WhatsApp group',
        'Daily check-ins & motivation',
        'Weekly progress tracking',
        'Form check & corrections',
        'Peer support network'
      ]
    }
  };

  const whoIsThisFor = [
    {
      emoji: '🎯',
      title: 'Beginners',
      description: 'No prior gym experience needed. Start your fitness journey with proper guidance.'
    },
    {
      emoji: '💪',
      title: 'Intermediate Lifters',
      description: 'Break through plateaus with advanced training methods and nutrition.'
    },
    {
      emoji: '⚡',
      title: 'Busy Professionals',
      description: 'Time-efficient workouts designed for your schedule (30-60 min sessions).'
    },
    {
      emoji: '🏋️',
      title: 'Weight Loss Seekers',
      description: 'Proven fat loss protocols that preserve muscle mass.'
    },
    {
      emoji: '🥇',
      title: 'Competition Aspirants',
      description: 'Get guidance from Mr. India champion for contest preparation.'
    },
    {
      emoji: '🏃',
      title: 'Fitness Enthusiasts',
      description: 'Take your training to the next level with scientific programming.'
    }
  ];

  const selectedChallengeData = challenges.find(c => c.id === selectedChallenge) || challenges[0];

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Choose Your Challenge
          </h2>
          <p className="section-subtitle">
            Transform your body with proven methods by Mr. India Champion Pandi Sakthi
          </p>
        </div>

        {/* Challenge Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge.id)}
              className={`card text-left transition-all duration-300 relative ${
                selectedChallenge === challenge.id
                  ? 'border-2 border-orange-500 shadow-lg shadow-orange-500/20 scale-105'
                  : 'hover:border-orange-500/50'
              }`}
            >
              {challenge.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="badge badge-orange">Most Popular</span>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{challenge.duration}</h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold gradient-text">{challenge.price}</span>
                    <span className="text-lg text-gray-400 line-through">{challenge.originalPrice}</span>
                  </div>
                </div>

                <div className="divider" />

                <ul className="space-y-2">
                  {challenge.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <span className="text-orange-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                  {challenge.features.length > 4 && (
                    <li className="text-sm text-orange-400">
                      + {challenge.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>

              {selectedChallenge === challenge.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl opacity-20 blur animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Detailed Features */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="card-gradient p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              {selectedChallengeData.duration} Challenge Includes:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Features Column */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-orange-500 mb-3">What's Included</h4>
                <ul className="space-y-3">
                  {selectedChallengeData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-orange-500 mr-3 mt-1">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits Column */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-orange-500 mb-3">Expected Results</h4>
                <ul className="space-y-3">
                  {selectedChallengeData.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">★</span>
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={onEnrollClick}
                className="btn-primary"
              >
                Enroll in {selectedChallengeData.duration} Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Program Details Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            {programDetails.title}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Workout Plan */}
            <div className="card hover-lift">
              <div className="text-4xl mb-4">🏋️</div>
              <h4 className="text-xl font-bold text-white mb-4">{programDetails.workoutPlan.title}</h4>
              <ul className="space-y-2">
                {programDetails.workoutPlan.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <span className="text-orange-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutrition */}
            <div className="card hover-lift">
              <div className="text-4xl mb-4">🥗</div>
              <h4 className="text-xl font-bold text-white mb-4">{programDetails.nutrition.title}</h4>
              <ul className="space-y-2">
                {programDetails.nutrition.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <span className="text-orange-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="card hover-lift">
              <div className="text-4xl mb-4">💬</div>
              <h4 className="text-xl font-bold text-white mb-4">{programDetails.support.title}</h4>
              <ul className="space-y-2">
                {programDetails.support.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-300">
                    <span className="text-orange-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Who Is This For */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Who Is This Challenge For?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {whoIsThisFor.map((item, idx) => (
              <div key={idx} className="glass p-6 rounded-xl hover-lift">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="glass p-8 rounded-2xl max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Our Transformation Guarantee
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Follow the program diligently for the full duration. If you don't see significant improvements in your physique, strength, and overall fitness, we'll work with you personally until you achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">500+ Success Stories</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">96% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-300">Proven Methods by Mr. India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeDetails;
