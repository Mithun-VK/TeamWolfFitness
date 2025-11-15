// src/components/TransformationGallery.tsx

import React, { useState } from 'react';

interface Transformation {
  id: number;
  name: string;
  age: number;
  duration: string;
  beforeImage: string;
  afterImage: string;
  weightLost?: string;
  category: 'weight-loss' | 'muscle-gain' | 'body-recomp';
  testimonial: string;
}

interface TransformationGalleryProps {
  transformations?: Transformation[];
}

const TransformationGallery: React.FC<TransformationGalleryProps> = ({ 
  transformations = defaultTransformations 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = [
    { value: 'all', label: 'All Transformations' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'muscle-gain', label: 'Muscle Gain' },
    { value: 'body-recomp', label: 'Body Recomposition' }
  ];

  const filteredTransformations = selectedCategory === 'all'
    ? transformations
    : transformations.filter(t => t.category === selectedCategory);

  return (
    <section id="transformations" className="section-padding bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" aria-hidden="true" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">
            500+ Success Stories
          </h2>
          <p className="section-subtitle">
            Real people. Real results. Real transformations in 60 days with Team Wolf.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              aria-pressed={selectedCategory === category.value}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Transformations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTransformations.map((transformation, index) => (
            <div
              key={transformation.id}
              className="card hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(transformation.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Before/After Image Container */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 group">
                {/* Before Image */}
                <img
                  src={transformation.beforeImage}
                  alt={`${transformation.name} before transformation`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    hoveredId === transformation.id ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="lazy"
                />
                
                {/* After Image */}
                <img
                  src={transformation.afterImage}
                  alt={`${transformation.name} after ${transformation.duration} transformation`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    hoveredId === transformation.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                />

                {/* Before Label */}
                <div className={`absolute top-4 left-4 badge badge-orange transition-opacity duration-300 ${
                  hoveredId === transformation.id ? 'opacity-0' : 'opacity-100'
                }`}>
                  Before
                </div>

                {/* After Label */}
                <div className={`absolute top-4 left-4 badge badge-green transition-opacity duration-300 ${
                  hoveredId === transformation.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  After
                </div>

                {/* Hover Instruction */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 px-4 py-2 rounded-full">
                    Hover to see After
                  </span>
                </div>
              </div>

              {/* Transformation Details */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {transformation.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Age {transformation.age} • {transformation.duration}
                    </p>
                  </div>
                  {transformation.weightLost && (
                    <div className="badge badge-orange">
                      -{transformation.weightLost}
                    </div>
                  )}
                </div>

                {/* Testimonial */}
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                  "{transformation.testimonial}"
                </p>

                {/* Category Badge */}
                <div className="pt-2">
                  <span className="text-xs text-orange-500 font-medium uppercase tracking-wider">
                    {categories.find(c => c.value === transformation.category)?.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-gray-300 mb-6">
              Join the next batch and transform your body in just 60 days with proven methods.
            </p>
            <button
              onClick={() => {
                document.getElementById('enrollment-form')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className="btn-primary"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Default transformations data (replace with real data from Pandi's Instagram)
const defaultTransformations: Transformation[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    age: 32,
    duration: '60 Days',
    beforeImage: '/images/transformations/rajesh-before.jpg',
    afterImage: '/images/transformations/rajesh-after.jpg',
    weightLost: '15 kg',
    category: 'weight-loss',
    testimonial: 'Pandi sir transformed my life! Lost 15kg and gained confidence. The personalized diet plan and workout routine were game-changers.'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    age: 28,
    duration: '90 Days',
    beforeImage: '/images/transformations/priya-before.jpg',
    afterImage: '/images/transformations/priya-after.jpg',
    weightLost: '12 kg',
    category: 'weight-loss',
    testimonial: 'Best decision ever! The Team Wolf community kept me motivated throughout. Pandi\'s guidance was invaluable.'
  },
  {
    id: 3,
    name: 'Arjun Patel',
    age: 25,
    duration: '60 Days',
    beforeImage: '/images/transformations/arjun-before.jpg',
    afterImage: '/images/transformations/arjun-after.jpg',
    category: 'muscle-gain',
    testimonial: 'Gained 8kg of lean muscle mass. Pandi sir\'s workout split and nutrition advice helped me achieve my dream physique.'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    age: 30,
    duration: '60 Days',
    beforeImage: '/images/transformations/sneha-before.jpg',
    afterImage: '/images/transformations/sneha-after.jpg',
    weightLost: '10 kg',
    category: 'body-recomp',
    testimonial: 'As a working mom, I thought fitness was impossible. Pandi sir proved me wrong with simple, effective routines.'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    age: 35,
    duration: '90 Days',
    beforeImage: '/images/transformations/vikram-before.jpg',
    afterImage: '/images/transformations/vikram-after.jpg',
    weightLost: '20 kg',
    category: 'weight-loss',
    testimonial: 'From 95kg to 75kg in 90 days! The structured program and daily accountability made all the difference.'
  },
  {
    id: 6,
    name: 'Divya Nair',
    age: 26,
    duration: '60 Days',
    beforeImage: '/images/transformations/divya-before.jpg',
    afterImage: '/images/transformations/divya-after.jpg',
    weightLost: '8 kg',
    category: 'body-recomp',
    testimonial: 'Not just weight loss, but a complete lifestyle change. Pandi sir taught me sustainable fitness habits.'
  }
];

export default TransformationGallery;
