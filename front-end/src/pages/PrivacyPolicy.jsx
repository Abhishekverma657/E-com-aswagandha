import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#f4f1ea] min-h-screen pt-32 md:pt-40 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-lg border border-[#e6e2d6]">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-wide">Privacy Policy</h1>
        
        <div className="prose prose-stone max-w-none font-sans font-light text-gray-700 space-y-6">
          <p>
            At Nagori, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, shipping address, and payment details when you place an order, subscribe to our newsletter, or contact us.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            Your information is used to process your orders, communicate with you about your purchases, improve our website and services, and send promotional offers if you have opted in to receive them.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is entirely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">4. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website, conducting our business, or serving our users, as long as those parties agree to keep this information confidential.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">5. Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@nagori.com.
          </p>
        </div>
      </div>
    </div>
  );
}
