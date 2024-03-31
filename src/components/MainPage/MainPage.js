import Header from "../Header";
import Greeting from "./Greeting";
import "../MainPage/mainpage.css";
import { Sheet } from "@mui/joy";

function MainPage()
{
    document.title = "Главная страница";
    return (
        <Sheet className="minwidth-300">
            <Header/>
            <Greeting/>
        </Sheet>
    );
}

export default MainPage;