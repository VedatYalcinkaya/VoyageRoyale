import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { Car } from "../../../models/CarModel/responses/response";
import { getAllCar } from "../../../store/slices/CarSlices/getAllCarSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ClassIcon from "@mui/icons-material/Class";
import { useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { deleteCar } from "../../../store/slices/deleteCarSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AdminCarCardProps {
  onAddNewRecordClick: () => void;
  onUpdateClick: () => void;
}

const AdminCarCard: React.FC<AdminCarCardProps> = ({ onAddNewRecordClick, onUpdateClick }) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.getAllCar.data);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleDeleteClick = async (carId:number) => {
    await dispatch(deleteCar(carId))
    toast.info("Record has been deleted")
    dispatch(getAllCar())

  }

  const imageRefs = useRef(new Map<number, HTMLImageElement>());

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCar());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);





  const [loadingImages, setLoadingImages] = useState<{ [key: number]: boolean }>({});

  // cars listesi değiştiğinde, yani Redux store'dan çekildiğinde, loadingImages state'ini yeniden başlat
  useEffect(() => {
    setLoadingImages(cars.reduce((acc, car) => ({ ...acc, [car.id]: true }), {}));

    // Check if images are already loaded from cache and set loading to false if they are
    cars.forEach((car) => {
      const imageEl = imageRefs.current.get(car.id);
      if (imageEl && imageEl.complete) {
        handleImageLoaded(car.id);
      }
    });
  }, [cars]);

  const handleImageLoaded = (carId: number) => {
    setLoadingImages((prevLoadingImages: any) => ({
      ...prevLoadingImages,
      [carId]: false
    }));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={onAddNewRecordClick}
            sx={{
              mb: 2,
              fontSize: 12,
              color: "#d4d2a9",
              backgroundColor: "#0F4037",
              "&:hover": {
                backgroundColor: "#B58B5D",
                color: "#0f4037",
              },
            }}
          >
            Add a New Record
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Button
            variant="contained"
            color="primary"
            onClick={onUpdateClick}
            sx={{
              mb: 2,
              fontSize: 12,
              color: "#d4d2a9",
              backgroundColor: "#0F4037",
              "&:hover": {
                backgroundColor: "#B58B5D",
                color: "#0f4037",
              },
            }}
          >
            Update a Record
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Search by Plate"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{mt:2,mb:4}}>
          <Typography >There are <b>"{cars.length}"</b> car(s) in your database</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          backgroundColor: "#f9f9f9",
          padding: 2,
          boxShadow: 1,
          overflowY: "scroll",
          maxHeight: "750px",
        }}
      >
        {cars
          .filter((car: Car) => {
            return (
              searchQuery === "" ||
              car.plate.toLowerCase().includes(searchQuery.toLowerCase())
            );
          })
          .map((car: Car, i: number) => (
            <Grid item xs={4} key={car.id} sx={{}}>
              <Box sx={{ boxShadow: 2, m: 2, p: 1, backgroundColor: "white" }}>
                <Grid container spacing={1} sx={{ p: 1 }}>
                  <Grid item xs={12}>
                    <Typography
                      sx={{ fontSize: 18, fontWeight: "bold", color: "green" }}
                    >
                      {<PlaceIcon sx={{ fontSize: 15 }} />} {car.positionCity}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} textAlign={"center"}>
                    {loadingImages[car.id] && (
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          margin: "10px",
                          marginBottom: "120px"
                        }}
                      >
                        <CircularProgress color="success"/>
                      </Grid>
                    )}
                    <img
                       ref={(el) => {
                        if (el) {
                          imageRefs.current.set(car.id, el);
                        } else {
                          imageRefs.current.delete(car.id);
                        }
                      }}
                       width={"70%"}
                       src={car.imagePath}
                       alt={`${car.brandName} ${car.modelName}`}
                       onLoad={() => handleImageLoaded(car.id)} 
                       style={{ display: loadingImages[car.id] ? 'none' : 'inline-block' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#bc9160",
                      }}
                    >
                      ${car.dailyPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                      {car.brandName} {car.modelName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                      {car.plate}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <LocalGasStationIcon
                        sx={{ fontSize: 14, mr: 1, color: "#bc9160" }}
                      />
                      {car.fuelTypeName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {
                        <AccountTreeIcon
                          sx={{ fontSize: 14, mr: 1, color: "#bc9160" }}
                        />
                      }
                      {car.gearTypeName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} textAlign={"right"}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {
                        <ClassIcon
                          sx={{ fontSize: 14, mr: 1, color: "#bc9160" }}
                        />
                      }
                      {car.carTypeName}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {
                        <ColorLensIcon
                          sx={{ fontSize: 14, mr: 1, color: "#bc9160" }}
                        />
                      }
                      {car.colorName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} marginTop={2} >
                    <Button sx={{ color: "red" }} onClick={() => handleDeleteClick(car.id)}>
                      <DeleteIcon sx={{ fontSize: 16, color: "red" }} />{" "}
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
      </Grid>
    
    </>
  );
};

export default AdminCarCard;