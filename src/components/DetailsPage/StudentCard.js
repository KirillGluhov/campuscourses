import {ListItem, Grid, Chip, Typography} from "@mui/joy";
import { StudentStatus } from "../../const/const-studentstatuses";
import { useEffect, useState } from "react";
import checkRole from "../../functions/checkRole";
import { chooseMark } from "../../functions/chooseMark";
import Result from "./Result";
import { Results } from "../../const/const-result";
import RequestButton from "./RequestButton";

function StudentCard({student, fetchData, info})
{

    const [isTeacher, setTeacher] = useState(false);
    const [isYou, setIsYou] = useState(false);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    function checkIsTeacher()
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

    useEffect(() => {
        checkIsTeacher();
        defineIsYou();
    })

    function defineIsYou()
    {
        let students = info.students;

        for (let stud in students)
        {
            if (students[stud].email === localStorage.getItem("email"))
            {
                setIsYou(true);
                return true;
            }
        }

        setIsYou(false);
        return false;
    }

    return (
        <>
        {
            student.status === StudentStatus.ACCEPTED.Eng
            ? 
            <ListItem className="p-8">
                <Grid xs={6}>
                    <Grid container gap={1}>
                        <Typography level="title-lg" className="wrap-text">{student.name}</Typography>
                    </Grid>
                    <Typography>
                        Статус - <span className="wrap-text Accepted">{`${StudentStatus.ACCEPTED.Rus}`}</span>
                    </Typography>
                    <Typography className="wrap-text">{student.email}</Typography>
                </Grid>
                {
                    (isAdmin || isTeacher || isYou)
                    ? 
                    <>
                        <Grid xs={6}>
                            <Grid container>
                                {
                                    (isTeacher || isAdmin)
                                    ? 
                                    <Result student={student} id={info.id} fetchData={fetchData} type={Results.MIDTERM}/>
                                    : 
                                    <Typography>Промежуточная аттестация</Typography>
                                }
                                <Typography mx={1}>-</Typography>
                            </Grid>
                            <Chip className={`${student.midtermResult} specialcolor`}>{chooseMark(student.midtermResult)}</Chip>
                        </Grid>
                        <Grid xs={6}>
                            <Grid container>
                                {
                                    (isTeacher || isAdmin) 
                                    ? 
                                    <Result student={student} id={info.id} fetchData={fetchData} type={Results.FINAL}/>
                                    : 
                                    <Typography>Финальная аттестация</Typography>
                                }
                                <Typography mx={1}>-</Typography>
                            </Grid>
                            <Chip className={`${student.finalResult} specialcolor`}>{chooseMark(student.finalResult)}</Chip>
                        </Grid>
                    </> 
                    : 
                    null
                }
            </ListItem>
            :
            student.status === StudentStatus.DECLINED.Eng
            ?
            <ListItem className="p-8">
                <Grid>
                    <Grid container gap={1}>
                        <Typography level="title-lg" className="wrap-text">{student.name}</Typography>
                    </Grid>
                    <Typography>
                        Статус - <span className="wrap-text Declined">{`${StudentStatus.DECLINED.Rus}`}</span>
                    </Typography>
                    <Typography className="wrap-text">{student.email}</Typography>
                </Grid>
            </ListItem>
            :
            student.status === StudentStatus.INQUEUE.Eng
            ?
            <ListItem className="p-8 startAndEnd stretch">
                <Grid container className="maxwidth" justifyContent="space-between">
                    <Grid>
                        <Grid container gap={1}>
                            <Typography level="title-lg" className="wrap-text">{student.name}</Typography>
                        </Grid>
                        <Typography>
                            Статус - <span className="wrap-text InQueue">{`${StudentStatus.INQUEUE.Rus}`}</span>
                        </Typography>
                        <Typography className="wrap-text">{student.email}</Typography>
                    </Grid>
                    <Grid gap={2} container>
                        <RequestButton fetchData={fetchData} student={student} id={info.id} type={StudentStatus.ACCEPTED}/>
                        <RequestButton fetchData={fetchData} student={student} id={info.id} type={StudentStatus.DECLINED}/>
                    </Grid>
                </Grid>
            </ListItem>
            :
            null
        }
        </>
    );
}

export default StudentCard;