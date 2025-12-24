import React from 'react';
import { BrainIcon, MicroscopeIcon, WrenchIcon, UserIcon, GlobeIcon } from 'lucide-react';

export const Skills = () => {
  const skills = [{
    category: '🧠 Core Skills',
    icon: <BrainIcon size={24} className="text-red-700" />,
    items: ['Cloud computing (AWS fundamentals)', 'Cybersecurity & security principles', 'IAM & access control basics', 'Networking & Linux fundamentals', 'Cloud monitoring & security auditing basics']
  },
  /* 
  {
    category: '🔬 Research & Evaluation',
    icon: <MicroscopeIcon size={24} className="text-red-700" />,
    items: ['Survey Design', 'Interview Protocols', 'Thematic Analysis', 'Participatory Methods', 'Literature Reviews', 'Monitoring & Evaluation (M&E) Basics', 'Data Cleaning', 'Ethics in Research', 'Stakeholder Feedback Loops']
  },
  */
  {
    category: '🛠️ Tools & Platforms',
    icon: <WrenchIcon size={24} className="text-red-700" />,
    items: ['Microsoft Office Suite', 'Google Workspace', 'Canva', 'Microsoft Teams', 'Visual Studio Code']
  }, {
    category: '🤝 Soft Skills',
    icon: <UserIcon size={24} className="text-red-700" />,
    items: ['Communication', 'Collaboration', 'Adaptability', 'Problem-Solving', 'Time Management', 'Attention to Detail', 'Cultural Sensitivity', 'Multi-stakeholder Coordination', 'Event Facilitation']
  }, {
    category: 'Languages',
    icon: <GlobeIcon size={24} className="text-red-700" />,
    items: ['English', 'Hindi', 'Nepali(Native)']
  }];

  return <section id="skills" className="py-16">
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
          Skills
        </h2>
        <p className="text-sm text-stone-500">Skills & Tools</p>
      </div>

      {/* Horizontal scrolling wrapper for small screens */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex flex-nowrap gap-4 min-w-max md:min-w-0 md:flex-wrap">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300 min-w-[300px] md:min-w-0 md:flex-1"
            >
              <div className="flex items-center mb-4">
                {skill.icon}
                <h3 className="text-lg text-stone-800 ml-2 font-medium">
                  {skill.category}
                </h3>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-red-700/80 rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-stone-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Visual hint for horizontal scrolling on mobile */}
      <div className="md:hidden mt-4 text-center">
        <p className="text-xs text-stone-500">← Swipe to see more →</p>
      </div>
    </div>
  </section>;
};