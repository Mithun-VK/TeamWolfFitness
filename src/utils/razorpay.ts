/* eslint-disable import/no-anonymous-default-export */
// src/utils/razorpay.ts

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface Window {
  Razorpay: any;
}

declare const window: Window;

/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
};

/**
 * Initialize Razorpay payment
 */
export const initiatePayment = async (options: {
  amount: number;
  currency?: string;
  name: string;
  email: string;
  phone: string;
  description?: string;
  orderId?: string;
  onSuccess: (response: RazorpayResponse) => void;
  onFailure?: (error: any) => void;
  onDismiss?: () => void;
}): Promise<void> => {
  // Load Razorpay script
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    console.error('Failed to load Razorpay script');
    if (options.onFailure) {
      options.onFailure({ error: 'Failed to load Razorpay' });
    }
    return;
  }

  // Razorpay configuration
  const razorpayOptions: RazorpayOptions = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXXXX', // Replace with your key
    amount: options.amount * 100, // Amount in paise (multiply by 100)
    currency: options.currency || 'INR',
    name: 'Team Wolf Fitness Factory',
    description: options.description || '60-Day Transformation Challenge Enrollment',
    image: '/images/team-wolf-logo.png', // Your logo
    order_id: options.orderId, // Optional: Pre-created order ID from backend
    handler: (response: RazorpayResponse) => {
      console.log('Payment successful:', response);
      options.onSuccess(response);
    },
    prefill: {
      name: options.name,
      email: options.email,
      contact: options.phone,
    },
    notes: {
      challenge_type: options.description || '60-Day Challenge',
      enrollment_date: new Date().toISOString(),
    },
    theme: {
      color: '#F97316', // Team Wolf Orange
    },
    modal: {
      ondismiss: () => {
        console.log('Payment modal dismissed');
        if (options.onDismiss) {
          options.onDismiss();
        }
      },
    },
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);
    
    razorpay.on('payment.failed', (response: any) => {
      console.error('Payment failed:', response.error);
      if (options.onFailure) {
        options.onFailure(response.error);
      }
    });
    
    razorpay.open();
  } catch (error) {
    console.error('Error initiating payment:', error);
    if (options.onFailure) {
      options.onFailure(error);
    }
  }
};

/**
 * Create Razorpay order (call your backend API)
 */
export const createRazorpayOrder = async (amount: number): Promise<string | null> => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Amount in paise
        currency: 'INR',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const data = await response.json();
    return data.order_id;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return null;
  }
};

/**
 * Verify payment signature (call your backend API)
 */
export const verifyPayment = async (
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
        payment_id: paymentId,
        signature: signature,
      }),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const data = await response.json();
    return data.verified === true;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
};

/**
 * Test mode helper - Simulates payment for demo purposes
 */
export const simulatePayment = (
  onSuccess: (response: RazorpayResponse) => void,
  delay: number = 2000
): void => {
  console.log('⚠️ DEMO MODE: Simulating payment...');
  
  setTimeout(() => {
    const mockResponse: RazorpayResponse = {
      razorpay_payment_id: `pay_test_${Date.now()}`,
      razorpay_order_id: `order_test_${Date.now()}`,
      razorpay_signature: 'mock_signature_for_demo',
    };
    
    console.log('✅ DEMO MODE: Payment successful', mockResponse);
    onSuccess(mockResponse);
  }, delay);
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Get payment status message
 */
export const getPaymentStatusMessage = (status: 'success' | 'failed' | 'pending'): string => {
  const messages = {
    success: '🎉 Payment successful! Welcome to Team Wolf.',
    failed: '❌ Payment failed. Please try again or contact support.',
    pending: '⏳ Payment is being processed. Please wait...',
  };
  return messages[status];
};

export default {
  loadRazorpayScript,
  initiatePayment,
  createRazorpayOrder,
  verifyPayment,
  simulatePayment,
  formatCurrency,
  getPaymentStatusMessage,
};
