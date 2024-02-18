import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Grid, Container, Typography } from "@mui/material";
import { Car } from "../../models/CarModel/responses/response";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./locationCSS.css";


const userLocationIcon = new L.Icon({
  iconUrl: "https://i.ibb.co/9yCGHZk/custom-pin.png",
  iconSize: [40,50],

});

interface Position {
  id: number;
  latitude: number;
  longitude: number;
  city: string;
  carDetails: Car;
}

const Location: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null
  );
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  


  const navigate = useNavigate();

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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  }, []);

  const handleLocationClick = (position: Position) => {
    setSelectedPosition(position);
    navigate(`/?city=${position.city}`);
    toast.info(position.city + " has been selected. Please select dates to continue booking")
  };

  return (
    <Container>
      <Grid container display={"flex"} spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{mb:3}}>Car Rental Locations</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5" sx={{mb:3}}>Our World Reach</Typography>
        </Grid>
        <Grid item xs={2} textAlign={"center"}>
          <Typography variant="h5" sx={{mb:3, fontSize:60,borderTop:1, fontStyle:"italic", color:"#bc9160"}}>5 + </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" sx={{mb:3}}>Locations. <br/>Find One Near You.</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        style={{
          textAlign: "center",
          justifyContent: "center",
          
        }}
      >
        <Grid item sm={12}>
          <MapContainer
            center={userLocation || [38.9637, 35.2433]}
            zoom={userLocation ? 10 : 5}
            style={{ height: "600px", width: "100%", marginTop: "8px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker
                position={userLocation}
                icon={userLocationIcon}
              >
                <Tooltip permanent direction="top" className="tooltip-content">
                <span>You are here</span>
              </Tooltip>
              </Marker>
              
            )}
            {positions.map((position) => (
              <Marker
                key={position.id}
                position={[position.latitude, position.longitude]}
                eventHandlers={{
                  click: () => handleLocationClick(position),
                }}
              >
                <Popup>{position.city}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Location;
