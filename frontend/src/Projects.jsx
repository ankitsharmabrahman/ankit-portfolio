
import './css/projects.css';

function Projects() {
  const projects = [
    {
      number: '01',
      title: 'Food Delivery Web Application',
      category: 'Full Stack Development',
      description:
        'A food delivery application where users can view food items, manage their selections, and interact with the backend. I worked on connecting the frontend, Express APIs and MySQL database.',
      tech: ['JavaScript', 'Node.js', 'Express.js', 'MySQL'],
      github: 'https://github.com/ankitsharmabrahman/food-delivery--app',
    },
    {
      number: '02',
      title: 'Student Record Manager',
      category: 'Frontend Development',
      description:
        'A React application for managing student records. Users can add new student details, view the records, and delete students. It helped me practise React state and array methods.',
      tech: ['React', 'JavaScript', 'CSS'],
      github: 'https://github.com/',
    },
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        <div className="projects-heading">
          <p className="projects-label">MY WORK</p>
          <h2>Featured <span>Projects</span></h2>
          <p>
            Some projects I have built while learning and improving
            my development skills.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>

              <div className="project-top">
                <span className="project-number">
                  {project.number}
                </span>

                <a
                  className="project-github"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  ↗
                </a>
              </div>

              <p className="project-category">
                {project.category}
              </p>

              <h3>{project.title}</h3>

              <p className="project-description">
                {project.description}
              </p>

              <div className="project-tech">
                {project.tech.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>

              <a
                className="project-link"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                View Source Code <span>↗</span>
              </a>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Projects;
