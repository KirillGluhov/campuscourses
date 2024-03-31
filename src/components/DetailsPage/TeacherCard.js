import {ListItem, Grid, Chip, Typography} from "@mui/joy";

function TeacherCard({teacher})
{
    return (
        <>
            {
                teacher.isMain ? 
                <ListItem className="p-8">
                    <Grid>
                        <Grid container gap={1}>
                            <Typography level="title-lg" className="wrap-text">{teacher.name}</Typography>
                            <Chip className="green main whiteText">основной</Chip>
                        </Grid>
                        <Typography className="wrap-text">{teacher.email}</Typography>
                    </Grid>
                </ListItem>
                :
                <ListItem className="p-8">
                    <Grid>
                        <Grid container>
                            <Typography level="title-lg" className="wrap-text">{teacher.name}</Typography>
                        </Grid>
                        <Typography className="wrap-text">{teacher.email}</Typography>
                    </Grid>
                </ListItem>
            }
        </>
    );
}

export default TeacherCard;