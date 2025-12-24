import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon, MapPinIcon, PhoneIcon, MailIcon, ExternalLinkIcon } from 'lucide-react';
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Skills',
    href: '#skills'
  }, {
    name: 'Projects',
    href: '/projects'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  const services = [{
    name: 'Cloud Security Audit',
  }, {
    name: 'Cybersecurity Analysis',
  }, {

  }];
  return <footer className="bg-stone-800 text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* About Column */}
        <div>
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-red-700 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">SJ</span>
            </div>
            <h2 className="text-xl">Sumit Joshi</h2>
          </div>
          <p className="text-stone-400 mb-4">
            Cloud Security Enthusiast
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/sumijoshi60" className="text-stone-400 hover:text-white transition-colors" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            {/* <a href="https://twitter.com/hritikajoshi" className="text-stone-400 hover:text-white transition-colors" aria-label="Twitter">
              <TwitterIcon size={20} />
            </a> */}
            <a href="https://www.linkedin.com/in/sumijoshi60" className="text-stone-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href="https://www.instagram.com/sumi_joshi617/" className="text-stone-400 hover:text-white transition-colors" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>
        {/* Quick Links Column */}
        <div>
          <h3 className="text-lg mb-4 border-b border-stone-700 pb-2">
            Quick Links
          </h3>
          <nav>
            <ul className="space-y-2">
              {quickLinks.map(link => <li key={link.name}>
                <a href={link.href} className="text-stone-400 hover:text-white transition-colors flex items-center group">
                  {link.name}
                  <ExternalLinkIcon size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>)}
            </ul>
          </nav>
        </div>
        {/* Services Column */}
        <div>
          <h3 className="text-lg mb-4 border-b border-stone-700 pb-2">
            Services
          </h3>
          <ul className="space-y-2">
            {services.map(service => <li key={service.name} className="text-stone-400">
              {service.name}
            </li>)}
          </ul>
        </div>
        {/* Contact Column */}
        <div>
          <h3 className="text-lg mb-4 border-b border-stone-700 pb-2">
            Contact
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start text-stone-400">
              <MapPinIcon size={20} className="mr-2 mt-1 text-red-700" />
              <div>
                Kathmandu, Nepal
              </div>
            </li>
            <li className="flex items-start text-stone-400">
              <PhoneIcon size={20} className="mr-2 mt-1 text-red-700" />
              <div>
                +977 9840875038
              </div>
            </li>
            <li className="flex items-start text-stone-400">
              <MailIcon size={20} className="mr-2 mt-1 text-red-700" />
              <div>
                sumijoshi60@gmail.com
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="border-t border-stone-700 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-stone-400 text-sm">
          <p>© {currentYear} Sumit Joshi. All rights reserved.</p>
          <p>Developed in Kathmandu 🧚</p>
        </div>
      </div>
    </div>
  </footer>;
};