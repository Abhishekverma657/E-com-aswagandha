import { Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
   });
   const [submitting, setSubmitting] = useState(false);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(null);

   const handleSubmit = async (e) => {
     e.preventDefault();
     setSubmitting(true);
     setError(null);
     try {
       const res = await fetch('/api/contacts', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
       });
       const data = await res.json();
       if (!res.ok) throw new Error(data.error || 'Failed to submit form');
       
       setSuccess(true);
       setFormData({ firstName: '', lastName: '', email: '', message: '' });
       setTimeout(() => setSuccess(false), 5000); // clear banner after 5 seconds
     } catch (err) {
       console.error(err);
       setError(err.message);
     } finally {
       setSubmitting(false);
     }
   };
  return (
    <div className="min-h-screen bg-secondary pt-24 pb-20 text-left">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center space-y-4">
        <span className="text-accent uppercase tracking-[0.25em] text-xs font-bold font-sans">Get In Touch</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-wide">Connect With Our Team</h1>
        <div className="w-16 h-[2px] bg-accent mx-auto"></div>
        <p className="text-dark/65 max-w-xl mx-auto font-sans font-light text-base leading-relaxed">
          Have queries about our sourcing, certificates of analysis, or custom orders? Reach out and our Ayurvedic advisors will assist you.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 max-w-5xl mx-auto px-6 py-8">
        {/* Contact Info Panel */}
        <div className="w-full lg:w-1/3 space-y-10">
          
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-primary/5 pb-3 tracking-wide flex items-center gap-2">
              <Mail className="w-5 h-5 text-accent" /> Our Coordinates
            </h3>
            <div className="space-y-4 text-sm text-dark/75 font-sans font-light">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary">Email:</span>
                <a href="mailto:thenagauri@gmail.com" className="hover:text-accent transition-colors">thenagauri@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-primary">Phone:</span>
                <a href="tel:+917862826024" className="hover:text-accent transition-colors">+91 78628 26024</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold text-primary flex-shrink-0">Farm:</span>
                <span>Nagaur Organic Farming Belt, Rajasthan - 341001, India</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-primary/5 pb-3 tracking-wide flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" /> Advisor Hours
            </h3>
            <div className="space-y-3 text-sm text-dark/75 font-sans font-light">
              <p><span className="font-semibold text-primary">Monday - Friday:</span> 9am - 6pm (IST)</p>
              <p><span className="font-semibold text-primary">Saturday:</span> 10am - 4pm (IST)</p>
              <p><span className="font-semibold text-primary">Sunday:</span> Closed</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary border-b border-primary/5 pb-3 tracking-wide flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent animate-pulse" /> Lab Reports
            </h3>
            <p className="text-xs text-dark/65 font-sans font-light leading-relaxed">
              If you are requesting a specific NABL lab purity certificate for your product batch, please include your <strong>Batch ID</strong> (printed on the bottom of your jar) in the message area.
            </p>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="w-full lg:w-2/3 bg-white p-8 md:p-10 border border-primary/5 rounded-sm shadow-md">
          {success && (
            <div className="mb-6 bg-accent/15 border border-accent/25 text-primary text-sm p-4 rounded-sm font-sans flex items-center gap-2 animate-fade-in">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span><strong>Message Received!</strong> Our Ayurvedic advisors will reach out to you shortly.</span>
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-sm font-sans animate-fade-in">
              <strong>Submission Error:</strong> {error}
            </div>
          )}
          <form className="space-y-6 font-sans text-sm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-primary uppercase tracking-wider block">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                  required 
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-primary uppercase tracking-wider block">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-primary uppercase tracking-wider block">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                required 
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-primary uppercase tracking-wider block">Your Message</label>
              <textarea 
                rows="5" 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-primary/10 bg-secondary/10 p-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                placeholder="Enter details about your batch, order, or wholesale inquiries..."
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="bg-primary text-secondary hover:bg-primary-light font-bold py-4 px-10 uppercase tracking-widest text-xs transition-all duration-300 rounded-sm shadow-md flex items-center gap-2 hover:shadow-lg disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-accent" />
              <span>{submitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Inline replacement for imports to avoid build failure if Shield isn't imported
import { Shield } from 'lucide-react';

