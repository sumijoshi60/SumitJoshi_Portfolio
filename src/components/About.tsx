import React from 'react';
import { FileDownIcon } from 'lucide-react';

export const About = () => {
  return <section id="about" className="py-16 bg-stone-100">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
          About Me
        </h2>
        <div className="prose prose-stone lg:prose-lg max-w-none">
          <p className="font-medium text-stone-800">
            Dedicated Information Technology student with expertise in cloud computing, cloud security and cybersecurity.
          </p>
          <p>
            I am a final year BIM student eager to gain real-world experience in the field of Cloud Computing and
            Cybersecurity. Currently completing the AWS Cloud Practitioner Essentials and the Google Cybersecurity
            Professional Certificate gaining hands-on exposure to cloud services, security fundamentals, monitoring, and
            incident response. I am interested in developing my skills as a Cloud Engineer, supporting cloud infrastructure,
            security best practices, and CI/CD environments in AWS-based systems.
          </p>

          {/* Resume download button */}
          <div className="mt-6">
            <a
              href="/assets/pdf/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md transition-colors duration-300"
            >
              <FileDownIcon size={18} className="mr-2" />
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center">
            <div className="text-lg font-medium text-stone-800 sm:mr-4">
              My Approach:
            </div>
            <div className="mt-2 sm:mt-0 px-4 py-2 bg-indigo-900/10 border-l-4 border-indigo-900 text-stone-700 italic">
              "Cloud security is not just about tools and configurations, but about understanding systems, anticipating risk, and using evidence-driven practices to build secure and resilient cloud environments."
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
};
