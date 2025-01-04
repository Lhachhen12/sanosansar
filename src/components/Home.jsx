import React, { useEffect, useContext } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Profile from "../Assets/photo1.png";
import { ThemeContext } from "../context/ThemeContext";
import AnimatedProfileRing from "./AnimatedProfileRing";

const ParticleBackground = ({ isDark }) => {
  useEffect(() => {
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particleColor = isDark
        ? "rgba(156, 163, 175, 0.5)"
        : "rgba(66, 153, 225, 0.5)";
      const lineColor = isDark
        ? "rgba(156, 163, 175, 0.1)"
        : "rgba(66, 153, 225, 0.1)";

      ctx.fillStyle = particleColor;
      ctx.strokeStyle = lineColor;

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
            }
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      id="particle-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const projects = [
    {
      id: 1,
      title: "Frontend Developer",
      description:
        "As a Frontend Developer, I built and optimized responsive web applications. I worked with technologies like HTML, CSS, JavaScript, React, and Vue.js to create user-friendly interfaces and enhance user experience. Key features of this project include implementing smooth navigation, ensuring cross-browser compatibility, and optimizing performance for faster load times.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
      achievements: [
        "Improved page load times by 30% through code optimization.",
        "Developed mobile-first, responsive layouts.",
        "Collaborated with UI/UX designers to refine user interfaces.",
      ],
    },
    {
      id: 2,
      title: "Quality Assurance (QA) Engineer",
      description:
        "In my role as a QA Engineer, I was responsible for identifying bugs and ensuring that the product met high-quality standards. I wrote and executed test cases, automated tests, and participated in regression testing to guarantee a bug-free experience for the end users. I also worked closely with developers to reproduce issues and suggest improvements.",
      technologies: ["Selenium", "Jest", "Mocha", "JIRA"],
      achievements: [
        "Reduced critical bugs by 40% by improving test case coverage.",
        "Automated repetitive testing tasks, reducing manual testing time by 50%.",
        "Played a key role in ensuring the successful launch of multiple products.",
      ],
    },
    {
      id: 3,
      title: "UI/UX Designer",
      description:
        "As a UI/UX Designer, I focused on creating aesthetically pleasing and functional user interfaces while ensuring an intuitive user experience. I collaborated with stakeholders to define the project's visual style, created wireframes and prototypes, and conducted user testing to iterate on designs and improve usability. I used tools like Figma, Sketch, and Adobe XD to bring designs to life.",
      tools: ["Figma", "Sketch", "Adobe XD", "InVision"],
      achievements: [
        "Designed an interface that improved user engagement by 20%.",
        "Conducted usability testing that led to a 15% improvement in task completion rates.",
        "Worked with cross-functional teams to align design with business goals.",
      ],
    },
  ];

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Lhachhenwangjyulama-CV.pdf";
    link.download = "LhachhenWanjyuLama-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`relative min-h-screen ${
        isDark
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900"
      }`}
    >
      <ParticleBackground isDark={isDark} />

      <section className="relative py-20 px-4 md:px-6 text-center">
        <div className="mx-auto mb-6 flex justify-center">
          <AnimatedProfileRing
            imageSrc={Profile}
            imageAlt="Profile picture of Lhachhen Wanjyu Lama"
          />
        </div>
        <h1
          className={`text-5xl font-bold mb-4 ${
            isDark ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Lhachhen Wanjyu Lama
        </h1>
        <p
          className={`text-2xl mb-8 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Web Developer & Designer
        </p>
        <button
          onClick={handleDownloadCV}
          className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Download CV
        </button>
      </section>

      {/* About Me Section */}
      <section
        className={`relative py-20 px-4 md:px-6 ${
          isDark
            ? "bg-gray-800/80 backdrop-blur-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-8 text-center ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            About Me
          </h2>
          <p
            className={`text-xl leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            I'm a passionate web developer with a keen eye for design. With 1
            year of experience in creating responsive and user-friendly
            websites, I strive to build applications that not only look great
            but also provide an excellent user experience.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-8 text-center ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "React",
              "Next.js",
              "Figma",
              "Node.js",
              "Tailwind CSS",
              "GraphQL",
            ].map((skill) => (
              <span
                key={skill}
                className={`text-lg py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    : "bg-white text-gray-800 hover:bg-gray-50"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        className={`relative py-20 px-4 md:px-6 ${
          isDark
            ? "bg-gray-800/80 backdrop-blur-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl font-bold mb-12 text-center ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`shadow-xl rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 ${
                  isDark ? "bg-gray-700" : "bg-white"
                }`}
              >
                <div className="p-8">
                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      isDark ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-6 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>
                  <a
                    href={`#project-${project.id}`}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 inline-block"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-4xl font-bold mb-8 ${
              isDark ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Get in Touch
          </h2>
          <p
            className={`text-xl mb-12 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            I'm always open to new opportunities and collaborations. Feel free
            to reach out!
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:shreejanlama608@gmail.com"
              aria-label="Email"
              className={`p-4 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white hover:ring-4 hover:ring-red-400"
                  : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white hover:ring-4 hover:ring-red-200"
              }`}
            >
              <Mail className="h-8 w-8" />
            </a>
            <a
              href="https://github.com/Lhachhen12"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`p-4 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white hover:ring-4 hover:ring-gray-500"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-800 hover:text-white hover:ring-4 hover:ring-gray-400"
              }`}
            >
              <Github className="h-8 w-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/lhachhen-lama/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-4 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white hover:ring-4 hover:ring-blue-400"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white hover:ring-4 hover:ring-blue-200"
              }`}
            >
              <Linkedin className="h-8 w-8" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
