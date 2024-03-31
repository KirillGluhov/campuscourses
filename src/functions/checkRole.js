import checkToken from "./checkToken";

function checkRole(roleName)
{
    if (checkToken())
    {
        const role = localStorage.getItem(roleName);

        if (role != null)
        {
            return (role === "true");
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

export default checkRole;