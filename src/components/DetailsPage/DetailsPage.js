import { Sheet } from "@mui/joy";
import Header from "../Header";
import Details from "./Details";
import "./details.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkToken from "../../functions/checkToken";

function DetailsPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkToken())
        {
            navigate("/login");
        }
      }, []);

    document.title = "Страница деталей курса";
    return (
        <Sheet className="minwidth-600 mb-16">
            <Header/>
            <Details/>
        </Sheet>
    );
}

export default DetailsPage;
