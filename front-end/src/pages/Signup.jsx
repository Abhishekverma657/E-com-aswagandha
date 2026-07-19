import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, ArrowRight, Loader2 } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signup(name, email, password);
      // Redirect to shop on successful signup
      navigate('/shop');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-20 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white p-8 md:p-10 border border-primary/5 rounded-sm shadow-md space-y-8 text-left">
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-accent uppercase tracking-[0.25em] text-[10px] font-bold font-sans">Begin Sourcing</span>
          <h1 className="text-3xl font-serif font-bold text-primary">Create Account</h1>
          <div className="w-12 h-[2px] bg-accent mx-auto"></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-sm font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 font-sans text-sm">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-primary/45" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full border border-primary/10 bg-secondary/10 pl-11 pr-4 py-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                required 
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-primary/45" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-primary/10 bg-secondary/10 pl-11 pr-4 py-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                required 
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-wider block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-primary/45" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (Min. 6 characters)"
                minLength="6"
                className="w-full border border-primary/10 bg-secondary/10 pl-11 pr-4 py-3.5 focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium rounded-xs" 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-primary text-secondary hover:bg-primary-light font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all duration-300 rounded-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
            ) : (
              <ArrowRight className="w-4 h-4 text-accent" />
            )}
            <span>{submitting ? 'Registering...' : 'Register'}</span>
          </button>
        </form>

        <div className="text-center font-sans text-xs text-dark/60 border-t border-primary/5 pt-6">
          <span>Already have an account? </span>
          <Link to="/login" className="text-accent hover:underline font-bold">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
