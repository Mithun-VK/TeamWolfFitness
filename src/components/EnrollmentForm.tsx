/* eslint-disable jsx-a11y/anchor-is-valid */
// src/components/EnrollmentForm.tsx

import React, { useState } from 'react';
import { simulatePayment } from '../utils/razorpay';

interface FormData {
  // Challenge selection
  challengeType: '60-day' | '90-day' | '';
  
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  
  // Step 2: Physical Stats
  currentWeight: string;
  height: string;
  bodyFat: string;
  
  // Step 3: Goals & Medical
  primaryGoal: 'weight-loss' | 'muscle-gain' | 'body-recomp' | 'general-fitness' | '';
  targetWeight: string;
  medicalConditions: string;
  dietaryRestrictions: string;
  
  // Step 4: Terms
  agreedToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface EnrollmentFormProps {
  onSubmit?: (data: FormData) => void;
  defaultChallenge?: '60-day' | '90-day';
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ onSubmit, defaultChallenge }) => {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for challenge selection
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    challengeType: defaultChallenge || '',
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    currentWeight: '',
    height: '',
    bodyFat: '',
    primaryGoal: '',
    targetWeight: '',
    medicalConditions: '',
    dietaryRestrictions: '',
    agreedToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const totalSteps = 5; // 0: Challenge selection, 1-4: Original steps

  // Challenge details
  const challenges = {
    '60-day': {
      name: '60-Day Challenge',
      price: 3999,
      originalPrice: 5999,
      features: [
        'Personalized workout plan',
        'Customized nutrition & meal plans',
        'Weekly progress check-ins',
        'Form correction videos',
        'Private WhatsApp community'
      ]
    },
    '90-day': {
      name: '90-Day Challenge',
      price: 5499,
      originalPrice: 8999,
      features: [
        'Everything in 60-day challenge',
        'Extended transformation period',
        'Advanced training protocols',
        'Monthly 1-on-1 video calls with Pandi',
        'Lifetime access to workout library'
      ]
    }
  };

  const selectedChallenge = formData.challengeType ? challenges[formData.challengeType] : null;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      if (!formData.challengeType) newErrors.challengeType = 'Please select a challenge';
    }

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.age) newErrors.age = 'Age is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }

    if (step === 2) {
      if (!formData.currentWeight) newErrors.currentWeight = 'Current weight is required';
      if (!formData.height) newErrors.height = 'Height is required';
    }

    if (step === 3) {
      if (!formData.primaryGoal) newErrors.primaryGoal = 'Primary goal is required';
      if (!formData.targetWeight) newErrors.targetWeight = 'Target weight is required';
    }

    if (step === 4) {
      if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    const amount = selectedChallenge?.price || 3999;
    
    simulatePayment(
      (response) => {
        console.log('Payment successful:', response);
        alert(`✅ Enrollment successful!\n\nChallenge: ${selectedChallenge?.name}\nAmount: ₹${amount}\nPayment ID: ${response.razorpay_payment_id}\n\nWelcome to Team Wolf! Check your email for next steps.`);
        setIsSubmitting(false);
        if (onSubmit) onSubmit(formData);
      },
      2000
    );
  };

  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <section id="enrollment-form" className="section-padding bg-gradient-to-br from-gray-900 to-black">
      <div className="container-custom max-w-4xl">
        <div className="section-header">
          <h2 className="section-title">
            Enroll in Transformation Challenge
          </h2>
          <p className="section-subtitle">
            Complete the form below to secure your spot. Limited spots remaining!
          </p>
        </div>

        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-400">Step {currentStep} of {totalSteps - 1}</span>
              <span className="text-sm font-medium text-orange-500">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="card-gradient p-8 md:p-12">
          <form onSubmit={handleSubmit}>
            
            {/* Step 0: Challenge Selection */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Choose Your Challenge</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* 60-Day Challenge */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, challengeType: '60-day' }))}
                    className={`card cursor-pointer transition-all duration-300 ${
                      formData.challengeType === '60-day'
                        ? 'border-2 border-orange-500 shadow-lg shadow-orange-500/20'
                        : 'hover:border-orange-500/50'
                    }`}
                  >
                    <div className="relative">
                      <div className="absolute top-0 right-0">
                        <span className="badge badge-orange">Most Popular</span>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">60 Days</h4>
                      <div className="flex items-baseline space-x-2 mb-4">
                        <span className="text-3xl font-bold gradient-text">₹3,999</span>
                        <span className="text-lg text-gray-400 line-through">₹5,999</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {challenges['60-day'].features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-300">
                            <span className="text-orange-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {formData.challengeType === '60-day' && (
                        <div className="mt-4 text-center">
                          <span className="text-orange-500 font-semibold">✓ Selected</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 90-Day Challenge */}
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, challengeType: '90-day' }))}
                    className={`card cursor-pointer transition-all duration-300 ${
                      formData.challengeType === '90-day'
                        ? 'border-2 border-orange-500 shadow-lg shadow-orange-500/20'
                        : 'hover:border-orange-500/50'
                    }`}
                  >
                    <h4 className="text-2xl font-bold text-white mb-2">90 Days</h4>
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-3xl font-bold gradient-text">₹5,499</span>
                      <span className="text-lg text-gray-400 line-through">₹8,999</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {challenges['90-day'].features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-300">
                          <span className="text-orange-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {formData.challengeType === '90-day' && (
                      <div className="mt-4 text-center">
                        <span className="text-orange-500 font-semibold">✓ Selected</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {errors.challengeType && <p className="error-message">{errors.challengeType}</p>}
              </div>
            )}

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
                
                <div>
                  <label htmlFor="fullName" className="label label-required">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`input ${errors.fullName ? 'input-error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="label label-required">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input ${errors.email ? 'input-error' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="label label-required">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="10-digit number"
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="label label-required">Age</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className={`input ${errors.age ? 'input-error' : ''}`}
                      placeholder="Enter your age"
                      min="15"
                      max="75"
                    />
                    {errors.age && <p className="error-message">{errors.age}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="label label-required">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`input ${errors.gender ? 'input-error' : ''}`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="error-message">{errors.gender}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Physical Stats */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Physical Stats</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentWeight" className="label label-required">Current Weight (kg)</label>
                    <input
                      type="number"
                      id="currentWeight"
                      name="currentWeight"
                      value={formData.currentWeight}
                      onChange={handleChange}
                      className={`input ${errors.currentWeight ? 'input-error' : ''}`}
                      placeholder="e.g., 75"
                      step="0.1"
                    />
                    {errors.currentWeight && <p className="error-message">{errors.currentWeight}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="height" className="label label-required">Height (cm)</label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      className={`input ${errors.height ? 'input-error' : ''}`}
                      placeholder="e.g., 170"
                      step="0.1"
                    />
                    {errors.height && <p className="error-message">{errors.height}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="bodyFat" className="label">Body Fat Percentage (Optional)</label>
                  <input
                    type="number"
                    id="bodyFat"
                    name="bodyFat"
                    value={formData.bodyFat}
                    onChange={handleChange}
                    className="input"
                    placeholder="If known, e.g., 25"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-400 mt-1">Leave blank if you don't know</p>
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-gray-300">
                    📸 <strong className="text-white">Note:</strong> You'll be asked to upload current photos (front, side, back) after payment confirmation.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Goals & Medical */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Goals & Medical History</h3>
                
                <div>
                  <label htmlFor="primaryGoal" className="label label-required">Primary Goal</label>
                  <select
                    id="primaryGoal"
                    name="primaryGoal"
                    value={formData.primaryGoal}
                    onChange={handleChange}
                    className={`input ${errors.primaryGoal ? 'input-error' : ''}`}
                  >
                    <option value="">Select your primary goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="body-recomp">Body Recomposition</option>
                    <option value="general-fitness">General Fitness</option>
                  </select>
                  {errors.primaryGoal && <p className="error-message">{errors.primaryGoal}</p>}
                </div>

                <div>
                  <label htmlFor="targetWeight" className="label label-required">Target Weight (kg)</label>
                  <input
                    type="number"
                    id="targetWeight"
                    name="targetWeight"
                    value={formData.targetWeight}
                    onChange={handleChange}
                    className={`input ${errors.targetWeight ? 'input-error' : ''}`}
                    placeholder="Your desired weight"
                    step="0.1"
                  />
                  {errors.targetWeight && <p className="error-message">{errors.targetWeight}</p>}
                </div>

                <div>
                  <label htmlFor="medicalConditions" className="label">Medical Conditions or Injuries</label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    className="input min-h-[100px] resize-y"
                    placeholder="Any health conditions, injuries, or medications we should know about (optional)"
                    rows={3}
                  />
                </div>

                <div>
                  <label htmlFor="dietaryRestrictions" className="label">Dietary Restrictions</label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    className="input min-h-[80px] resize-y"
                    placeholder="Vegetarian, vegan, allergies, etc. (optional)"
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review & Payment */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-2xl font-bold text-white mb-6">Review & Payment</h3>
                
                <div className="glass p-6 rounded-lg space-y-4">
                  <h4 className="text-lg font-semibold text-orange-500">Enrollment Summary</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Name</p>
                      <p className="text-white font-medium">{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-white font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Primary Goal</p>
                      <p className="text-white font-medium capitalize">{formData.primaryGoal?.replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>

                {selectedChallenge && (
                  <div className="card-gradient p-6 border-2 border-orange-500/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">{selectedChallenge.name}</h4>
                        <p className="text-sm text-gray-400">One-time payment</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold gradient-text">₹{selectedChallenge.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-400 line-through">₹{selectedChallenge.originalPrice.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="badge badge-orange">
                      🎉 Early Bird Discount - Save ₹{(selectedChallenge.originalPrice - selectedChallenge.price).toLocaleString()}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreedToTerms"
                      name="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <label htmlFor="agreedToTerms" className="text-sm text-gray-300">
                      I agree to the{' '}
                      <a href="#" className="text-orange-500 hover:text-orange-400">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-orange-500 hover:text-orange-400">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.agreedToTerms && <p className="error-message">{errors.agreedToTerms}</p>}
                </div>

                <div className="glass p-4 rounded-lg">
                  <p className="text-sm text-gray-300">
                    🔒 <strong className="text-white">Secure Payment:</strong> You'll be redirected to Razorpay for secure payment processing.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="btn-ghost"
                  disabled={isSubmitting}
                >
                  ← Previous
                </button>
              )}
              
              {currentStep < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`btn-primary ${currentStep === 0 ? 'ml-auto' : ''}`}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner w-5 h-5 mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment →'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentForm;
