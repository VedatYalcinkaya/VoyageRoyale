import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/configureStore";
import { Car } from "../../../models/CarModel/responses/response";
import { getAllCar } from "../../../store/slices/CarSlices/getAllCarSlice";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ClassIcon from "@mui/icons-material/Class";
import DeleteConfirmation from "./Confirmations/DeleteConfirmation";

interface AdminCarCardProps {
  onAddNewRecordClick: () => void;
}

const AdminCarCard: React.FC<AdminCarCardProps> = ({ onAddNewRecordClick }) => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((state) => state.getAllCar.data);
  const [searchQuery, setSearchQuery] = useState("");
  const handleDeleteClick = async (car: any) => {
  };
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);
  const handleAddNewRecordClick = () => {
    setIsNewRecordDialogOpen(true);
  };




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





  useEffect(() => {
    // cars listesi her güncellendiğinde loadingImages state'ini yeniden başlat
    setLoadingImages(
      cars.reduce((acc, car) => ({ ...acc, [car.id]: true }), {})
    );
  }, [cars]); // cars listesi değiştiğinde bu useEffect'i tetikle

  const [loadingImages, setLoadingImages] = useState<{ [key: number]: boolean }>(
    cars.reduce((acc, car) => ({ ...acc, [car.id]: true }), {})
  );

  const handleImageLoaded = (carId: number) => {
    setLoadingImages((prevLoadingImages: any) => ({
      ...prevLoadingImages,
      [carId]: false
    }));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
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
                        <img
                          src="https://s9.gifyu.com/images/SFpW6.gif"
                          width={"40%"} />
                      </Grid>
                    )}
                    <img
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

                  <Grid item xs={6} marginTop={2}>
                    <Button>
                      <ModeEditIcon sx={{ fontSize: 16, mr: 1 }} /> Edit
                    </Button>
                  </Grid>
                  <Grid item xs={6} marginTop={2} textAlign={"right"}>
                    <Button sx={{ color: "red" }} onClick={() => handleDeleteClick(car)}>
                      <DeleteIcon sx={{ fontSize: 16, mr: 1, color: "red" }} />{" "}
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
      </Grid>
      <DeleteConfirmation handleDeleteClick={handleDeleteClick} />
    </>
  );
};

export default AdminCarCard;
