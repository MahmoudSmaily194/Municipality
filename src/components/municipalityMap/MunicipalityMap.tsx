import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../map/leaflet-icon-fix"; // Keep this to show marker icons correctly
import styles from "./MunicipalityMap.module.css";
const MunicipalityMap = () => {
  const position = {
    lat: 33.68632543618543,
    lng: 35.908985301202556,
  };

  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.map_con}>
      <h3>Visit Us</h3>
      <div className={styles.map}>
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={17}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Earthstar Geographics'
          />
          <Marker position={[position.lat, position.lng]}>
            <Popup>
              🏛️ Sawirah Municipality <br />
              Welcome to your town hall!
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <button
        className={styles.directionsButton}
        onClick={openGoogleMapsDirections}
      >
        Get Directions
      </button>
    </div>
  );
};

export default MunicipalityMap;
