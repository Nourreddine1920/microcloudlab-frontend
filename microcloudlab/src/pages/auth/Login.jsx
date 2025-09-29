import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

/**
 * @module LoginPage
 */

/**
 * The login page component for user authentication.
 * It provides a form for users to enter their email and password to sign in.
 * It handles form submission, displays errors, and redirects the user upon successful authentication.
 *
 * @returns {JSX.Element} The rendered login page.
 */
const LoginPage = () => {
  const { signIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn({ email, password });
      const target = location.state?.from || '/ide';
      navigate(target, { replace: true });
    } catch (err) {
      setError('Invalid credentials');
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
              <span className="text-accent font-medium text-sm">SIGN IN</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-headline text-text-primary mb-4">
              Welcome Back to
              <span className="block text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                MicroCloudLab
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Access your embedded development workspace and continue building amazing projects.
            </p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="LogIn" size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-headline text-text-primary mb-2">Sign in to your account</h2>
              <p className="text-text-secondary">Enter your credentials to access the IDE</p>
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  checked={remember}
                  onChange={() => setRemember((v) => !v)}
                  label="Remember me"
                />
                <Link to="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
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
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Icon name="LogIn" size={16} />
                    <span>Sign in</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary text-center">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
              <Icon name="Cpu" size={24} className="text-accent mx-auto mb-2" />
              <h3 className="text-sm font-medium text-text-primary">Advanced IDE</h3>
              <p className="text-xs text-text-secondary">Professional development tools</p>
            </div>
            <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
              <Icon name="Shield" size={24} className="text-accent mx-auto mb-2" />
              <h3 className="text-sm font-medium text-text-primary">Secure Access</h3>
              <p className="text-xs text-text-secondary">Your data is protected</p>
            </div>
            <div className="text-center p-4 bg-card/50 border border-border rounded-xl">
              <Icon name="Zap" size={24} className="text-accent mx-auto mb-2" />
              <h3 className="text-sm font-medium text-text-primary">Real-time Sync</h3>
              <p className="text-xs text-text-secondary">Instant configuration updates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;

