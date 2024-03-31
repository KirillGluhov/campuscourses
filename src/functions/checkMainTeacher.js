export function checkMainTeacher(info)
{
    let teachers = info.teachers;

    for (let teacher in teachers)
    {
        if (teachers[teacher].email === localStorage.getItem("email") && teachers[teacher].isMain)
        {
            return true;
        }
    }
    return false;
}