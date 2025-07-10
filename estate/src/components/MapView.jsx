import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ properties = [] }) {
  const hasProperties = properties.length > 0;

  const defaultCenter = hasProperties
    ? [properties[0].latitude, properties[0].longitude]
    : [6.5244, 3.3792]; // Fallback to Lagos

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Property Location</h5>
        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer
            center={defaultCenter}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {hasProperties &&
              properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[property.latitude, property.longitude]}
                >
                  <Popup>{property.title}</Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapView;
