import { CardContent, Card, Grid, Typography, Snackbar, LinearProgress } from "@mui/joy";
import { defineStartAndEndYear } from "../../functions/defineStartAndEndYear";
import { chooseSemester } from "../../functions/chooseSemester";
import { chooseStatus } from "../../functions/chooseStatus";
import { chooseColor } from "../../functions/chooseColor";
import checkRole from "../../functions/checkRole";
import { useEffect, useState } from "react";
import { Status } from "../../const/const-statuses";
import ChangeStatus from "./ChangeStatus";
import { useDispatch, useSelector } from 'react-redux';
import SignStudent from "./SignStudent";

function MainInfo({fetchData})
{
    const [isTeacher, setTeacher] = useState(false);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));
    const [isSigned, setSigned] = useState(false);

    const info = useSelector(state => state.auth.info);

    useEffect(() => {
        if (info)
        {
            checkTeacher();
            checkSigned();
        }
    }, [info]);

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
                setSigned(true);
                return true;
            }
        }

        setSigned(false);
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
                            {info ? <Typography color={chooseColor(info.status)}>{chooseStatus(info.status)}</Typography> : <LinearProgress/>}
                        </CardContent>
                    </Grid>
                </Grid>
                <Grid xs={6} container justifyContent="end">
                    <Grid container>
                        {
                            info ?
                                ((isAdmin || isTeacher) ? 
                                <ChangeStatus fetchData={fetchData}/>
                                : 
                                (info.status === Status.OPEN.Eng && !isSigned) ? 
                                <SignStudent fetchData={fetchData} setSigned={setSigned} setSnack={setSnack}/> 
                                : 
                                null)
                            : 
                            <LinearProgress/>
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
                        {info ? <CardContent>{defineStartAndEndYear(info.semester, info.startYear)}</CardContent> : <LinearProgress/>}
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Семестр</Typography>
                    </Grid>
                    <Grid>
                        {info ? <CardContent>{chooseSemester(info.semester)}</CardContent> : <LinearProgress/>}
                    </Grid>
                </Grid>
            </Card>
            <Card className="maxwidth withoutround">
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Всего мест</Typography>
                    </Grid>
                    <Grid>
                        {info ? <CardContent>{info.maximumStudentsCount}</CardContent> : <LinearProgress/>}
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Студентов зачислено</Typography>
                    </Grid>
                    <Grid>
                        {info ? <CardContent>{info.studentsEnrolledCount}</CardContent> : <LinearProgress/>}
                    </Grid>
                </Grid>
            </Card>
            <Card className="maxwidth withoutround downround m-8">
                <Grid xs={6}>
                    <Grid>
                        <Typography level="title-lg">Заявок на рассмотрении</Typography>
                    </Grid>
                    <Grid>
                        {info ? <CardContent>{info.studentsInQueueCount}</CardContent> : <LinearProgress/>}
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