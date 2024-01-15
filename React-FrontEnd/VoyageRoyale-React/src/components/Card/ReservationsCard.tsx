import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function ReservationCard() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 550, maxWidth: "100%", boxShadow: "lg" }}>
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 200 }}>
            <img src="https://sixt.com.tr/storage/images/shares/togg-1.jpg" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">
            Reservation Date: 10 January 2024
          </Typography>
          <Link
            href="#product-card"
            fontWeight="md"
            color="neutral"
            textColor="text.primary"
            overlay
            endDecorator={<ArrowOutwardIcon />}
          >
            Istanbul Airport
          </Link>

          <Typography
            level="title-lg"
            sx={{ mt: 1, fontWeight: "xl" }}
            endDecorator={
              <Chip component="span" size="sm" variant="soft" color="success">
                Thrusday 11 Ocak, 2024 10:00-Sunday 14 Ocak, 2024 10:00
              </Chip>
            }
          ></Typography>
          <Typography level="body-sm">
            ( <b>Brand</b>:Toyota <b>Model</b>:Corolla )
          </Typography>
        </CardContent>
        <CardOverflow>
          <Button variant="solid" color="primary" size="lg">
            Total Price: 2400 TRY
          </Button>
        </CardOverflow>
      </Card>
    </div>
  );
}
