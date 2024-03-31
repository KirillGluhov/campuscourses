import Header from "../Header";
import { Sheet } from "@mui/joy";
import CampusGroups from "../GroupsCampusPage/CampusGroups";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import checkToken from "../../functions/checkToken";

function GroupCampusPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkToken())
        {
            navigate("/login");
        }
      }, []);

    document.title = "Группы кампусных курсов";
    return (
        <Sheet className="minwidth-500 mb-16">
            <Header/>
            <CampusGroups/>
        </Sheet>
    );
}

export default GroupCampusPage;