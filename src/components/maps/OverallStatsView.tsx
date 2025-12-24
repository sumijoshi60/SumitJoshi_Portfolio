import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

// Assuming HouseholdData structure is available or passed appropriately
interface HouseholdData {
  id: number;
  name: string;
  caste: string;
  sourceOfIncome: string;
  displaced: 'Yes' | 'No';
  agree: 'Yes' | 'No';
  gender: 'Male' | 'Female';
  educationLevel: string;
  // Add other fields if needed for aggregation, like interviews, though not directly charted here
}

interface OverallStatsViewProps {
  data: HouseholdData[];
}

const chartBaseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        font: { size: 12, weight: 'bold' as const },
        padding: 6,
      }
    },
    title: {
      display: true,
      font: { size: 14, weight: 'bold' as const },
      padding: { top: 6, bottom: 6 }
    },
    tooltip: {
      titleFont: { size: 13, weight: 'bold' as const },
      bodyFont: { size: 12, weight: 'bold' as const },
    }
  },
};

const barChartSpecificOptions = {
  ...chartBaseOptions,
  indexAxis: 'y' as const,
  plugins: {
    ...chartBaseOptions.plugins,
    legend: { display: false },
    title: { ...chartBaseOptions.plugins.title, text: 'Source of Income' }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: { stepSize: 1, font: { size: 10, weight: 'bold' as const } },
    },
    y: {
      ticks: {
        font: { size: 10, weight: 'bold' as const },
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      }
    }
  },
  layout: {
    padding: {
      left: 20,
      right: 5,
      top: 5,
      bottom: 5
    }
  }
};

// Specific legend label options for charts with more items
const compactLegendLabelOptions = {
  font: { size: 9, weight: 'bold' as const },
  padding: 3,
  boxWidth: 10,
};

export const OverallStatsView: React.FC<OverallStatsViewProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="p-3 text-sm text-stone-600">No overall data available.</div>;
  }

  const totalHouseholds = data.length;

  // Caste Distribution
  const casteCounts = data.reduce((acc, curr) => {
    acc[curr.caste] = (acc[curr.caste] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const casteChartData = {
    labels: Object.keys(casteCounts),
    datasets: [{
      data: Object.values(casteCounts),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56'],
    }],
  };
  const casteChartOptions = {
    ...chartBaseOptions,
    plugins: {
      ...chartBaseOptions.plugins, // Includes base title, tooltip, and legend (with position: 'bottom')
      legend: {
        ...chartBaseOptions.plugins.legend, // Start with base legend settings (like position)
        labels: { // Override only the labels part
          ...chartBaseOptions.plugins.legend.labels, // Inherit base label properties (optional but good practice)
          ...compactLegendLabelOptions, // Apply compact label specifics
        }
      },
      title: { ...chartBaseOptions.plugins.title, text: 'Caste Distribution' } // Keep specific title
    }
  };

  // Source of Income Distribution
  const incomeSources: Record<string, number> = {};
  data.forEach(hh => {
    const sources = hh.sourceOfIncome.split(',').map(s => s.trim());
    sources.forEach(source => {
      if (source) incomeSources[source] = (incomeSources[source] || 0) + 1;
    });
  });
  const incomeChartData = {
    labels: Object.keys(incomeSources),
    datasets: [{
      label: 'Households',
      data: Object.values(incomeSources),
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      barThickness: 12,
    }],
  };

  // Gender Distribution
  const genderCounts = {
    Male: data.filter(h => h.gender === 'Male').length,
    Female: data.filter(h => h.gender === 'Female').length,
  };
  const genderChartData = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [genderCounts.Male, genderCounts.Female],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }],
  };
  const genderChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Gender Distribution' } } };

  // Education Level Distribution
  const educationCounts = data.reduce((acc, curr) => {
    acc[curr.educationLevel] = (acc[curr.educationLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const educationOrder = ['Primary', 'Secondary', 'Higher Secondary', 'Bachelors Degree', 'No formal education', 'Other']; // Define order

  const educationLabels = Object.keys(educationCounts).sort((a, b) => {
    const indexA = educationOrder.indexOf(a);
    const indexB = educationOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b); // Both not in order, sort alphabetically
    if (indexA === -1) return 1; // a not in order, sort it to end
    if (indexB === -1) return -1; // b not in order, sort it to end
    return indexA - indexB; // Sort by defined order
  });

  const educationChartData = {
    labels: educationLabels,
    datasets: [{
      data: educationLabels.map(label => educationCounts[label]),
      backgroundColor: ['#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#C9CBCF'],
    }],
  };
  const educationChartOptions = {
    ...chartBaseOptions,
    plugins: {
      ...chartBaseOptions.plugins, // Includes base title, tooltip, and legend (with position: 'bottom')
      legend: {
        ...chartBaseOptions.plugins.legend, // Start with base legend settings (like position)
        labels: { // Override only the labels part
          ...chartBaseOptions.plugins.legend.labels, // Inherit base label properties
          ...compactLegendLabelOptions, // Apply compact label specifics
        }
      },
      title: { ...chartBaseOptions.plugins.title, text: 'Education Level' } // Keep specific title
    }
  };

  // Displaced by Project
  const displacedCounts = {
    Yes: data.filter(h => h.displaced === 'Yes').length,
    No: data.filter(h => h.displaced === 'No').length,
  };
  const displacedChartData = {
    labels: ['Yes', 'No'],
    datasets: [{
      data: [displacedCounts.Yes, displacedCounts.No],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };
  const displacedChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Displaced by Project' } } };

  // Satisfied with Project
  const satisfiedCounts = {
    Yes: data.filter(h => h.agree === 'Yes').length,
    No: data.filter(h => h.agree === 'No').length,
  };
  const satisfiedChartData = {
    labels: ['Yes', 'No'],
    datasets: [{
      data: [satisfiedCounts.Yes, satisfiedCounts.No],
      backgroundColor: ['#4BC0C0', '#FFCE56'],
    }],
  };
  const satisfiedChartOptions = { ...chartBaseOptions, plugins: { ...chartBaseOptions.plugins, title: { ...chartBaseOptions.plugins.title, text: 'Project Satisfaction' } } };

  const chartContainerHeight = "180px";

  return (
    <div className="p-3 h-full flex flex-col bg-white">
      <h3 className="text-lg font-bold text-stone-800 mb-1.5 text-center">Arun III Statistics</h3>
      <p className="text-xs text-stone-500 font-semibold text-center mb-2.5">Total Surveyed: {totalHouseholds}</p>

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        <div className="chart-container p-1.5 bg-stone-50/70 rounded shadow-sm flex items-center justify-center min-h-0" style={{ height: chartContainerHeight }}>
          <Pie data={genderChartData} options={genderChartOptions} />
        </div>
        <div className="chart-container p-1.5 bg-stone-50/70 rounded shadow-sm flex items-center justify-center min-h-0" style={{ height: chartContainerHeight }}>
          <Pie data={educationChartData} options={educationChartOptions} />
        </div>
        <div className="chart-container p-1.5 bg-stone-50/70 rounded shadow-sm flex items-center justify-center min-h-0" style={{ height: chartContainerHeight }}>
          <Pie data={casteChartData} options={casteChartOptions} />
        </div>
        <div className="chart-container p-1.5 bg-stone-50/70 rounded shadow-sm flex items-center justify-center min-h-0" style={{ height: chartContainerHeight }}>
          <Bar data={incomeChartData} options={barChartSpecificOptions} />
        </div>
        <div className="chart-container p-1.5 bg-stone-50/70 rounded shadow-sm flex items-center justify-center min-h-0" style={{ height: chartContainerHeight }}>
          <Pie data={displacedChartData} options={displacedChartOptions} />
        </div>
        <div className="chart-container p-1.5 bg-stone-50/70 rounded shadow-sm flex items-center justify-center min-h-0" style={{ height: chartContainerHeight }}>
          <Pie data={satisfiedChartData} options={satisfiedChartOptions} />
        </div>

      </div>
    </div>
  );
}; 