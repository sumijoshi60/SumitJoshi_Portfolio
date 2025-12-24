import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DistributionData {
  ageGroup: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  gender: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  caste: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

interface DistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DistributionData | null;
  householdName: string;
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: true,
      text: '', // Will be set dynamically
    },
  },
};

export const DistributionModal: React.FC<DistributionModalProps> = ({ isOpen, onClose, data, householdName }) => {
  if (!isOpen || !data) return null;

  const ageChartOptions = { ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Age Group Distribution' } } };
  const genderChartOptions = { ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Gender Distribution' } } };
  const casteChartOptions = { ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: 'Caste Distribution' } } };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-stone-800">Distribution Data for {householdName}</h2>
          <button 
            onClick={onClose} 
            className="text-stone-600 hover:text-stone-800 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6" style={{ height: 'auto' }}>
          <div style={{ height: '300px' }}><Pie data={data.ageGroup} options={ageChartOptions} /></div>
          <div style={{ height: '300px' }}><Pie data={data.gender} options={genderChartOptions} /></div>
          <div style={{ height: '300px' }}><Pie data={data.caste} options={casteChartOptions} /></div>
        </div>
      </div>
    </div>
  );
}; 