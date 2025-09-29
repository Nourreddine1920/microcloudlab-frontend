import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

/**
 * @module RegisterPage
 */

/**
 * The registration page component for new users.
 * It provides a form for users to enter their name, email, and password to create an account.
 * It handles form submission, displays errors, and redirects the user upon successful registration.
 *
 * @returns {JSX.Element} The rendered registration page.
 */
const RegisterPage = () => {
  const { signUp, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tos, setTos] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!tos) {
      setError('Please accept the Terms of Service');
      return;
    }
    try {
      await signUp({ name, email, password });
      const target = location.state?.from || '/pricing';
      navigate(target, { replace: true });
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-accent rounded-full pulse-glow"></div>
              <span className="text-accent font-medium text-sm">JOIN US</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-headline text-text-primary mb-4">
              Start Building with
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                MicroCloudLab
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Create your account and unlock the power of professional embedded development tools.
            </p>
          </div>
        </div>
      </section>

      {/* Register Form Section */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="UserPlus" size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-headline text-text-primary mb-2">Create your account</h2>
              <p className="text-text-secondary">Join thousands of developers building amazing projects</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-destructive" />
                  <span className="text-sm text-destructive font-medium">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <Checkbox
                  checked={tos}
                  onChange={() => setTos((v) => !v)}
                  label={
                    <span className="text-sm">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:text-primary/80 underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-primary hover:text-primary/80 underline">Privacy Policy</a>
                    </span>
                  }
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Icon name="UserPlus" size={16} />
                    <span>Create account</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary text-center">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits Preview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
              <Icon name="Code" size={24} className="text-accent mx-auto mb-2" />
              <h3 className="text-sm font-medium text-text-primary">Free IDE Access</h3>
              <p className="text-xs text-text-secondary">Start building immediately</p>
            </div>
            <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
              <Icon name="Users" size={24} className="text-accent mx-auto mb-2" />
              <h3 className="text-sm font-medium text-text-primary">Community</h3>
              <p className="text-xs text-text-secondary">Join fellow developers</p>
            </div>
            <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
              <Icon name="TrendingUp" size={24} className="text-accent mx-auto mb-2" />
              <h3 className="text-sm font-medium text-text-primary">Grow Skills</h3>
              <p className="text-xs text-text-secondary">Learn advanced techniques</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;

