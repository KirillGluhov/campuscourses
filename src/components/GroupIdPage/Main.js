import { Typography, Grid, LinearProgress } from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../const/const-urls";
import CardForCourse from "./CardForCourse";
import checkRole from "../../functions/checkRole";
import CreateCourse from "./CreateCourse";

function Main()
{
    let navigate = useNavigate();

    const location = useLocation();
    const currentGroupId = location.pathname.split("/")[2];

    const [name, setName] = useState();
    const [cards, setCards] = useState([]);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    function fetchData()
    {
        axios.get(`${baseUrl}/groups`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            const listElement = response.data.filter(listItem => listItem.id === currentGroupId)[0];
            setName(listElement.name);
        })
        .catch(error => {
            if (error.response.status === 401)
            {
                localStorage.clear();
                navigate("/login");
            }
            
            console.log(error);
        })

        axios.get(`${baseUrl}/groups/${currentGroupId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            setCards(response.data);
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

    function handleFetch()
    {
        axios.get(`${baseUrl}/groups/${currentGroupId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            setCards(response.data);
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
        <Grid container justifyContent="center" mt={3}>
            <Grid container xl={6} lg={6} md={8} sm={10} xs={11} gap={2}>
                <Grid className="maxwidth">
                    <Typography level="h1">{name ? (`Группа - ${name}`) : <LinearProgress/>}</Typography>
                </Grid>
                {isAdmin ? (
                    <CreateCourse handleFetch={handleFetch}/>
                ) : null}
                {
                    cards.map(card => (
                        <CardForCourse card={card} key={card.id} fetchData={fetchData}/>
                    ))
                }
            </Grid>
        </Grid>
    );
}

export default Main;