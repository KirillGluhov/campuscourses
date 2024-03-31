export function checkTeacher(info)
{
    let teachers = info.teachers;

    for (let teacher in teachers)
    {
        if (teachers[teacher].email == localStorage.getItem("email"))
        {
            return true;
        }
    }
    return false;
}