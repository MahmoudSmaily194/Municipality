import { useState } from "react";
import style from "./MunicipalityMap.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Coordinates = [number, number];

const LocationMarker = ({
  location,
  setLocation,
}: {
  location: Coordinates | null;
  setLocation: (coords: Coordinates) => void;
}) => {
  useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
    },
  });

  return location ? <Marker position={location} /> : null;
};

const FlyToLocation = ({ location }: { location: Coordinates | null }) => {
  const map = useMap();
  if (location) map.flyTo(location, 13);
  return null;
};

export default function LocationSelector({
  onSave,
}: {
  onSave: (coords: Coordinates) => void;
}) {
  const [location, setLocation] = useState<Coordinates | null>(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setLocation(coords);
      },
      (error) => {
        alert("Unable to retrieve your location.");
        console.error(error);
      }
    );
  };

  const handleSave = () => {
    if (location) {
      onSave(location);
      alert("Location saved!");
    } else {
      alert("⚠️ Please select a location first.");
    }
  };

  return (
    <div>
      <MapContainer
        center={[33.6863, 35.909]}
        zoom={13}
        scrollWheelZoom
        style={{
          height: "400px",
          width: "100%",
          marginTop: "10px",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker location={location} setLocation={setLocation} />
        <FlyToLocation location={location} />
      </MapContainer>
      <div className={style.loca_btns}>
        <button
          onClick={handleUseMyLocation}
          className={style.mylocation_btn}
          type="button"
        >
          Use My Location
        </button>
        <button
          onClick={handleSave}
          className={style.mylocation_btn}
          type="button"
        >
          Save the location
        </button>
      </div>
    </div>
  );
}
