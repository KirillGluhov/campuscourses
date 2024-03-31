import Header from "../Header";
import { Sheet } from "@mui/joy";
import Main from "./Main";
import "./group.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkToken from "../../functions/checkToken";

function GroupIdPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkToken())
        {
            navigate("/login");
        }
      }, []);

    document.title = "Курсы группы";
    return (
        <Sheet className="minwidth-600 mb-16">
            <Header/>
            <Main/>
        </Sheet>
    );


}

export default GroupIdPage;