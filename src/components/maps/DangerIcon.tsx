import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet'; // Import Marker and Popup from react-leaflet

interface DangerIconProps {
  position: L.LatLngExpression;
  downstreamWorries: number;
  damBreakWorries: number;
}

export const DangerIcon: React.FC<DangerIconProps> = ({ position, downstreamWorries, damBreakWorries }) => {
  const iconHtml = `
    <div style="background-color: red; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; cursor: pointer;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    className: 'custom-danger-icon', // Add a class for potential future styling
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup 
        autoClose={false} 
        closeOnClick={false} 
        minWidth={320} // Increased minWidth for single line text
        closeButton={true}
      >
        <div className="space-y-1"> {/* space-y-1 provides consistent top margin for children except first */}
          <p className="text-xs font-semibold">Inconsistent data reported</p> {/* Added text-xs for consistency */}
          <p className="text-xs">{damBreakWorries} local participants reported dam break worries</p>
          <p className="text-xs">2 officials reported no significant issues</p>
        </div>
      </Popup>
    </Marker>
  );
}; 