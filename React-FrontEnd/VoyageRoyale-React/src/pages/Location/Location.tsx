import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Grid, Container } from "@mui/material";

interface Position {
  id: number;
  latitude: number;
  longitude: number;
  city: string;
}

const Location: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get<Position[]>(
          "http://localhost:8080/api/positions/getAll"
        );
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  return (
    <Container>
      <Grid container style={{ textAlign: "center", justifyContent: "center", paddingLeft:50} }>
        <Grid
          item
          sm={12}
        >
          <MapContainer
            center={[38.9637, 35.2433]}
            zoom={5}
            style={{ height: "400px", width: "100%", marginTop: "100px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positions.map((position) => (
              <Marker
                key={position.id}
                position={[position.latitude, position.longitude]}
              >
                <Popup>
                  {position.city} <br /> Latitude: {position.latitude},
                  Longitude: {position.longitude}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Location;
