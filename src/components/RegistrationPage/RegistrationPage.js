import Header from "../Header";
import MainPart from "./MainPart";
import { Sheet } from "@mui/joy";
import "./registration.css";
import { useNavigate } from "react-router-dom";
import checkToken from "../../functions/checkToken";
import { useEffect } from "react";

function RegistrationPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (checkToken())
        {
            navigate("/");
        }
      }, []);

    document.title = "Регистрация";
    return (
        <Sheet className="minwidth-400">
            <Header/>
            <MainPart/>
        </Sheet>
    );


}

export default RegistrationPage;