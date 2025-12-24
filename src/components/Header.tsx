import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, FileTextIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle scroll to section when clicking an anchor link
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();

    if (path.startsWith('#')) {
      // If on homepage, scroll to section
      if (isHomePage) {
        const element = document.getElementById(path.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If not on homepage, navigate to homepage and then scroll
        navigate('/');
        // Set a timeout to allow the page to load before scrolling
        setTimeout(() => {
          const element = document.getElementById(path.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (path === '/projects') {
      // For Projects page, navigate and scroll to top
      navigate(path);
      window.scrollTo(0, 0);
    } else if (path.startsWith('/assets/')) {
      // For PDF links, open in new tab
      window.open(path, '_blank');
    } else {
      // Regular navigation
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  // Scroll to top when navigating to a new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Navigation items with path and label
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '#about' },
    { label: 'Skills', path: '#skills' },
    { label: 'Projects', path: '/projects' },
    { label: 'Resume', path: '/assets/pdf/CV.pdf', icon: <FileTextIcon size={16} className="ml-1" /> },
    { label: 'Contact', path: '#contact' }
  ];

  return <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="flex items-center" onClick={(e) => handleNavigation(e, '/')}>
          <div className="h-10 w-10 bg-[#4A6741] rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-lg font-light">SJ</span>
          </div>
          <h1 className="text-xl text-stone-800">Sumit Joshi</h1>
        </Link>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        {navItems.map(item => (
          <a
            key={item.label}
            href={item.path}
            onClick={(e) => handleNavigation(e, item.path)}
            className="text-stone-600 hover:text-[#4A6741] transition-colors duration-300 flex items-center"
          >
            {item.label}
            {item.icon && item.icon}
          </a>
        ))}
      </nav>
      {/* Mobile Menu Button */}
      <button className="md:hidden text-stone-700" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
        {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>
    </div>
    {/* Mobile Navigation */}
    {isMenuOpen && <div className="md:hidden bg-stone-50 border-t border-stone-200">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-4">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.path}
              className="text-stone-600 hover:text-[#4A6741] transition-colors duration-300 py-2 flex items-center"
              onClick={(e) => handleNavigation(e, item.path)}
            >
              {item.label}
              {item.icon && item.icon}
            </a>
          ))}
        </nav>
      </div>
    </div>}
  </header>;
};
