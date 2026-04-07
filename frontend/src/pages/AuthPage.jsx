import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const initialSignup = { name: '', email: '', password: '' };
const initialLogin = { email: '', password: '' };

function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, initializing } = useAuth();
  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        await login(loginForm);
      } else {
        await signup(signupForm);
      }
      navigate('/products');
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <div className="auth-layout">
      <section className="auth-hero">
        <p className="eyebrow">Starter Commerce Stack</p>
        <h1>Launch a modern storefront with a clean base architecture.</h1>
        <p>
          FastAPI, PostgreSQL, JWT auth, and a responsive React client wired together with simple,
          extendable patterns.
        </p>
      </section>

      <section className="auth-card">
        <div className="tab-row">
          <button className={mode === 'login' ? 'tab active' : 'tab'} onClick={() => setMode('login')}>
            Login
          </button>
          <button className={mode === 'signup' ? 'tab active' : 'tab'} onClick={() => setMode('signup')}>
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <label>
              Name
              <input
                type="text"
                value={signupForm.name}
                onChange={(event) => setSignupForm({ ...signupForm, name: event.target.value })}
                placeholder="Alex Morgan"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={mode === 'login' ? loginForm.email : signupForm.email}
              onChange={(event) =>
                mode === 'login'
                  ? setLoginForm({ ...loginForm, email: event.target.value })
                  : setSignupForm({ ...signupForm, email: event.target.value })
              }
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={mode === 'login' ? loginForm.password : signupForm.password}
              onChange={(event) =>
                mode === 'login'
                  ? setLoginForm({ ...loginForm, password: event.target.value })
                  : setSignupForm({ ...signupForm, password: event.target.value })
              }
              placeholder="Enter your password"
              required
            />
          </label>

          {error ? <div className="error-banner">{error}</div> : null}

          <button className="primary-button full-width" type="submit" disabled={initializing}>
            {initializing ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default AuthPage;
