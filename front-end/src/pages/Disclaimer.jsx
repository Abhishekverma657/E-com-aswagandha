import React from 'react';

export default function Disclaimer() {
  return (
    <div className="bg-[#f4f1ea] min-h-screen pt-32 md:pt-40 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-lg border border-[#e6e2d6]">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-wide">Disclaimer</h1>


        <div className="prose prose-stone max-w-none font-sans font-light text-gray-700 space-y-6">
          <p>
            The information provided on the Nagori website is for general informational and educational purposes only.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">1. Medical Disclaimer</h2>
          <p>
            The products and information provided on this website are not intended to diagnose, treat, cure, or prevent any disease. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition before using our products.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">2. Product Efficacy</h2>
          <p>
            While we stand behind the quality of our Ayurvedic products, individual results may vary. Testimonials and reviews on this site are individual experiences and do not guarantee the same results for everyone.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">3. Accuracy of Information</h2>
          <p>
            We make every effort to ensure the accuracy of the information on our website. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">4. External Links</h2>
          <p>
            Our website may contain links to external sites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>

          <h2 className="font-sans font-bold text-xl text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
          <p>
            Nagori and its affiliates will not be liable for any damages of any kind arising from the use of this site or our products, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
          </p>
        </div>
      </div>
    </div>
  );
}
