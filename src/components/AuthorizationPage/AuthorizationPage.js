import Header from "../Header";
import { Sheet } from "@mui/joy";
import "./authorization.css";
import MainPart from "../AuthorizationPage/MainPart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkToken from "../../functions/checkToken";

function AuthorizationPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (checkToken())
        {
            navigate("/");
        }
      }, []);

    document.title = "Авторизация";
    return (
        <Sheet className="minwidth-400">
            <Header/>
            <MainPart/>
        </Sheet>
    );


}

export default AuthorizationPage;