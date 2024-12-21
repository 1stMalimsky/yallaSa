import { Grid, Typography, Box } from "@mui/material";

const RedierctReasons = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`${process.env.PUBLIC_URL}/imgs/handControl.png`}
            alt="hand control"
            className="becomeReasonsImgs"
          />
        </Box>
        <Typography
          className="textHeaderResize"
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          השליטה בידיים שלכם
        </Typography>
        <Typography variant="subtitle1" className="textParaResize">
          קבלת הזמנות בזמן אמת, ללא צורך בפקיד. ניהול הזמנות מכל מכשיר. אתם
          קובעים את המחיר, אתם קובעים את הזמינות. השליטה בידיים שלכם
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`${process.env.PUBLIC_URL}/imgs/walletVectorLight.png`}
            alt="hand control"
            className="becomeReasonsImgs"
          />
        </Box>
        <Typography
          className="textHeaderResize"
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          הכנסה חודשית באפס מאמץ
        </Typography>
        <Typography variant="subtitle1" className="textParaResize">
          בעלי קרוואנים רבים רוצים לנצל את היכולת להשכיר אותם כאמצעי להכנסה
          צידית. אנו מציעים את הפלטפורמה הכייעילה, הכי נוחה והכי רווחית. פרסם את
          הקרוואן שלך כאן בחינם ותתחיל להרוויח כסף.
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`${process.env.PUBLIC_URL}/imgs/worryFreeLight.png`}
            alt="hand control"
            className="becomeReasonsImgs"
          />
        </Box>
        <Typography
          className="textHeaderResize"
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          בלי מאמץ ובלי דאגות
        </Typography>
        <Typography variant="subtitle1" className="textParaResize">
          אנחנו ביאללה סע, עומדים לשירותכם בכל שאלה. אנו מוודאים אשראי תקין
          ופרטים של כל לקוח. אצלנו הזמנה זו הזמנה בטוחה. הכל כדי שתוכלו לדרוג
          פחות ולהרוויח יותר
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RedierctReasons;
