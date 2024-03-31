import { Typography, Grid, List, ListItem, ListItemContent, ListItemButton, Divider } from "@mui/joy";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import "../GroupsCampusPage/groupscampus.css";
import checkRole from "../../functions/checkRole";
import CreateButton from "./CreateButton";
import GroupCard from "./GroupCard";
import { useNavigate } from "react-router-dom";

function CampusGroups()
{
    const navigate = useNavigate();

    const [listData, handleList] = useState([]);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    function fetchData()
    {
        axios.get(`${baseUrl}/groups`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            handleList(response.data);
        })
        .catch(error => {
            if (error.response.status === 401)
            {
                localStorage.clear();
                navigate("/login");
            }
            
            console.log(error)
        });
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <Grid container justifyContent="center" mt={3}>
            <Grid container xl={6} lg={6} md={8} sm={10} xs={11} gap={2}>
                <Typography level="h1" className="maximum">Группы кампусных курсов</Typography>
                {
                    isAdmin ? 
                    (
                        <>
                            <CreateButton handleList={handleList}/>
                            <Grid>
                                <List className="groups">
                                <Divider/>
                                {
                                    listData.map(item => 
                                        (
                                            <Fragment key={item.id}>
                                                <GroupCard item={item} handleList={handleList}/>
                                                <Divider/>
                                            </Fragment>
                                        )
                                    )
                                }
                                </List>
                            </Grid>
                        </>
                    )
                    : 
                    (
                        <List className="groups">
                            <Divider/>
                            {
                                
                                listData.map(item => 
                                    (
                                        <Fragment key={item.id}>
                                            <ListItem id={item.id}>
                                            <ListItemButton className="veryHeight" onClick={() => navigate(`/groups/${item.id}`)}>
                                                <ListItemContent className="wrap-text">{item.name}</ListItemContent>
                                            </ListItemButton>
                                            </ListItem>
                                            <Divider/>
                                        </Fragment>
                                    )
                                )
                            }
                        </List>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default CampusGroups;