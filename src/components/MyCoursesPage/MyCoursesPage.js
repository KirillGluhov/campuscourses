import Header from "../Header";
import { Sheet } from "@mui/joy";
import Courses from "./Courses";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkRole from "../../functions/checkRole";
import checkToken from "../../functions/checkToken";

function MyCoursesPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkRole("isStudent"))
        {
            checkToken() ? navigate("/") : navigate("/login");
        }
      }, []);

    document.title = "Мои курсы";
    return (
        <Sheet className="minwidth-500 mb-16">
            <Header/>
            <Courses/>
        </Sheet>
    );
}

export default MyCoursesPage;