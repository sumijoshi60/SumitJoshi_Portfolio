import React, { useState, useMemo } from 'react';
import { ExternalLinkIcon, ArrowLeftIcon, FilterIcon, CalendarIcon, TagIcon } from 'lucide-react';

// Define project type
interface Project {
  title: string;
  description: string;
  fullDescription?: string[];
  image: string;
  tags: string[];
  link?: string;
  year: number; // Add year for filtering
}

// ProjectDetail component for showing detailed project information
const ProjectDetail = ({
  project,
  onBack
}: {
  project: Project;
  onBack: () => void
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
      <button
        onClick={onBack}
        className="flex items-center text-stone-600 hover:text-stone-800 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" /> Back to projects
      </button>

      <h2 className="text-2xl text-stone-800 mb-4 font-medium">{project.title}</h2>
      <p className="text-stone-600 mb-6">{project.description}</p>

      {project.fullDescription && (
        <div className="mb-6">
          {project.fullDescription.map((paragraph: string, idx: number) => (
            <p key={idx} className="text-stone-600 mb-3">{paragraph}</p>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag: string, idx: number) => (
          <span key={idx} className="px-3 py-1 bg-indigo-900/10 text-indigo-900 text-sm rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-900 hover:text-indigo-700"
        >
          Visit Project <ExternalLinkIcon size={16} className="ml-1" />
        </a>
      )}
    </div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeYears, setActiveYears] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projects: Project[] = [
    {
      title: 'GiveHeartedly: A Charity Fundraising Platform',
      description: 'Website developed to connect donors with fundraisers and charities',
      fullDescription: [
        'Developed a fundraising platform for BIM Project as per the requirements set by the Tribhuvan University.',
        'GiveHHeartedly is a fundraising platform that streamlines the process of fundraising and donations.',
        'Used React and CSS to develop the frontend, Node.js and Express.js to develop the backend and MongoDB to store the data.',
      ],
      image: 'https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Fundraising', 'Donations', 'Web-Development', 'Summer Project'],
      link: 'https://github.com/sumijoshi60/GiveHeartedly',
      year: 2025
    },
    {
      title: 'BikriBagaicha',
      description: 'Mobile application developed to connect farmers directly with vendors',
      fullDescription: [
        'Developed BikriBagaicha in SXC SANDBOX 2.0 - A 48- HOUR HACKATHON organized by St. Xavier’s College.',
        'BikriBagaicha is a platform that streamlines the process of connecting farmers with vendors without entertaining the greedy middlemen.',
        'Used React-Native and CSS to develop the frontend, Node.js and Express.js to develop the backend and MongoDB to store the data.',
        'Our team of four were selected as the second runner-up in the hackathon.',
      ],
      image: 'https://images.unsplash.com/photo-1582213782179-e0d4d3cce817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Hackathon', 'Second runner-up', 'React-Native App'],
      link: 'https://github.com/sumijoshi60/Bikri-Bagaicha',
      year: 2025
    },
    /* {
       title: 'GEC II STEM Program Evaluation',
       description: 'Research Consultant for Foundation for Development Management - Effectiveness Evaluation in Nepal (2024)',
       fullDescription: [
         'Led the effectiveness evaluation of the Girls Education Challenge II STEM program implementation in Nepal.',
         'Designed and implemented mixed-methods research protocols to assess program outcomes and impact.',
         'Analyzed educational outcomes and provided evidence-based recommendations for program optimization.'
       ],
       image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Education', 'STEM', 'Program Evaluation', 'Nepal'],
       year: 2024
     },
     {
       title: 'Child Marriage and Social Protection',
       description: 'Research Assistant for STAAR Facility - Roadmap for Social Protection to Tackle Child Marriage in Nepal (2024)',
       fullDescription: [
         'Developed a comprehensive roadmap for leveraging social protection systems to reduce child marriage rates in Nepal.',
         'Conducted literature review and stakeholder interviews to identify best practices and implementation gaps.',
         'Contributed to policy recommendations that align with Nepal\'s socio-economic context and institutional frameworks.'
       ],
       image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Child Protection', 'Social Policy', 'Research', 'Nepal'],
       year: 2024
     },
     {
       title: 'Gender Equality and Social Inclusion Training Manual',
       description: 'Literature Review Support for ICIMOD Quinquennial Review (2024)',
       fullDescription: [
         'Supported the development of a comprehensive Gender Equality and Social Inclusion (GESI) training manual for The International Centre for Integrated Mountain Development.',
         'Conducted extensive literature review on GESI principles and best practices in mountain development contexts.',
         'Contributed to instructional design and content development for various training modules focusing on inclusion strategies.'
       ],
       image: 'https://images.unsplash.com/photo-1526750635936-ee3e908c36cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Gender Equality', 'Training Development', 'Mountain Development', 'ICIMOD'],
       year: 2024
     },
     {
       title: 'Gender Equality and Social Inclusion Diagnostic',
       description: 'Research Assistant for Asian Development Bank - GESI Diagnostic of Selected Sectors in Nepal (2024)',
       fullDescription: [
         'Conducted sector-specific gender equality and social inclusion diagnostics across key development sectors in Nepal.',
         'Analyzed institutional frameworks, policies, and implementation practices through a GESI lens.',
         'Developed evidence-based recommendations to enhance GESI integration in ADB operations and country-level interventions.'
       ],
       image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Gender Analysis', 'Sector Diagnostics', 'Nepal', 'Asian Development Bank'],
       year: 2024
     },
     {
       title: 'We Deserve Better: Social Protection for Women and Girls',
       description: 'Field Research Assistant for UNICEF - Survey Implementation (2024)',
       fullDescription: [
         'Supported the design and implementation of a comprehensive survey examining social protection systems and their effectiveness for women and girls.',
         'Conducted field interviews and focus group discussions with diverse stakeholders including beneficiaries and service providers.',
         'Contributed to data analysis and insight generation to strengthen gender-responsive social protection programs.'
       ],
       image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Social Protection', 'UNICEF', 'Field Research', 'Gender'],
       year: 2024
     },
     {
       title: 'Synergy',
       description: 'Personal Blog exploring the intersection of development, technology, and culture (2024)',
       fullDescription: [
         'Created and maintained a personal blog focusing on the synergies between international development, technology innovation, and cultural contexts.',
         'Published articles on topics including digital inclusion, human-centered design, and evidence-based policymaking.',
         'Fostered meaningful discussions through community engagement and collaborative content creation.'
       ],
       image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Blog', 'International Development', 'Technology', 'Culture'],
       link: 'https://synergy-blog.com',
       year: 2024
     },
     {
       title: 'Safe Schools Common Approach Evidence Synthesis',
       description: 'Data Analysis & Evaluation Consultant for Save the Children (2022/2023)',
       fullDescription: [
         'Led the synthesis and analysis of evidence related to Save the Children\'s Safe Schools Common Approach implementation across multiple countries.',
         'Developed evaluation frameworks and methodologies to assess program effectiveness and impact.',
         'Produced actionable insights and recommendations to strengthen school safety initiatives and child protection systems.'
       ],
       image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Education', 'Child Protection', 'Program Evaluation', 'Save the Children'],
       year: 2022
     },
     {
       title: 'Conceptualising Circular, Serial and Stepwise migrations from the Global South',
       description: 'University Research Assistant for Norwegian University of Science and Technology (2021)',
       fullDescription: [
         'Assisted in research examining patterns of migration from the Global South, focusing on circular, serial, and stepwise migration processes.',
         'Conducted literature reviews and data collection to support conceptual framework development.',
         'Contributed to analysis of migration pathways and their socioeconomic impacts on sending and receiving countries.'
       ],
       image: 'https://images.unsplash.com/photo-1526399232581-2ab5608b6336?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Migration Research', 'Global South', 'Academic Research', 'Norway'],
       year: 2021
     },
     {
       title: 'Baseline & Endline Survey on SRH and Menstrual Health',
       description: 'Research Assistant for German Development Cooperation in Bidur, Nuwakot (2019)',
       fullDescription: [
         'Conducted baseline and endline surveys to assess knowledge and behaviors related to sexual reproductive health and menstrual health in Bidur, Nuwakot.',
         'Designed survey instruments and implemented data collection protocols with sensitivity to local cultural contexts.',
         'Analyzed survey results to evaluate program impact and provide recommendations for future interventions.'
       ],
       image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Sexual Reproductive Health', 'Menstrual Health', 'Survey Research', 'Nepal'],
       year: 2019
     },
     {
       title: 'Tracer Study of Skill Test Graduates',
       description: 'Research Co-lead for Swiss Contact - NSTB Certified Graduates (2018)',
       fullDescription: [
         'Co-led a comprehensive tracer study to track and evaluate outcomes of skill test graduates certified by the National Skill Testing Board (NSTB) in Nepal.',
         'Designed research methodology to assess employment rates, skill utilization, and socioeconomic impacts of certification.',
         'Analyzed findings to provide evidence-based recommendations for skill development programs and certification systems.'
       ],
       image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Vocational Training', 'Skills Development', 'Employment Research', 'Nepal'],
       year: 2018
     },
     {
       title: 'Strengthening Urban Resilience and Engagement',
       description: 'Research Assistant for British Red Cross (2018)',
       fullDescription: [
         'Supported research initiatives focused on strengthening urban resilience and community engagement in disaster preparedness.',
         'Conducted field research and stakeholder consultations to identify vulnerabilities and capacity building opportunities.',
         'Contributed to developing frameworks for community-based disaster risk reduction in urban contexts.'
       ],
       image: 'https://images.unsplash.com/photo-1523803326055-13179f9c7e74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
       tags: ['Urban Resilience', 'Disaster Preparedness', 'Community Engagement', 'Red Cross'],
       year: 2018
     }
     */
  ];

  // Group projects by year
  const projectsByYear = useMemo(() => {
    const grouped = new Map<number, Project[]>();

    projects.forEach(project => {
      if (!grouped.has(project.year)) {
        grouped.set(project.year, []);
      }
      grouped.get(project.year)?.push(project);
    });

    // Sort years in descending order
    return new Map([...grouped.entries()].sort((a, b) => b[0] - a[0]));
  }, [projects]);

  // Get unique years for filtering
  const years = useMemo(() => {
    return Array.from(projectsByYear.keys()).sort((a, b) => b - a);
  }, [projectsByYear]);

  // Get all unique tags for filtering
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  // Filter projects based on search query, active years, and selected tags
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by active years
    if (activeYears.length > 0) {
      filtered = filtered.filter(project => activeYears.includes(project.year));
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.some(tag => project.tags.includes(tag))
      );
    }

    return filtered;
  }, [projects, searchQuery, activeYears, selectedTags]);

  // If a project is selected, show its detail page
  if (selectedProject !== null) {
    return (
      <section id="projects" className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <ProjectDetail
            project={projects[selectedProject]}
            onBack={() => setSelectedProject(null)}
          />
        </div>
      </section>
    );
  }

  // Toggle year selection
  const toggleYear = (year: number) => {
    setActiveYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <section id="projects" className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            Projects
          </h2>
        </div>

        {/* Search and filter controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700/50 focus:border-red-700"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <CalendarIcon size={18} className="text-stone-500 mr-2" />
                <span className="text-sm text-stone-500 mr-2">Filter by year:</span>
              </div>
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => toggleYear(year)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${activeYears.includes(year)
                    ? "bg-red-700 text-white"
                    : "bg-white text-stone-700 hover:bg-stone-100"
                    }`}
                >
                  {year}
                </button>
              ))}
              {activeYears.length > 0 && (
                <button
                  onClick={() => setActiveYears([])}
                  className="px-3 py-1 text-xs rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <TagIcon size={18} className="text-stone-500 mr-2" />
              <span className="text-sm text-stone-500">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${selectedTags.includes(tag)
                    ? "bg-indigo-900 text-white"
                    : "bg-indigo-900/10 text-indigo-900 hover:bg-indigo-900/20"
                    }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-3 py-1 text-xs rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Project count */}
        <p className="text-sm text-stone-500 mb-6">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {/* Projects list */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-8">
            {Array.from(projectsByYear.entries()).map(([year, yearProjects]) => {
              // Filter projects in this year based on active filters
              const filteredYearProjects = yearProjects.filter(project =>
                filteredProjects.some(p => p.title === project.title)
              );

              // Skip years with no matching projects
              if (filteredYearProjects.length === 0) return null;

              return (
                <div key={year} className="mb-12">
                  <div className="flex items-center mb-6">
                    <h3 className="text-2xl font-medium text-stone-800">{year}</h3>
                    <div className="ml-4 h-px bg-red-700/30 flex-grow"></div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredYearProjects.map((project, index) => {
                      const originalIndex = projects.findIndex(p => p.title === project.title);
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                        >
                          <div className="p-6 flex flex-col h-full">
                            <h4 className="text-xl font-medium text-stone-800 mb-3">{project.title}</h4>
                            <p className="text-stone-600 mb-4 flex-grow">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-indigo-900/10 text-indigo-900 text-xs rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <button
                              onClick={() => setSelectedProject(originalIndex)}
                              className="inline-flex items-center text-indigo-900 hover:text-indigo-700 mt-auto"
                            >
                              View Details <ExternalLinkIcon size={16} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-600">No projects found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveYears([]);
                setSelectedTags([]);
              }}
              className="mt-4 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};