export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Contact Us</h1>
        <p className="opacity-80 max-w-2xl mx-auto">
          Have a question about our products, an order, or Ayurveda in general? We'd love to hear from you.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="w-full md:w-1/3 space-y-8">
          <div>
            <h3 className="font-serif text-xl text-primary border-b border-primary/20 pb-2 mb-4">Get in Touch</h3>
            <p className="opacity-80 mb-2">Email: support@desialchemist.com</p>
            <p className="opacity-80">Phone: +91 98765 43210</p>
          </div>
          
          <div>
            <h3 className="font-serif text-xl text-primary border-b border-primary/20 pb-2 mb-4">Business Hours</h3>
            <p className="opacity-80 mb-2">Monday - Friday: 9am - 6pm (IST)</p>
            <p className="opacity-80">Saturday: 10am - 4pm (IST)</p>
            <p className="opacity-80">Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-2/3 bg-white p-8 border border-primary/10">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary uppercase tracking-wider">First Name</label>
                <input type="text" className="w-full border border-primary/20 p-3 focus:outline-none focus:border-accent" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary uppercase tracking-wider">Last Name</label>
                <input type="text" className="w-full border border-primary/20 p-3 focus:outline-none focus:border-accent" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary uppercase tracking-wider">Email Address</label>
              <input type="email" className="w-full border border-primary/20 p-3 focus:outline-none focus:border-accent" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary uppercase tracking-wider">Message</label>
              <textarea rows="5" className="w-full border border-primary/20 p-3 focus:outline-none focus:border-accent" required></textarea>
            </div>

            <button type="submit" className="bg-primary text-secondary font-bold py-4 px-10 uppercase tracking-widest hover:bg-accent transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
