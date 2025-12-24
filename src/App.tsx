import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HomePage, ProjectsPage, NotFoundPage, UncertaintyAtlasPage, SDGsPage } from './pages';

// Component to handle GitHub Pages SPA redirect
const GitHubPagesSPARedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location object to preserve hash

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('p');
    const query = params.get('q');

    if (path) {
      // Reconstruct the full path with query string if it exists
      const fullPath = path + (query ? `?${query}` : '') + location.hash;
      
      // Create a new URLSearchParams object to clean up the URL displayed in the browser
      // We don't want to show ?p=/projects&q=... after redirecting.
      const newSearch = new URLSearchParams(location.search);
      newSearch.delete('p');
      newSearch.delete('q');
      
      // Perform the client-side navigation
      // replace: true prevents the redirect URL from being added to browser history
      navigate(fullPath, { replace: true });
    }
  }, [navigate, location.hash]); // Rerun if hash changes, though primarily runs on mount

  return null; // This component does not render anything visible
};

export function App() {
  return (
    <Router>
      <GitHubPagesSPARedirectHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/uncertainty-atlas" element={<UncertaintyAtlasPage />} />
        <Route path="/sdgs" element={<SDGsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
