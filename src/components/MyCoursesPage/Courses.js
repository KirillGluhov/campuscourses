import CardForCourse from "../GroupIdPage/CardForCourse";
import { baseUrl } from "../../const/const-urls";
import axios from "axios";
import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function Courses()
{
    let navigate = useNavigate();
    const [cards, setCards] = useState([]);

    function fetchData()
    {
        axios.get(`${baseUrl}/courses/my`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
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
                <Typography level="h1">Мои курсы</Typography>
            </Grid>
            {
                cards.map(card => (
                    <CardForCourse key={card.id} card={card}/>
                ))
            }
        </Grid>
    </Grid>);
}

export default Courses;