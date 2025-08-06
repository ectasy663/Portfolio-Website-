import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import gsap from 'gsap';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Set initial states
    gsap.set([titleRef.current, contentRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate elements
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to backend or email service)
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "namansingh4680@gmail.com",
      href: "mailto:namansingh4680@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/naman-singh-panwar7/",
      href: "https://www.linkedin.com/in/naman-singh-panwar7/"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "/ectasy663",
      href: "https://github.com/ectasy663"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-gray-100 dark:bg-slate-950">
      <div className="container">
        <h2 ref={titleRef} className="text-display-lg font-display text-center mb-16 gradient-text leading-tight py-2">
          Let's Build Something Amazing
        </h2>

        <div ref={contentRef} className="max-w-6xl mx-auto">
          {/* Intro text */}
          <div className="text-center mb-16">
            <p className="text-body-lg text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
              Feel free to reach out and let's create something extraordinary together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-heading-md font-heading mb-6 text-gray-900 dark:text-white">Get In Touch</h3>
                <p className="text-body-md text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Whether you have a project in mind, want to collaborate, or just want to say hello,
                  I'd love to hear from you. Let's discuss how we can work together.
                </p>
              </div>

              {/* Contact methods */}
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/90 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-400 transition-all duration-300 group shadow-lg dark:shadow-xl backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60 transition-colors duration-300">
                      <contact.icon className="w-6 h-6 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{contact.label}</p>
                      <p className="text-gray-900 dark:text-white font-medium">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick stats */}
              <div className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-xl border border-gray-300/50 dark:border-primary-500/20 shadow-md dark:shadow-none">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">Response Time</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">&lt; 24h</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Email Response</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">100%</div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Reply Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 dark:bg-slate-800/80 p-8 rounded-xl border border-gray-300/50 dark:border-primary-500/20 shadow-md dark:shadow-none">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-200">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-600 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-600 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-600 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-600 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
          <p className="text-gray-700 dark:text-gray-400">
            © 2025 Naman Singh Panwar. Built with React, TypeScript, and GSAP.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
