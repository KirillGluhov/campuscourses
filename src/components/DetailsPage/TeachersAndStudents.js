import { Tab, TabList,TabPanel, Typography, Tabs, List, Divider } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import checkRole from "../../functions/checkRole";
import AddTeacher from "./AddTeacher";
import TeacherCard from "./TeacherCard";
import StudentCard from "./StudentCard";

function TeachersAndStudents({info, fetchData})
{
    const [isMainTeacher, setMainTeacher] = useState(false);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    useEffect(() => {
        checkIsMainTeacher();
    });

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
                {(isMainTeacher || isAdmin) ? <AddTeacher info={info} fetchData={fetchData}/> : null}
                <List className="mt-8 listOfElements">
                    {info.teachers && info.teachers.map((teacher, index) => (
                        <Fragment key={teacher.email}>
                            <TeacherCard teacher={teacher}/>
                            {index !== info.teachers.length - 1 && <Divider/>}
                        </Fragment>
                    ))}
                </List>
            </TabPanel>
            <TabPanel className="panel" value={1}>
            <List className="mt-8 listOfElements">
                    {info.students && info.students.map((student, index) => (
                        <Fragment key={student.id}>
                            <StudentCard student={student} fetchData={fetchData} info={info}/>
                            {index !== info.students.length - 1 && <Divider/>}
                        </Fragment>
                    ))}
                </List>
            </TabPanel>
        </Tabs>
    );
}

export default TeachersAndStudents;