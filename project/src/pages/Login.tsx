import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogIn } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
      const user = await res.json();
      setUser(user);
      // Optionally: localStorage.setItem('user', JSON.stringify(user));
    } catch (err: any) {
      setError(err.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled in login function
    }
  };

  return (
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>
          
          <div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600 text-white"
              isLoading={isLoading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            <div className="flex flex-col gap-2">
              <p>Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEmail('manager@security.com');
                    setPassword('password123');
                  }}
                >
                  Login as Manager
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEmail('guard@security.com');
                    setPassword('password123');
                  }}
                >
                  Login as Security
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;