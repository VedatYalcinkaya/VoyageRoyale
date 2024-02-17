import { Button, Grid, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import getCustomRentalSlice, {
  getCustomRentals,
} from "../../store/slices/getCustomRentalSlice";
import { useEffect } from "react";
import PlaceIcon from "@mui/icons-material/Place";

type CarCardProps = {};

const ReservationsCard: React.FC<CarCardProps> = () => {
  const dispatch = useAppDispatch();
  const rentals = useAppSelector((state) => state.getCustomRentals.data);

  function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleDate = (startDate: any, endDate: any) => {
    const pickUpDateTime = new Date(startDate);
    const dropOffDateTime = new Date(endDate);

    const differenceInMs = dropOffDateTime.getTime() - pickUpDateTime.getTime();

    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    return differenceInDays;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCustomRentals());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  return (
    <Grid container>
      {rentals &&
        rentals.map((rental) => (
          <Grid container key={rental.id} xs={12} sm={12} md={12}>
            <Paper
              elevation={5}
              style={{
                padding: "3%",
                marginBottom: "20px",
                boxShadow: "0px 4px 20px rgba(15, 64, 55, 0.2)",
                width: "100%",
              }}
            >
              <Grid container>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "green",
                          mb: 2,
                        }}
                      >
                        {<PlaceIcon sx={{ fontSize: 15 }} />}{" "}
                        {rental.carPositionCity}
                      </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ ml: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 3 }}
                      >
                        {rental.carBrandName} {rental.carModelName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Reservation Number:
                      </Typography>
                      <Typography>{getRandomNumber(300, 999)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Reservation Date:
                      </Typography>
                      <Typography>{rental.createdDate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Start Date
                      </Typography>
                      <Typography>{rental.startDate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        End Date
                      </Typography>
                      <Typography>{rental.endDate}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Daily Price
                      </Typography>
                      <Typography>${rental.carDailyPrice}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "bold" }}>Days</Typography>
                      <Typography>
                        {handleDate(rental.startDate, rental.endDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Total Price
                      </Typography>
                      <Typography>
                        {`$${
                          rental.carDailyPrice *
                          handleDate(rental.startDate, rental.endDate)
                        }`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
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
                        Cancel My Reservation
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} alignItems={"center"}>
                  <img src={rental.carImagePath} width={"50%"} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default ReservationsCard;
