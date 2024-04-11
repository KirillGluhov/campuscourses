import { baseUrl } from "../../const/const-urls";
import { useEffect, useState } from "react";
import axios from "axios";
import Name from "./Name";
import { Grid } from "@mui/joy";
import MainInfo from "./MainInfo";
import SecondaryInfo from "./SecondaryInfo";
import TeachersAndStudents from "./TeachersAndStudents";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Actions } from "../../const/const-actions";

function Details()
{
    let navigate = useNavigate();

    const info = useSelector(state => state.auth.info);
    const dispatch = useDispatch();

    function fetchData()
    {
        axios.get(`${baseUrl}/courses/${window.location.pathname.split("/")[2]}/details`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {

            dispatch({
                type: Actions.DEFINE,
                payload: response.data
            })

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
        <Name fetchData={fetchData}/>
        <MainInfo fetchData={fetchData}/>
        <SecondaryInfo fetchData={fetchData}/>
        <TeachersAndStudents fetchData={fetchData}/>
    </Grid>);
}

export default Details;