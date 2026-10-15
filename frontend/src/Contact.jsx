
import { useState } from 'react';
import './css/contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }


  
async function handleSubmit(event) {
  event.preventDefault();

  setStatus('Sending message...');

  try {
    const response = await fetch(
      'http://localhost:3000/api/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send message.');
    }

    setStatus('Message sent successfully!');

    setFormData({
      name: '',
      email: '',
      message: '',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    setStatus(
      'Unable to send message. Please check if the backend is running.'
    );
  }
}


  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        <div className="contact-heading">
          <p className="contact-label">GET IN TOUCH</p>

          <h2>Let's Work <span>Together</span></h2>

          <p>
            Have a project idea or an opportunity? Feel free to
            contact me. I would love to hear from you.
          </p>
        </div>

        <div className="contact-content">

          {/* Left side */}
          <div className="contact-info">
            <h3>Let's start a conversation.</h3>

            <p className="contact-description">
              I am interested in web development opportunities,
              internships and projects where I can learn and grow.
            </p>

            <a
              href="mailto:ankit95sharma35@gmail.com"
              className="contact-info-card"
            >
              <span className="contact-icon">@</span>
              <span>
                <small>Email me</small>
                <strong>ankit95sharma35@gmail.com</strong>
              </span>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              href="https://github.com/ankitsharmabrahman"
              target="_blank"
              rel="noreferrer"
              className="contact-info-card"
            >
              <span className="contact-icon">GH</span>
              <span>
                <small>GitHub</small>
                <strong>Explore my projects</strong>
              </span>
              <span className="contact-arrow">↗</span>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="contact-info-card"
            >
              <span className="contact-icon">in</span>
              <span>
                <small>LinkedIn</small>
                <strong>Let's connect professionally</strong>
              </span>
              <span className="contact-arrow">↗</span>
            </a>
          </div>

          {/* Right side: Contact form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send me a message</h3>

            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Your Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your idea..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              Send Message <span>↗</span>
            </button>

            <p className="form-status" aria-live="polite">
              {status}
            </p>
          </form>

        </div>

        <div className="contact-footer">
          <p>Designed & built with <span>♥</span> by Ankit Sharma</p>
        </div>

      </div>
    </section>
  );
}

export default Contact;
