import { CardContent, Card, Grid, Typography, Snackbar } from "@mui/joy";
import { defineStartAndEndYear } from "../../functions/defineStartAndEndYear";
import { chooseSemester } from "../../functions/chooseSemester";
import { chooseStatus } from "../../functions/chooseStatus";
import { chooseColor } from "../../functions/chooseColor";
import checkRole from "../../functions/checkRole";
import { useEffect, useState } from "react";
import { Status } from "../../const/const-statuses";
import ChangeStatus from "./ChangeStatus";
import SignStudent from "./SignStudent";

function MainInfo({info, fetchData})
{
    const [isTeacher, setTeacher] = useState(false);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));
    const [isSigned, setSigned] = useState(checkSigned());

    useEffect(() => {
        checkTeacher()
    });

    function checkTeacher()
    {
        let teachers = info.teachers;

        for (let teacher in teachers)
        {
            if (teachers[teacher].email === localStorage.getItem("email"))
            {
                setTeacher(true);
                return true;
            }
        }
        setTeacher(false);
        return false;
    }



    const [snackState, setSnack] = useState({
        color: "success",
        open: false
    })

    function handleClose()
    {
        setSnack(prevState => ({
            ...prevState,
            open: false
        }));
    }

    function checkSigned()
    {
        let students = info.students;

        for (let student in students)
        {
            if (students[student].email === localStorage.getItem("email"))
            {
                return true;
            }
        }

        return false;
    }

    return (
        <>
            <Card className="maxwidth withoutround upround">
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Статус курса</Typography>
                    </Grid>
                    <Grid>
                        <CardContent>
                            <Typography color={chooseColor(info.status)}>{chooseStatus(info.status)}</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
                <Grid xs={6} container justifyContent="end">
                    <Grid container>
                        {
                            (isAdmin || isTeacher) ? 
                            <ChangeStatus info={info} fetchData={fetchData}/>
                            : 
                            (info.status === Status.OPEN.Eng && !isSigned) ? 
                            <SignStudent info={info} fetchData={fetchData} setSigned={setSigned} setSnack={setSnack}/> 
                            : 
                            null
                        }
                    </Grid>
                </Grid>
            </Card>
            <Card className="maxwidth withoutround">
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Учебный год</Typography>
                    </Grid>
                    <Grid>
                        <CardContent>{defineStartAndEndYear(info.semester, info.startYear)}</CardContent>
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Семестр</Typography>
                    </Grid>
                    <Grid>
                        <CardContent>{chooseSemester(info.semester)}</CardContent>
                    </Grid>
                </Grid>
            </Card>
            <Card className="maxwidth withoutround">
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Всего мест</Typography>
                    </Grid>
                    <Grid>
                        <CardContent>{info.maximumStudentsCount}</CardContent>
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Студентов зачислено</Typography>
                    </Grid>
                    <Grid>
                        <CardContent>{info.studentsEnrolledCount}</CardContent>
                    </Grid>
                </Grid>
            </Card>
            <Card className="maxwidth withoutround downround m-8">
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Заявок на рассмотрении</Typography>
                    </Grid>
                    <Grid>
                        <CardContent>{info.studentsInQueueCount}</CardContent>
                    </Grid>
                </Grid>
            </Card>

            <Snackbar
            autoHideDuration={2000}
            color={snackState.color}
            variant="outlined"
            open={snackState.open}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >{snackState.color === "danger" ? "Произошла ошибка" : "Успешно отправлена заявка на присоединение к курсу"}
            </Snackbar>
        </>
    );
}

export default MainInfo;