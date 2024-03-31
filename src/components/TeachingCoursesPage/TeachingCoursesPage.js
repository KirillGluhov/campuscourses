import Header from "../Header";
import { Sheet } from "@mui/joy";
import TeachingCourses from "./TeachingCourses";
import checkRole from "../../functions/checkRole";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkToken from "../../functions/checkToken";

function TeachingCoursesPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkRole("isTeacher"))
        {
            checkToken() ? navigate("/") : navigate("/login");
        }
      }, []);

    document.title = "Преподаваемые курсы";
    return (
        <Sheet className="minwidth-500 mb-16">
            <Header/>
            <TeachingCourses/>
        </Sheet>
    );
}

export default TeachingCoursesPage;