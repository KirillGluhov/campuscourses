import Header from "../Header";
import { Sheet } from "@mui/joy";
import Profile from "./Profile";
import checkToken from "../../functions/checkToken";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";

function ProfilePage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkToken())
        {
            navigate("/login");
        }
      }, []);

    document.title = "Профиль";
    return (
        <Sheet className="minwidth-400">
            <Header/>
            <Profile/>
        </Sheet>
    );
}

export default ProfilePage;