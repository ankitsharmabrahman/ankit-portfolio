
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const navigate = useNavigate();

  async function fetchMessages() {
    const token = sessionStorage.getItem('adminToken');

    if (!token) {
      navigate('/admin-login');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem('adminToken');
        navigate('/admin-login');
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load messages');
      }

      setMessages(Array.isArray(data) ? data : data.contacts || []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    );

    if (!confirmed) return;

    const token = sessionStorage.getItem('adminToken');

    try {
      setDeletingId(id);

      const response = await fetch(
        `http://localhost:3000/api/contacts/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete message');
      }

      setMessages((previous) =>
        previous.filter((message) => message._id !== id)
      );
    } catch (err) {
      setError(err.message || 'Delete failed');
    } finally {
      setDeletingId('');
    }
  }

  function logout() {
    sessionStorage.removeItem('adminToken');
    navigate('/admin-login');
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin-dashboard">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .admin-dashboard {
          min-height: 100vh;
          padding: 40px 6%;
          color: #f8fafc;
          background:
            radial-gradient(ellipse at top left, #172554 0%, transparent 38%),
            linear-gradient(135deg, #080d1b, #111827 55%, #0b1120);
          font-family: Inter, Arial, sans-serif;
        }

        .admin-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 42px;
        }

        .admin-brand {
          color: #a5b4fc;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .admin-heading {
          margin: 12px 0;
          font-size: clamp(30px, 5vw, 46px);
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .admin-subtitle {
          color: #94a3b8;
          line-height: 1.7;
        }

        .admin-logout {
          padding: 11px 18px;
          border: 1px solid #334155;
          border-radius: 12px;
          color: #e2e8f0;
          background: #172033;
          cursor: pointer;
          transition: .25s;
        }

        .admin-logout:hover {
          background: #334155;
          border-color: #818cf8;
          transform: translateY(-2px);
        }

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 18px;
          margin-bottom: 34px;
        }

        .admin-stat {
          padding: 23px;
          border: 1px solid #293449;
          border-radius: 18px;
          background: rgba(20, 30, 50, .75);
          transition: transform .25s, border-color .25s;
        }

        .admin-stat:hover {
          transform: translateY(-4px);
          border-color: #818cf8;
        }

        .admin-stat-label {
          color: #94a3b8;
          font-size: 13px;
        }

        .admin-stat-number {
          margin-top: 12px;
          color: #c7d2fe;
          font-size: 34px;
          font-weight: 800;
        }

        .admin-section-title {
          margin: 0 0 20px;
          font-size: 22px;
        }

        .admin-message-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 20px;
        }

        .admin-message-card {
          position: relative;
          overflow: hidden;
          padding: 24px;
          border: 1px solid #293449;
          border-radius: 20px;
          background: linear-gradient(145deg, #182235, #111827);
          box-shadow: 0 12px 35px rgba(0, 0, 0, .16);
          transition: transform .25s, border-color .25s, box-shadow .25s;
          animation: adminFadeIn .45s ease both;
        }

        .admin-message-card::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #818cf8, #38bdf8);
          content: "";
        }

        .admin-message-card:hover {
          transform: translateY(-5px);
          border-color: #6366f1;
          box-shadow: 0 18px 40px rgba(79, 70, 229, .14);
        }

        .admin-person {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 20px;
        }

        .admin-avatar {
          display: grid;
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          place-items: center;
          border-radius: 15px;
          color: #e0e7ff;
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          font-size: 19px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .admin-person-name {
          overflow-wrap: anywhere;
          margin: 0 0 5px;
          font-size: 17px;
          font-weight: 700;
        }

        .admin-person-email {
          overflow-wrap: anywhere;
          color: #93c5fd;
          font-size: 13px;
          text-decoration: none;
        }

        .admin-person-email:hover {
          color: #bfdbfe;
          text-decoration: underline;
        }

        .admin-message-label {
          margin-bottom: 9px;
          color: #a5b4fc;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .admin-message-text {
          min-height: 80px;
          margin: 0 0 22px;
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.8;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }

        .admin-delete {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #7f1d1d;
          border-radius: 12px;
          color: #fecaca;
          background: rgba(127, 29, 29, .2);
          font-weight: 700;
          cursor: pointer;
          transition: .25s;
        }

        .admin-delete:hover:not(:disabled) {
          border-color: #ef4444;
          color: white;
          background: #b91c1c;
        }

        .admin-delete:disabled {
          opacity: .6;
          cursor: wait;
        }

        .admin-state {
          padding: 45px 20px;
          border: 1px dashed #334155;
          border-radius: 18px;
          color: #94a3b8;
          background: rgba(15, 23, 42, .55);
          text-align: center;
          line-height: 1.8;
        }

        .admin-error {
          margin-bottom: 20px;
          padding: 14px 16px;
          border: 1px solid #7f1d1d;
          border-radius: 12px;
          color: #fecaca;
          background: #450a0a;
        }

        .admin-retry {
          margin-top: 14px;
          padding: 10px 18px;
          border: 0;
          border-radius: 10px;
          color: white;
          background: #4f46e5;
          cursor: pointer;
        }

        @keyframes adminFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .admin-dashboard {
            padding: 26px 5%;
          }

          .admin-topbar {
            align-items: flex-start;
          }

          .admin-heading {
            letter-spacing: -1px;
          }

          .admin-message-card {
            padding: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .admin-message-card,
          .admin-stat,
          .admin-logout {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <header className="admin-topbar">
        <div>
          <div className="admin-brand">Portfolio Admin</div>
          <h1 className="admin-heading">Messages Inbox</h1>
          <div className="admin-subtitle">
            Manage the messages sent through your portfolio.
          </div>
        </div>

        <button className="admin-logout" onClick={logout}>
          Log out ↗
        </button>
      </header>

      <section className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat-label">Total messages</div>
          <div className="admin-stat-number">{messages.length}</div>
        </div>

        <div className="admin-stat">
          <div className="admin-stat-label">Dashboard status</div>
          <div className="admin-stat-number" style={{ fontSize: 24 }}>
            {loading ? 'Loading…' : error ? 'Check' : 'Active'}
          </div>
        </div>
      </section>

      {error && (
        <div className="admin-error" role="alert">
          {error}
          <button className="admin-retry" onClick={fetchMessages}>
            Try again
          </button>
        </div>
      )}

      <h2 className="admin-section-title">Recent messages</h2>

      {loading ? (
        <div className="admin-state">Loading your messages…</div>
      ) : messages.length === 0 ? (
        <div className="admin-state">
          <div style={{ fontSize: 36, marginBottom: 10 }}>✉</div>
          <strong>No messages yet</strong>
          <div>New portfolio contact messages will appear here.</div>
        </div>
      ) : (
        <div className="admin-message-grid">
          {messages.map((message) => (
            <article className="admin-message-card" key={message._id}>
              <div className="admin-person">
                <div className="admin-avatar">
                  {(message.name || '?').trim().charAt(0)}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3 className="admin-person-name">
                    {message.name || 'Unknown sender'}
                  </h3>

                  <a
                    className="admin-person-email"
                    href={`mailto:${message.email}`}
                  >
                    {message.email}
                  </a>
                </div>
              </div>

              <div className="admin-message-label">Message</div>
              <p className="admin-message-text">
                {message.message || 'No message content'}
              </p>

              <button
                className="admin-delete"
                onClick={() => deleteMessage(message._id)}
                disabled={deletingId === message._id}
              >
                {deletingId === message._id
                  ? 'Deleting…'
                  : 'Delete message  ×'}
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;

