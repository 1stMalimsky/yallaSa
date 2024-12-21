import { Grid, Typography, Box } from "@mui/material";

const RedirectNumbers = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {/* IMG 1 */}
      <Grid
        item
        xs={4}
        sm={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className="numberIconsBecome"
            src={`${process.env.PUBLIC_URL}/imgs/numbers/1lightTheme.png`}
            alt="number1light"
          />
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            direction: "rtl",
            marginTop: 1,
            marginRight: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              padding: "5px",
              backgroundColor: (theme) => theme.palette.default,
              borderRadius: "4px",
              fontWeight: "bold",
              width: { md: "100%", lg: "90%" },
            }}
            className="textHeaderResize"
          >
            מלאו פרטים וצרו את הקרוואן שלכם
          </Typography>
          <Typography variant="subtitle1" className="textParaResize">
            מלאו את הפרטים האישיים שלכם והעלו את כל הפרטים על הקרוואן שלכם.
            אנחנו נדאג לשאר!
          </Typography>
        </Box>
      </Grid>
      {/*  IMG 2 */}
      <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className="numberIconsBecome"
            src={`${process.env.PUBLIC_URL}/imgs/numbers/2lightTheme.png`}
            alt="number2light"
          />
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            direction: "rtl",
            marginTop: 1,
            marginRight: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              fontWeight: "bold",
              width: { md: "100%", lg: "90%" },
            }}
            className="textHeaderResize"
          >
            קבלו הזמנות אונליין
          </Typography>
          <Typography variant="subtitle1" className="textParaResize">
            לאחר שרשמתם את הקרוואן שלכם, הזמינות שלכם תעלה לאוויר והזמנות יתחילו
            להיכנס ולחכות לאישורכם.
          </Typography>
        </Box>
      </Grid>
      {/*  IMG 3 */}
      <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            className="numberIconsBecome"
            src={`${process.env.PUBLIC_URL}/imgs/numbers/3lightTheme.png`}
            alt="number3light"
          />
        </Box>

        <Box
          sx={{
            flexDirection: "column",
            direction: "rtl",
            marginTop: 1,
            marginRight: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              fontWeight: "bold",
              width: { md: "100%", lg: "90%" },
            }}
            className="textHeaderResize"
          >
            תתחילו להכניס כסף
          </Typography>
          <Typography variant="subtitle1" className="textParaResize">
            ככל שתשכירו יותר, תרוויחו יותר! לא מכרתם? לא שילמתם! אצלנו ביאללה סע
            אין דמי חבר, הפרסום הוא חינם. תמיד!
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RedirectNumbers;
