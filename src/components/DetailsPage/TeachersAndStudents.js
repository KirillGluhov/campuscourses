import { Tab, TabList,TabPanel, Typography, Tabs, List, Divider, LinearProgress } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import checkRole from "../../functions/checkRole";
import AddTeacher from "./AddTeacher";
import TeacherCard from "./TeacherCard";
import StudentCard from "./StudentCard";
import { useDispatch, useSelector } from 'react-redux';

function TeachersAndStudents({fetchData})
{
    const [isMainTeacher, setMainTeacher] = useState(false);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    const info = useSelector(state => state.auth.info);

    useEffect(() => {
        if (info) 
        {
            checkIsMainTeacher();
        }
    }, [info]);

    function checkIsMainTeacher()
    {
        let teachers = info.teachers;

        for (let teacher in teachers)
        {
            if (teachers[teacher].email === localStorage.getItem("email") && teachers[teacher].isMain)
            {
                setMainTeacher(true);
                return true;
            }
        }

        setMainTeacher(false);
        return false;
    }

    return (
        <Tabs className="mt-8 maxwidth" defaultValue={0} >
            <TabList disableUnderline>
                <Tab className="maxwidth tabName" disableIndicator>
                    <Typography>Преподаватели</Typography>
                </Tab>
                <Tab className="maxwidth tabName" disableIndicator>
                    <Typography>Студенты</Typography>
                </Tab>
            </TabList>
            <TabPanel className="panel" value={0}>
                {info ? ((isMainTeacher || isAdmin) ? <AddTeacher fetchData={fetchData}/> : null) : <LinearProgress/>}
                <List className="mt-8 listOfElements">
                    {info ? (info.teachers.map((teacher, index) => (
                        <Fragment key={teacher.email}>
                            <TeacherCard teacher={teacher}/>
                            {index !== info.teachers.length - 1 && <Divider/>}
                        </Fragment>
                    ))) : <LinearProgress/>}
                </List>
            </TabPanel>
            <TabPanel className="panel" value={1}>
            <List className="mt-8 listOfElements">
                    {info ? (info.students.map((student, index) => (
                        <Fragment key={student.id}>
                            <StudentCard student={student} fetchData={fetchData}/>
                            {index !== info.students.length - 1 && <Divider/>}
                        </Fragment>
                    ))) : <LinearProgress/>}
                </List>
            </TabPanel>
        </Tabs>
    );
}

export default TeachersAndStudents;