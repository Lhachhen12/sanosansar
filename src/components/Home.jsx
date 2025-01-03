// src/components/Home.js
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Profile from "../Assets/photo1.png";

const Home = () => {
  const projects = [
    {
      id: 1,

      title: "Project 1",
      description:
        "A brief description of the first project and its key features.",
    },
    {
      id: 2,

      title: "Project 2",
      description:
        "A brief description of the second project and its key features.",
    },
    {
      id: 3,

      title: "Project 3",
      description:
        "A brief description of the third project and its key features.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 text-center">
        <img
          src={Profile}
          alt="Profile picture of Lhachhen Wanjyu Lama"
          className="rounded-full mx-auto mb-6"
          width={150}
          height={150}
        />
        <h1 className="text-4xl font-bold mb-4">Lhachhen Wanjyu Lama</h1>
        <p className="text-xl text-gray-500 mb-8">Web Developer & Designer</p>
        <a
          href="#contact"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get in Touch
        </a>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          <p className="text-lg text-gray-700">
            I'm a passionate web developer with a keen eye for design. With 1
            year of experience in creating responsive and user-friendly
            websites, I strive to build applications that not only look great
            but also provide an excellent user experience.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Tailwind CSS",
              "GraphQL",
              "MongoDB",
              "AWS",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-gray-300 text-gray-800 text-lg py-1 px-3 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-6 bg-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-5">{project.description}</p>
                  <a
                    href={`#project-${project.id}`}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 inline-block"
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
      <section id="contact" className="py-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-8">
            I'm always open to new opportunities and collaborations. Feel free
            to reach out!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:your.email@example.com"
              aria-label="Email"
              className="bg-gray-300 text-gray-800 p-3 rounded-full hover:bg-gray-400 transition duration-300"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="bg-gray-300 text-gray-800 p-3 rounded-full hover:bg-gray-400 transition duration-300"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="bg-gray-300 text-gray-800 p-3 rounded-full hover:bg-gray-400 transition duration-300"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
