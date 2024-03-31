import { Button, Card, Grid, Typography } from "@mui/joy";
import { chooseSemester } from "../../functions/chooseSemester";
import { defineStartAndEndYear } from "../../functions/defineStartAndEndYear";
import { chooseStatus } from "../../functions/chooseStatus";
import { chooseColor } from "../../functions/chooseColor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import checkRole from "../../functions/checkRole";
import DeleteCourse from "./DeleteCourse";

function CardForCourse({card, fetchData})
{
    const navigate = useNavigate();
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    return (
        <Card id={card.id} key={card.id} className="maxwidth p-0" container="true">
            <Grid container className="endAndStart">
                <Grid container xs={9} className="column one cardWithName round p-16 withoutright" onClick={() => navigate(`/courses/${card.id}`)}>
                    <Typography level="h4">{card.name}</Typography>
                    <Typography >{`Учебный год - ${defineStartAndEndYear(card.semester, card.startYear)}`}</Typography>
                    <Typography >{`Семестр - ${chooseSemester(card.semester)}`}</Typography>
                    <Typography level="body-sm">{`Мест всего - ${card.maximumStudentsCount}`}</Typography>
                    <Typography level="body-sm">{`Мест свободно - ${card.remainingSlotsCount}`}</Typography>
                </Grid>
                <Grid container xs={3} className="end ml-8 delete p-16 withoutleft gray" flexDirection={"column"} justifyContent={"space-between"}>
                    <Typography color={chooseColor(card.status)} className="alignRight">{chooseStatus(card.status)}</Typography>
                    {
                        isAdmin ? 
                        <DeleteCourse id={card.id} fetchData={fetchData}/> 
                        : 
                        null
                    }
                </Grid>
            </Grid>
        </Card>
    );
}

export default CardForCourse;