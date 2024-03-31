import {Typography, Grid } from "@mui/joy";

function Greeting()
{
    return (
        <Grid container className="centeredText" mt={5}>
            <Typography level="h1" mx={1} className="minweight-500">Добро пожаловать в систему кампусных курсов</Typography>
        </Grid>
    );
}

export default Greeting;