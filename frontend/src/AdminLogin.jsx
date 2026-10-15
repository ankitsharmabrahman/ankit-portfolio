
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3000/api/admin/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      if (!data.token) {
        throw new Error('Login response did not contain a token');
      }

      sessionStorage.setItem('adminToken', data.token);
      navigate('/admin-messages');
    } catch (err) {
      setError(
        err.message === 'Failed to fetch'
          ? 'Cannot connect to the server. Please try again.'
          : err.message || 'Unable to login'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 18px;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          background:
            radial-gradient(ellipse at 15% 15%, rgba(99, 102, 241, .22), transparent 38%),
            radial-gradient(ellipse at 85% 85%, rgba(147, 51, 234, .20), transparent 35%),
            #080d1b;
          overflow: hidden;
        }

        .login-card {
          width: 100%;
          max-width: 430px;
          padding: 38px;
          border: 1px solid rgba(148, 163, 184, .22);
          border-radius: 25px;
          background: rgba(17, 24, 39, .86);
          box-shadow: 0 25px 80px rgba(0, 0, 0, .4);
          backdrop-filter: blur(18px);
          animation: loginEnter .55s ease both;
        }

        .login-logo {
          width: 66px;
          height: 66px;
          display: grid;
          place-items: center;
          margin: 0 auto 22px;
          border: 1px solid rgba(199, 210, 254, .4);
          border-radius: 21px;
          color: white;
          font-size: 28px;
          background: linear-gradient(135deg, #6366f1, #9333ea);
          box-shadow: 0 8px 30px rgba(99, 102, 241, .3);
          animation: logoFloat 3s ease-in-out infinite;
        }

        .login-eyebrow {
          color: #a5b4fc;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          text-align: center;
          text-transform: uppercase;
        }

        .login-title {
          margin: 12px 0 10px;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1px;
          text-align: center;
        }

        .login-description {
          margin: 0 0 30px;
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.7;
          text-align: center;
        }

        .login-field {
          margin-bottom: 21px;
        }

        .login-label {
          display: block;
          margin-bottom: 9px;
          color: #e2e8f0;
          font-size: 13px;
          font-weight: 700;
        }

        .login-input-wrap {
          position: relative;
        }

        .login-input {
          width: 100%;
          min-height: 49px;
          padding: 13px 14px;
          border: 1px solid #334155;
          border-radius: 12px;
          outline: none;
          color: #f8fafc;
          background: #0b1220;
          font-size: 14px;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }

        .login-input::placeholder {
          color: #64748b;
        }

        .login-input:focus {
          border-color: #818cf8;
          background: #111a2c;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, .15);
        }

        .login-password {
          padding-right: 76px;
        }

        .login-toggle-password {
          position: absolute;
          top: 50%;
          right: 12px;
          padding: 6px;
          border: none;
          color: #a5b4fc;
          background: transparent;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transform: translateY(-50%);
        }

        .login-toggle-password:hover {
          color: white;
        }

        .login-submit {
          width: 100%;
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 8px;
          border: none;
          border-radius: 12px;
          color: white;
          background: linear-gradient(100deg, #6366f1, #9333ea);
          box-shadow: 0 8px 24px rgba(99, 102, 241, .22);
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s, opacity .2s;
        }

        .login-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(99, 102, 241, .38);
        }

        .login-submit:active:not(:disabled) {
          transform: scale(.98);
        }

        .login-submit:disabled {
          opacity: .65;
          cursor: wait;
        }

        .login-error {
          margin: 0 0 18px;
          padding: 12px 14px;
          border: 1px solid #7f1d1d;
          border-radius: 11px;
          color: #fecaca;
          background: rgba(127, 29, 29, .25);
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .login-footer {
          margin-top: 26px;
          color: #64748b;
          font-size: 12px;
          text-align: center;
        }

        .login-back {
          display: block;
          margin: 23px auto 0;
          padding: 6px 10px;
          border: none;
          color: #a5b4fc;
          background: transparent;
          font-size: 13px;
          cursor: pointer;
          transition: color .2s;
        }

        .login-back:hover {
          color: white;
        }

        @keyframes loginEnter {
          from { opacity: 0; transform: translateY(18px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 28px 22px;
            border-radius: 20px;
          }

          .login-title {
            font-size: 28px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-card, .login-logo {
            animation: none;
          }

          .login-input, .login-submit, .login-back {
            transition: none;
          }
        }
      `}</style>

      <main className="login-card">
        <div className="login-logo" aria-hidden="true">
          ⚡
        </div>

        <div className="login-eyebrow">Ankit Sharma · Portfolio</div>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-description">
          Sign in to access your admin dashboard and manage your messages.
        </p>

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label className="login-label" htmlFor="admin-email">
              Email Address
            </label>
            <input
              id="admin-email"
              className="login-input"
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="admin-password">
              Password
            </label>

            <div className="login-input-wrap">
              <input
                id="admin-password"
                className="login-input login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="login-toggle-password"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              ⚠ {error}
            </div>
          )}

          <button
            className="login-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>Verifying credentials...</>
            ) : (
              <>Sign In <span aria-hidden="true">→</span></>
            )}
          </button>
        </form>

        <button
          type="button"
          className="login-back"
          onClick={() => navigate('/')}
        >
          ← Back to Portfolio
        </button>

        <div className="login-footer">
          Protected Admin Area · Secure Sign In
        </div>
      </main>
    </div>
  );
}

export default AdminLogin;
