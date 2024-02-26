import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Grid container sx={{ borderTop: 1, p: 2, mt: 10, display:"flex", textAlign:"center", alignItems:"center", justifyContent:"space-between" }} spacing={2}>
      <Grid item xs={2} >
        <img src="https://i.ibb.co/wZkGJP8/Logo-Ye-il.png" width="20%" />
      </Grid>
      <Grid item xs={3}  >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("experienceElegance")} <br />
          {t("onEveryJourney")}
        </Typography>
      </Grid>
      <Grid item xs={4}  >
        <Typography sx={{ fontSize: 12 }}>{t("allRightsReserved")}</Typography>
      </Grid>
      <Grid item xs={3}  >
        <Grid container>
          <Grid
            item
            xs={12}
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
    </Grid>
  );
};

export default Footer;
