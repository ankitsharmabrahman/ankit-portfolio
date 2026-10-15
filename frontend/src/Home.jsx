
import './css/home.css';

function Home() {
  return (
    <section className="home-container" id="home">
      <div className="home-content">
        <p className="intro">
          <span className="status-dot"></span>
          AVAILABLE FOR OPPORTUNITIES
        </p>

        <h1>
          Hi, I'm <span>Ankit Sharma</span>
        </h1>

        <h2>
          Aspiring <span>Full Stack Developer</span>
        </h2>

        <p className="description">
          I create modern, responsive and user-friendly web
          applications. I enjoy turning ideas into real
          projects using React, JavaScript and backend technologies.
        </p>

        <div className="home-buttons">
          <a href="#projects" className="btn-primary">
            Explore Projects <span>↗</span>
          </a>

          <a href="#contact" className="btn-secondary">
            Contact Me
          </a>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="glow-circle"></div>

        <div className="code-card">
          <div className="code-header">
            <div className="window-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>developer.js</p>
          </div>

          <div className="code-body">
            <p><span className="purple">const</span> developer = {'{'}</p>
            <p className="indent">
              name: <span className="green">'Ankit Sharma'</span>,
            </p>
            <p className="indent">
              role: <span className="green">'Full Stack Developer'</span>,
            </p>
            <p className="indent">
              skills: [
            </p>
            <p className="indent2">
              <span className="orange">'React'</span>,
              <span className="orange"> 'Node.js'</span>,
            </p>
            <p className="indent2">
              <span className="orange">'MongoDB'</span>
            </p>
            <p className="indent">],</p>
            <p className="indent">
              learning: <span className="green">true</span>
            </p>
            <p>{'}'};</p>
            <p className="code-comment">
              // Always building something new.
            </p>
          </div>
        </div>

        <div className="floating-tag tag-top">
          <span>✳</span> Clean Code
        </div>

        <div className="floating-tag tag-bottom">
          <span>↗</span> Always Learning
        </div>
      </div>
    </section>
  );
}

export default Home;
