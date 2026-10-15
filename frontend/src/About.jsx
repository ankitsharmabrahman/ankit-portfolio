
import './css/about.css';

function About() {
  const skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'Git & GitHub',
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* Heading */}
        <div className="about-heading">
          <p className="about-label">GET TO KNOW ME</p>
          <h2>About <span>Me</span></h2>
          <p className="about-subtitle">
            A little about my journey and what I love building.
          </p>
        </div>

        {/* About content */}
        <div className="about-content">

          <div className="about-text">
            <p className="about-greeting">
              Hello, I'm Ankit 👋
            </p>

            <h3>
              Aspiring Full Stack
              <span> Developer</span>
            </h3>

            <p className="about-description">
              I am an MCA graduate who enjoys creating modern and
              responsive web applications. I like learning new
              technologies and turning ideas into useful projects.
            </p>

            <p className="about-description">
              I am currently improving my skills in React, JavaScript,
              Node.js and databases. My goal is to build applications
              that are simple, useful and easy to use.
            </p>

            <div className="about-buttons">
              <a href="#contact" className="about-btn">
                Let's Connect <span>↗</span>
              </a>

              <a
                href="#skills"
                className="about-btn outline-btn"
              >
                Explore Skills
              </a>
            </div>
          </div>

          {/* Profile card */}
          <div className="about-visual">
            <div className="profile-card">
              <div className="profile-icon">{'</>'}</div>

              <h3>Ankit Sharma</h3>
              <p>Full Stack Developer</p>

              <div className="profile-divider"></div>

              <div className="profile-info">
                <span>Education</span>
                <strong>MCA, Computer Science</strong>
              </div>

              <div className="profile-info">
                <span>Focus</span>
                <strong>Web Development</strong>
              </div>

              <div className="profile-info">
                <span>Mindset</span>
                <strong>Learn. Build. Improve.</strong>
              </div>

              <div className="profile-glow"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats">
          <div className="stat-card">
            <h3>2025</h3>
            <p>MCA Graduate</p>
          </div>

          <div className="stat-card">
            <h3>9+</h3>
            <p>Technical Skills</p>
          </div>

          <div className="stat-card">
            <h3>100%</h3>
            <p>Learning Mindset</p>
          </div>
        </div>

        {/* Skills */}
        <div className="skills-section" id="skills">
          <p className="about-label">WHAT I WORK WITH</p>
          <h2>My <span>Skills</span></h2>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div
                className="skill-card"
                key={skill}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="skill-symbol">✦</span>
                {skill}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
