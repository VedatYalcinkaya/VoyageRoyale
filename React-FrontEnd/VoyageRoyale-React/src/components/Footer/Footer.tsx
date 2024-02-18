import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Grid container sx={{ borderTop: 1, p: 5, mt: 10 }}>
      <Grid item xs={2} textAlign="left">
        <img src="https://i.ibb.co/wZkGJP8/Logo-Ye-il.png" width="30%" />
      </Grid>
      <Grid
        item
        xs={4}
        textAlign="left"
        sx={{ alignItems: "left", color: "#0f4037" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("experienceElegance")} <br />
          {t("onEveryJourney")}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        textAlign="left"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ml: -6,
          mr: 5,
        }}
      >
        <Typography sx={{ fontSize: 12 }}>{t("allRightsReserved")}</Typography>
      </Grid>
      <Grid item xs={3} sx={{ alignItems: "center" }}>
        <Grid container>
          <Grid
            item
            textAlign={"center"}
            xs={12}
            marginBottom={2}
            sx={{ mt: -2 }}
          >
            <Typography>{t("openingHours")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"center"} sx={{ borderBottom: 1 }}>
            <Typography sx={{ fontSize: 12 }}>{t("monThu")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"center"} sx={{ borderBottom: 1 }}>
            <Typography sx={{ fontSize: 12 }}>{t("hoursMonThu")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"center"} sx={{ borderBottom: 1 }}>
            <Typography sx={{ fontSize: 12 }}>{t("friSat")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"center"} sx={{ borderBottom: 1 }}>
            <Typography sx={{ fontSize: 12 }}>{t("hoursFriSat")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"center"} sx={{ borderBottom: 1 }}>
            <Typography sx={{ fontSize: 12 }}>{t("sunday")}</Typography>
          </Grid>
          <Grid item xs={6} textAlign={"center"} sx={{ borderBottom: 1 }}>
            <Typography sx={{ fontSize: 12 }}>{t("hoursSunday")}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}></Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
