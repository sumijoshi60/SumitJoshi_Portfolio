import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundDecoration } from '../components/BackgroundDecoration';
import { OverallStatsView } from '../components/maps/OverallStatsView';
import { DangerIcon } from '../components/maps/DangerIcon';

// Updated household data interface
interface HouseholdData {
  id: number;
  name: string;
  position: LatLngExpression;
  interviews: number;
  interviewLink: string;
  caste: string;
  sourceOfIncome: string;
  displaced: 'Yes' | 'No';
  agree: 'Yes' | 'No';
  gender: 'Male' | 'Female';
  educationLevel: string;
}

// New household data for Sankhuwasabha, near Arun III
const households: HouseholdData[] = [
  {
    id: 1,
    name: 'Household A (Near Arun III)',
    position: [27.515, 87.190],
    interviews: 4,
    interviewLink: '#interview-arun-1',
    caste: 'Limbu',
    sourceOfIncome: 'Agriculture, Project Labor',
    displaced: 'Yes',
    agree: 'Yes',
    gender: 'Male',
    educationLevel: 'Primary',
  },
  {
    id: 2,
    name: 'Household B (Near Arun III)',
    position: [27.505, 87.195],
    interviews: 2,
    interviewLink: '#interview-arun-2',
    caste: 'Limbu',
    sourceOfIncome: 'Livestock, Local Shop',
    displaced: 'No',
    agree: 'No',
    gender: 'Female',
    educationLevel: 'Secondary',
  },
  {
    id: 3,
    name: 'Household C (Near Arun III)',
    position: [27.512, 87.198],
    interviews: 3,
    interviewLink: '#interview-arun-3',
    caste: 'Sherpa',
    sourceOfIncome: 'Tourism, Agriculture, Local Shop',
    displaced: 'No',
    agree: 'Yes',
    gender: 'Male',
    educationLevel: 'Secondary',
  },
  {
    id: 4,
    name: 'Household D (Downstream Arun III)',
    position: [27.498, 87.200],
    interviews: 5,
    interviewLink: '#interview-arun-4',
    caste: 'Chhetri',
    sourceOfIncome: 'Fishing, Remittance',
    displaced: 'Yes',
    agree: 'No',
    gender: 'Female',
    educationLevel: 'Bachelors',
  },
  {
    id: 5,
    name: 'Household E (Upstream Arun III)',
    position: [27.520, 87.185],
    interviews: 1,
    interviewLink: '#interview-arun-5',
    caste: 'Sherpa',
    sourceOfIncome: 'Agriculture, Fishing',
    displaced: 'No',
    agree: 'Yes',
    gender: 'Male',
    educationLevel: 'No formal education',
  },
];

// Fix for default icon issue with Webpack/React-Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom dam icon for Arun III project (using a dam/water symbol)
const arunIIIIcon = L.divIcon({
  className: 'custom-dam-icon',
  html: '<div style="background: #8B4513; border: 2px solid #654321; border-radius: 3px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: white; font-weight: bold;">🏗️</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

// Bounding box for Sankhuwasabha District (approximated and expanded)
const sankhuwasabhaBounds = L.latLngBounds(
  L.latLng(27.1, 86.8), // Southwest corner for Sankhuwasabha - adjust as needed
  L.latLng(28.0, 87.7)  // Northeast corner for Sankhuwasabha - adjust as needed
);

const geoJsonStyleSankhuwasabha = {
  color: '#008000',    // Green for Sankhuwasabha boundary line
  weight: 3,
  opacity: 1,
  fillColor: '#90EE90', // Light Green fill for Sankhuwasabha
  fillOpacity: 0.3
};

const testGeoJsonStyle = {
  color: '#00FF00',
  weight: 2,
  opacity: 1,
  fillColor: '#FFFF00',
  fillOpacity: 0.2
};


export const UncertaintyAtlasPage = () => {
  const defaultMapCenter: LatLngExpression = [27.55, 87.25]; // Approx center for Sankhuwasabha
  const initialZoom = 10; // Zoom level for Sankhuwasabha

  const mapRef = React.useRef<L.Map>(null);
  const [sankhuwasabhaGeoJson, setSankhuwasabhaGeoJson] = useState<any>(null);
  const [testGeoJson, setTestGeoJson] = useState<any>(null);
  const [districtCenter, setDistrictCenter] = useState<LatLngExpression | null>(null); // For Sankhuwasabha's label and map centering

  const calculateCentroid = (coordinates: any): LatLngExpression => {
    let totalLat = 0;
    let totalLng = 0;
    let totalPoints = 0;
    const processCoordinates = (coords: any[]) => {
      coords.forEach((item: any) => {
        if (typeof item[0] === 'number' && typeof item[1] === 'number') {
          totalLng += item[0]; totalLat += item[1]; totalPoints++;
        } else { processCoordinates(item); }
      });
    };
    processCoordinates(coordinates);
    if (totalPoints === 0) return defaultMapCenter; // Fallback
    return [totalLat / totalPoints, totalLng / totalPoints] as LatLngExpression;
  };

  useEffect(() => {
    const fetchDistrictGeoJson = async () => {
      try {
        const response = await fetch('/data/geojson/nepal-districts.geojson');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const allDistrictsData = await response.json();

        const districtFeature = (allDistrictsData as any)?.features?.find((feature: any) => {
          const props = feature.properties;
          const currentDistrictName = (props?.DISTRICT || props?.DIST_EN || ' ').toString().toUpperCase();
          return currentDistrictName === 'SANKHUWASHAVA' || currentDistrictName === 'SANKHUWASABHA'; // Spelling variations
        });

        if (districtFeature) {
          console.log('Found Sankhuwasabha feature:', districtFeature);
          setSankhuwasabhaGeoJson(districtFeature);
          if (districtFeature.geometry?.coordinates) {
            const centroid = calculateCentroid(districtFeature.geometry.coordinates);
            setDistrictCenter(centroid);
            console.log('Sankhuwasabha centroid:', centroid);
          }
        } else {
          console.error('Sankhuwasabha district not found');
          setSankhuwasabhaGeoJson({ type: 'FeatureCollection', features: [] });
          setDistrictCenter(defaultMapCenter); // Fallback if district not found
        }
      } catch (error) {
        console.error('Failed to fetch GeoJSON data:', error);
        setSankhuwasabhaGeoJson({ type: 'FeatureCollection', features: [] });
        setDistrictCenter(defaultMapCenter);
      }
    };
    fetchDistrictGeoJson();
  }, []);

  useEffect(() => {
    if (mapRef.current && districtCenter) {
      mapRef.current.setView(districtCenter, initialZoom);
      mapRef.current.fitBounds(sankhuwasabhaBounds);
    } else if (mapRef.current && !districtCenter) {
      mapRef.current.setView(defaultMapCenter, initialZoom);
      mapRef.current.fitBounds(sankhuwasabhaBounds);
    }
  }, [districtCenter]);

  // Positions for danger icons near Arun III Project in Sankhuwasabha
  const dangerIconPositions: LatLngExpression[] = [
    [27.518, 87.188], // Near Arun III
    [27.515, 87.190], // Near Arun III
    [27.500, 87.192], // Another spot near Arun III
  ];

  const arunIIIProjectCoords: LatLngExpression = [27.510, 87.193]; // Arun III Coordinates

  return (
    <div className="relative bg-stone-50 min-h-screen w-full overflow-x-hidden font-[sans-serif] font-light flex flex-col">
      <BackgroundDecoration />
      <Header />
      <main className="relative z-10 pt-16 md:pt-20 flex-grow flex flex-col">
        <div className="py-4 md:py-6 text-center">
          <h1 className="text-2xl md:text-3xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            Sankhuwasabha District: Hydropower Impact
          </h1>
          <p className="text-sm md:text-base text-stone-600 mt-2 md:mt-3 max-w-3xl mx-auto px-4">
            Interactive map for Sankhuwasabha, Nepal. Features the Arun III Hydroelectric Project.
          </p>
        </div>

        <div className="flex-grow container mx-auto px-2 sm:px-4 mb-6 flex flex-col md:flex-row gap-3 md:gap-4 h-[calc(100vh-200px)] md:h-[calc(100vh-220px)] max-h-[750px] md:max-h-none">
          <div className="w-full md:w-1/2 lg:w-1/2 h-full rounded-lg shadow-md overflow-hidden border border-stone-200">
            <MapContainer
              ref={mapRef}
              center={districtCenter || defaultMapCenter}
              zoom={initialZoom}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              maxBounds={sankhuwasabhaBounds}
              minZoom={9} // Adjusted minZoom for Sankhuwasabha
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              {testGeoJson && <GeoJSON key="test-geojson" data={testGeoJson} style={testGeoJsonStyle} />}
              {sankhuwasabhaGeoJson && (
                <GeoJSON
                  key={`sankhuwasabha-${JSON.stringify(sankhuwasabhaGeoJson)}`}
                  data={sankhuwasabhaGeoJson}
                  style={geoJsonStyleSankhuwasabha}
                />
              )}
              {households.map(household => (
                <Marker
                  key={household.id}
                  position={household.position}
                >
                  <Popup 
                    minWidth={260} 
                    maxHeight={280} 
                    autoClose={false} 
                    closeOnClick={false}
                    closeButton={true}
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-stone-800 mb-1">{household.name}</h3>
                      <p className="text-xs"><strong>Interviews:</strong> {household.interviews}</p>
                      <p className="text-xs"><strong>Caste:</strong> {household.caste}</p>
                      <p className="text-xs"><strong>Source of Income:</strong> {household.sourceOfIncome}</p>
                      <p className="text-xs"><strong>Displaced:</strong> {household.displaced}</p>
                      <p className="text-xs"><strong>Agreed with Project:</strong> {household.agree}</p>
                      <p className="text-xs"><strong>Gender of Respondent:</strong> {household.gender}</p>
                      <p className="text-xs"><strong>Education Level:</strong> {household.educationLevel}</p>
                      <a href={household.interviewLink} className="text-blue-500 hover:underline text-xs block mt-1">Read Interview Transcripts</a>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {districtCenter && (
                <Marker
                  position={districtCenter}
                  icon={L.divIcon({
                    className: 'district-label',
                    html: '<div style="padding: 4px 8px; font-weight: bold; font-size: 16px; color: #333;">Sankhuwasabha</div>',
                    iconSize: [120, 30], // Adjusted for longer name
                    iconAnchor: [60, 15]
                  })}
                />
              )}
              {dangerIconPositions.map((pos, index) => (
                <DangerIcon
                  key={`danger-${index}`}
                  position={pos}
                  downstreamWorries={index === 0 ? 7 : 4} // Example data for Arun III context
                  damBreakWorries={index === 0 ? 5 : 2}
                />
              ))}
              <Marker
                position={arunIIIProjectCoords}
                icon={arunIIIIcon}
              >
                <Popup autoClose={false} closeOnClick={false} closeButton={true} minWidth={240} maxHeight={200}>
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm mb-1">Arun III Hydroelectric Project</h3>
                    {/* <p className="text-xs">Coordinates: {arunIIIProjectCoords[0].toFixed(5)}, {arunIIIProjectCoords[1].toFixed(5)}</p> */}
                    <a href="https://en.wikipedia.org/wiki/Arun_III" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs block mt-1">More Info (Wikipedia)</a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow-md border border-stone-200 overflow-y-auto h-full">
            <OverallStatsView data={households} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}; 