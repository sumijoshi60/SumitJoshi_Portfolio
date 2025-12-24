import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import clsx from 'clsx';

interface SDGData {
  'S.N.': string;
  Title: string;
  'Author(s)': string;
  Year: string;
  'Source / Publisher': string;
  'Region or Country Focus': string;
  Type: string;
  'SDG Target(s)': string;
  Summary: string;
  'Link (URL)': string;
}

const cleanRegion = (region: string): string => {
  if (!region) return '';
  const s = region.toLowerCase();

  if (s.startsWith('global')) return 'Global';
  if (s.startsWith('multi-country')) return 'Multi-country';
  if (s.startsWith('oecd')) return 'OECD';
  if (s.includes('south africa')) return 'South Africa';
  if (s.startsWith('africa')) return 'Africa';
  
  return region.split('(')[0].trim();
};

const typeColorMap: { [key: string]: string } = {
    'Report': 'bg-blue-100 text-blue-800',
    'Policy Paper': 'bg-green-100 text-green-800',
    'Briefing/ Policy Paper': 'bg-indigo-100 text-indigo-800',
    'Analysis / Blog': 'bg-purple-100 text-purple-800',
    'Index / Report': 'bg-pink-100 text-pink-800',
    'Index Report': 'bg-pink-100 text-pink-800',
    'Academic Paper': 'bg-yellow-100 text-yellow-800',
    'Blog Post': 'bg-purple-100 text-purple-800',
    'Policy Brief': 'bg-green-100 text-green-800',
    'Policy Research Paper': 'bg-green-100 text-green-800',
    'Report (A selection of case studies)': 'bg-blue-100 text-blue-800',
    'default': 'bg-gray-100 text-gray-800',
};

const SDGsPage: React.FC = () => {
  const [data, setData] = useState<SDGData[]>([]);
  const [filteredData, setFilteredData] = useState<SDGData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const uniqueYears = useMemo(() => [...new Set(data.map(item => item.Year))].sort((a, b) => b.localeCompare(a)), [data]);
  const uniqueRegions = useMemo(() => {
    const allRegionOptions = new Set<string>();

    data.forEach(item => {
        const regionString = item['Region or Country Focus'];
        if (!regionString) return;

        // Add broad categories based on keywords
        if (regionString.toLowerCase().includes('global')) allRegionOptions.add('Global');
        if (regionString.toLowerCase().includes('multi-country')) allRegionOptions.add('Multi-country');
        if (regionString.toLowerCase().includes('africa')) allRegionOptions.add('Africa');
        if (regionString.toLowerCase().includes('oecd')) allRegionOptions.add('OECD');
        if (regionString.toLowerCase().includes('latin america')) allRegionOptions.add('Latin America');
        if (regionString.toLowerCase().includes('fragile & conflict-affected states')) allRegionOptions.add('Fragile & conflict-affected states');
        if (regionString.toLowerCase().includes('united states')) allRegionOptions.add('United States');
        if (regionString.toLowerCase().includes('south africa')) allRegionOptions.add('South Africa');
        
        // Extract places from lists in parentheses
        const parensMatch = regionString.match(/\(([^)]+)\)/);
        if (parensMatch) {
            let content = parensMatch[1];
            if (content.includes(',') || content.includes(';')) {
                content = content.replace(/case studies in cities\/regions:|e\.g\.|local case examples:|etc\./ig, '');
                const places = content.split(/[,;]/).map(p => p.replace(/\band\b/ig, '').trim());
                places.forEach(place => {
                    const cleanPlace = place.split('(')[0].trim();
                    if (cleanPlace && !cleanPlace.toLowerCase().includes('lens') && !cleanPlace.toLowerCase().includes('material') && !/\d/.test(cleanPlace)) {
                         allRegionOptions.add(cleanPlace.charAt(0).toUpperCase() + cleanPlace.slice(1));
                    }
                });
            }
        }
    });

    return Array.from(allRegionOptions).filter(Boolean).sort();
  }, [data]);
  const uniqueTargets = useMemo(() => {
    const allTargets = data.flatMap(item => (item['SDG Target(s)'] || '').split(',').map(t => t.trim()));
    return [...new Set(allTargets)].filter(Boolean).sort();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/sdgs.csv');
      const csvText = await response.text();
      
      Papa.parse<SDGData>(csvText, {
        header: true,
        complete: (result) => {
          const parsedData = result.data.filter(d => d['S.N.']);
          setData(parsedData);
        }
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter change
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    
    const filtered = data.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowercasedSearchTerm)
      );
      const matchesYear = !selectedYear || item.Year === selectedYear;
      const matchesRegion = !selectedRegion || (item['Region or Country Focus'] || '').includes(selectedRegion);
      const matchesTarget = !selectedTarget || (item['SDG Target(s)'] || '').split(',').map(t => t.trim()).includes(selectedTarget);
      
      return matchesSearch && matchesYear && matchesRegion && matchesTarget;
    });
    setFilteredData(filtered);
  }, [searchTerm, data, selectedYear, selectedRegion, selectedTarget]);

  const toggleRowExpansion = (sn: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sn)) {
        newSet.delete(sn);
      } else {
        newSet.add(sn);
      }
      return newSet;
    });
  };

  const downloadCsv = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'sdg_initiatives.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">SDG Initiatives</h1>
                    <p className="mt-1 text-sm text-gray-500">A curated list of projects and publications.</p>
                </div>
                <button onClick={downloadCsv} className="mt-4 sm:mt-0 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50">
                    <Download size={16} className="mr-2" />
                    Download CSV
                </button>
            </header>
        
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition sm:col-span-2 lg:col-span-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FilterDropdown options={uniqueYears} value={selectedYear} onChange={setSelectedYear} placeholder="Year" />
                    <FilterDropdown options={uniqueRegions} value={selectedRegion} onChange={setSelectedRegion} placeholder="Region" />
                    <FilterDropdown options={uniqueTargets} value={selectedTarget} onChange={setSelectedTarget} placeholder="SDG Target" />
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="w-12"></th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author(s)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Year</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Region</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Link</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((row) => (
                    <React.Fragment key={row['S.N.']}>
                        <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                            <button onClick={() => toggleRowExpansion(row['S.N.'])} className="text-gray-400 hover:text-gray-600">
                            {expandedRows.has(row['S.N.']) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </button>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 ">{row.Title}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 ">{row['Author(s)']}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.Year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={clsx('px-2.5 py-1 text-xs font-semibold rounded-full', typeColorMap[row.Type] || typeColorMap.default)}>
                                {row.Type}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 ">{row['Region or Country Focus']}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href={row['Link (URL)']} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
                            View Source
                            </a>
                        </td>
                        </tr>
                        {expandedRows.has(row['S.N.']) && (
                        <tr className="bg-white">
                            <td colSpan={7} className="px-6 py-4 border-t border-gray-200">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="text-sm font-bold text-gray-800 mb-2">Summary</h4>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">{row.Summary}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                    <div><strong className="font-semibold text-gray-700">Publisher:</strong> {row['Source / Publisher']}</div>
                                    <div><strong className="font-semibold text-gray-700">SDG Target(s):</strong> {row['SDG Target(s)']}</div>
                                </div>
                            </div>
                            </td>
                        </tr>
                        )}
                    </React.Fragment>
                    ))}
                </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredData.length)}</span> of <span className="font-medium">{filteredData.length}</span> results
                </div>

                <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-2">Rows per page:</span>
                    <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="border border-gray-300 rounded-md p-1 text-sm">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                    <div className="ml-4">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 py-1 text-sm text-gray-600 disabled:opacity-50">Prev</button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 py-1 text-sm text-gray-600 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

const FilterDropdown: React.FC<{options: string[], value: string, onChange: (value: string) => void, placeholder: string}> = ({ options, value, onChange, placeholder }) => (
  <select
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-sm text-gray-700"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    <option value="">{`Filter by ${placeholder}`}</option>
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);

export default SDGsPage;
