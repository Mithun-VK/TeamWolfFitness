// src/components/FAQ.tsx

import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'program' | 'nutrition' | 'payment' | 'results';
}

interface FAQProps {
  onContactClick?: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onContactClick }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'general', label: 'General' },
    { value: 'program', label: 'Program Details' },
    { value: 'nutrition', label: 'Diet & Nutrition' },
    { value: 'payment', label: 'Payment & Refund' },
    { value: 'results', label: 'Results & Support' }
  ];

  const faqs: FAQItem[] = [
    // General Questions
    {
      id: 1,
      question: 'When does the next batch start?',
      answer: 'New batches start every month. The next batch enrollment is currently open and will close once we reach our capacity limit. We recommend enrolling early to secure your spot as batches fill up quickly.',
      category: 'general'
    },
    {
      id: 2,
      question: 'Can I do this challenge from home without a gym?',
      answer: 'Yes! We provide both home workout and gym workout options. If you\'re training at home, you\'ll need basic equipment like dumbbells, resistance bands, and a yoga mat. We\'ll customize your program based on available equipment.',
      category: 'general'
    },
    {
      id: 3,
      question: 'I\'m a complete beginner with no fitness experience. Is this suitable for me?',
      answer: 'Absolutely! The program is designed for all fitness levels. Pandi sir personally customizes workouts based on your current fitness level. We start with foundational movements and progressively increase intensity as you build strength and confidence.',
      category: 'general'
    },
    {
      id: 4,
      question: 'What if I miss a few days due to travel or illness?',
      answer: 'Life happens! We understand that you may miss workouts occasionally. The program is flexible, and our coaches will help you adjust the schedule without disrupting your overall progress. You\'ll have access to the program materials for the full duration plus 2 extra weeks.',
      category: 'general'
    },
    {
      id: 5,
      question: 'Is this only for men, or can women join too?',
      answer: 'Both men and women can join! We have successfully trained hundreds of women in our previous batches. Workout plans and nutrition guidance are customized based on gender-specific needs and goals.',
      category: 'general'
    },

    // Program Details
    {
      id: 6,
      question: 'What is the difference between 60-day and 90-day challenges?',
      answer: 'The 60-day challenge is perfect for beginners and those looking for significant initial transformation. The 90-day challenge includes everything in the 60-day program plus extended transformation time, advanced training protocols, monthly 1-on-1 video calls with Pandi sir, and contest prep guidance for those interested in competitions.',
      category: 'program'
    },
    {
      id: 7,
      question: 'How much time do I need to dedicate daily?',
      answer: 'Workouts typically range from 45-75 minutes per day, 5-6 days a week. We design time-efficient programs for busy professionals. If you can dedicate 1 hour daily, you\'ll see excellent results.',
      category: 'program'
    },
    {
      id: 8,
      question: 'Will I get direct guidance from Pandi Sakthi?',
      answer: 'Yes! Pandi sir personally reviews all enrollments and provides weekly form check feedback. You\'ll also have access to the Team Wolf community where Pandi sir regularly answers questions. 90-day challenge participants get monthly 1-on-1 video calls.',
      category: 'program'
    },
    {
      id: 9,
      question: 'What happens after the challenge ends?',
      answer: 'After completing the challenge, you\'ll receive a maintenance plan to help you sustain your results. You\'ll also have lifetime access to our workout video library (90-day participants) and can join our alumni community for continued support.',
      category: 'program'
    },
    {
      id: 10,
      question: 'Can I continue training after 60 days by upgrading to 90 days?',
      answer: 'Yes! Many participants extend their journey from 60 to 90 days. You can upgrade at a discounted rate by contacting our support team before your 60-day challenge ends.',
      category: 'program'
    },

    // Nutrition & Diet
    {
      id: 11,
      question: 'I\'m vegetarian/vegan. Will the diet plan work for me?',
      answer: 'Absolutely! We provide both vegetarian and non-vegetarian meal plans. All our nutrition guidance is based on Indian cuisine with easily available ingredients. We customize macros and meal plans based on your dietary preferences.',
      category: 'nutrition'
    },
    {
      id: 12,
      question: 'Do I need to take supplements?',
      answer: 'Supplements are optional but recommended for faster results. We provide guidance on evidence-based supplements like whey protein, creatine, and multivitamins. Team Wolf supplements are available, but you can choose any trusted brand.',
      category: 'nutrition'
    },
    {
      id: 13,
      question: 'Will I have to follow a strict diet?',
      answer: 'No crash diets! We follow a flexible, sustainable approach. You\'ll learn to eat the foods you enjoy while hitting your macro targets. We teach portion control and smart food choices rather than complete food restrictions.',
      category: 'nutrition'
    },
    {
      id: 14,
      question: 'Can I eat outside food or attend social events?',
      answer: 'Yes! We teach you how to make smart choices when eating out. Occasional cheat meals are incorporated into the plan. The goal is to build a sustainable lifestyle, not temporary restrictions.',
      category: 'nutrition'
    },

    // Payment & Refund
    {
      id: 15,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including UPI, Credit/Debit Cards, Net Banking, and digital wallets through Razorpay secure payment gateway. You can also opt for EMI options on select credit cards.',
      category: 'payment'
    },
    {
      id: 16,
      question: 'Is there a refund policy?',
      answer: 'We offer a 7-day money-back guarantee. If you\'re not satisfied with the program within the first 7 days, we\'ll provide a full refund, no questions asked. After 7 days, refunds are not available as resources have been allocated for your transformation.',
      category: 'payment'
    },
    {
      id: 17,
      question: 'Are there any hidden charges?',
      answer: 'No hidden charges! The enrollment fee covers your complete transformation program including workout plans, nutrition guidance, community access, and coaching support. Supplements and gym memberships (if training at a gym) are separate.',
      category: 'payment'
    },
    {
      id: 18,
      question: 'Can I pay in installments?',
      answer: 'Currently, we only accept full payment at the time of enrollment. However, you can use EMI options available on your credit card at checkout through our payment gateway.',
      category: 'payment'
    },

    // Results & Support
    {
      id: 19,
      question: 'How much weight can I realistically lose?',
      answer: 'Results vary based on starting point, adherence, and genetics. On average, participants lose 8-15kg in 60 days and 12-25kg in 90 days. Some lose more, some focus on muscle gain. We prioritize healthy, sustainable fat loss of 1-2kg per week.',
      category: 'results'
    },
    {
      id: 20,
      question: 'What if I don\'t see results?',
      answer: 'If you follow the program diligently and don\'t see results, we\'ll work with you personally until you achieve your goals. Our 96% success rate speaks for itself. Most issues arise from inconsistent adherence, which our daily accountability system helps prevent.',
      category: 'results'
    },
    {
      id: 21,
      question: 'How do progress check-ins work?',
      answer: 'You\'ll submit weekly progress updates including weight, measurements, and photos through our dedicated portal. Our coaches review your progress and provide feedback, adjustments to workout or diet if needed, and motivational support.',
      category: 'results'
    },
    {
      id: 22,
      question: 'What if I have a specific health condition or injury?',
      answer: 'Please mention any health conditions, injuries, or medications during enrollment. Our coaches will modify exercises accordingly and recommend consulting your doctor before starting. We\'ve successfully trained people with PCOS, thyroid, diabetes, and previous injuries.',
      category: 'results'
    },
    {
      id: 23,
      question: 'How is this different from online YouTube workouts?',
      answer: 'Unlike generic YouTube videos, you get a personalized program designed for YOUR body, goals, and lifestyle. You receive expert guidance, form corrections, nutrition customization, daily accountability, and a supportive community - all crucial for sustainable transformation.',
      category: 'results'
    },
    {
      id: 24,
      question: 'Can I contact coaches if I have doubts?',
      answer: 'Yes! You have 24/7 access to our WhatsApp community where coaches respond to queries within 2-4 hours. You can ask questions about exercises, nutrition, or any challenge-related concerns anytime.',
      category: 'results'
    }
  ];

  const filteredFAQs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section-padding bg-gray-900">
      <div className="container-custom max-w-5xl">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Everything you need to know about Team Wolf transformation challenges
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map((faq, index) => (
            <div
              key={faq.id}
              className="card hover:border-orange-500/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-start justify-between text-left focus:outline-none group"
                aria-expanded={openId === faq.id}
              >
                <span className="text-lg font-semibold text-white pr-8 group-hover:text-orange-500 transition-colors">
                  {faq.question}
                </span>
                <span className={`text-2xl text-orange-500 transition-transform duration-300 flex-shrink-0 ${
                  openId === faq.id ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="glass p-8 rounded-2xl text-center">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our team is here to help! Reach out via WhatsApp or Instagram DM, and we'll get back to you within 2-4 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919677080327"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              WhatsApp Us
            </a>
            <a
              href="https://instagram.com/pandi_sakthi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Instagram DM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;