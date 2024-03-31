import { baseUrl } from "../../const/const-urls";
import { useEffect, useState } from "react";
import axios from "axios";
import Name from "./Name";
import { Grid } from "@mui/joy";
import MainInfo from "./MainInfo";
import SecondaryInfo from "./SecondaryInfo";
import TeachersAndStudents from "./TeachersAndStudents";
import { useNavigate } from "react-router-dom";

function Details()
{
    let navigate = useNavigate();

    const [info, setInfo] = useState([]);

    function fetchData()
    {
        axios.get(`${baseUrl}/courses/${window.location.pathname.split("/")[2]}/details`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            setInfo(response.data);
        })
        .catch(error => {
            if (error.response.status === 401)
            {
                localStorage.clear();
                navigate("/login");
            }

            console.log(error);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    <Grid container mx={5}>
        <Name info={info} fetchData={fetchData}/>
        <MainInfo info={info} fetchData={fetchData}/>
        <SecondaryInfo info={info} fetchData={fetchData}/>
        <TeachersAndStudents info={info} fetchData={fetchData}/>
    </Grid>);
}

export default Details;