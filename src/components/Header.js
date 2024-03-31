import { Typography, Link, Sheet, Grid, Button } from "@mui/joy";
import useResize from "../hooks/use-resize";
import useHide from "../hooks/use-hide";
import MenuIcon from '@mui/icons-material/Menu';
import {Pages} from "../const/const-pages";
import { useState, useEffect } from "react";
import useLogout from "../hooks/use-logout";
import checkToken from "../functions/checkToken";
import checkRole from "../functions/checkRole";
import { useLocation } from "react-router-dom";
import "../index.css";
import useLocalStorage from "../hooks/use-localstorage";

function Header(props)
{
    let location = useLocation();

    const logout = useLogout();

    const {isScreenMd} = useResize();
    const [hideLinks, toggle] = useHide(false);

    const [isLogged, setIsLogged] = useState(checkToken());
    const [isStudent, setIsLoggedStudent] = useState(checkRole("isStudent"));
    const [isTeacher, setIsLoggedTeacher] = useState(checkRole("isTeacher"));

    useEffect(() => {
        setIsLogged(checkToken())
        setIsLoggedStudent(checkRole("isStudent"));
        setIsLoggedTeacher(checkRole("isTeacher"));
    }, [location]);

    let brand = <Typography level="h3" className="whiteText brand">Кампусные курсы</Typography>;

    return (
        <>
        {
            isLogged ? 
            (
                (isScreenMd) ? 
                (
                    <Grid container className="startAndEnd mainColor minweight-270" py={3} px={1}>
                        <Grid className="dontChangeWidth">
                            {brand}
                        </Grid>
                        <Grid container className="startAndEnd stretchWidthInAllWidth">
                            <Grid container xl={8} lg={8}>
                                <Link mx={1} sx={{color: 'white'}} className="whiteText link" href="/groups/">Группы курсов</Link>
                                {isStudent ? <Link mx={1} sx={{color: 'white'}} className="whiteText link" href="/courses/my/">Мои курсы</Link> : null}
                                {isTeacher ? <Link mx={1} sx={{color: 'white'}} className="whiteText link" href="/courses/teaching/">Преподаваемые курсы</Link> : null}
                            </Grid>
                            <Grid container xl={4} lg={4} className="leftEdge">
                                <Link mx={1} sx={{color: 'white'}} className="whiteText link" href="/profile/">{localStorage.getItem("email")}</Link>
                                <Link mx={1} sx={{color: 'white'}} className="whiteText link" onClick={logout}>Выход</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                ) 
                : 
                (
                    <Grid container className="startAndEnd mainColor minweight-270" direction='column' py={3} px={1}>
                        <Grid container direction='column'>
                            <Grid container className="startAndEnd">
                                {brand}
                                <Button onClick={toggle} className="deletePaddings"><MenuIcon fontSize="large"/></Button>
                            </Grid>
                            <Grid container direction='column' className={`links ${!hideLinks ? 'hidden' : ''}`}>
                                <Link xs={12} sx={{color: 'white'}} className="whiteText link" href="/groups/">Группы курсов</Link>
                                {isStudent ? <Link xs={12} sx={{color: 'white'}} className="whiteText link" href="/courses/my/">Мои курсы</Link> : null}
                                {isTeacher ? <Link xs={12} sx={{color: 'white'}} className="whiteText link" href="/courses/teaching/">Преподаваемые курсы</Link> : null}
                                <Link xs={12} sx={{color: 'white'}} className="whiteText link" href="/profile/">{localStorage.getItem("email")}</Link>
                                <Link xs={12} sx={{color: 'white'}} className="whiteText link" onClick={logout}>Выход</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            ) 
            : 
            (
                isScreenMd ?
                (
                    <Grid container className="startAndEnd mainColor minweight-270" py={3} px={1}>
                        <Grid className="dontChangeWidth">
                            {brand}
                        </Grid>
                        <Grid container className="startAndEnd stretchWidthInAllWidth">
                            <Grid container xl={8} lg={8}>
                            </Grid>
                            <Grid container xl={4} lg={4} className="leftEdge">
                                <Link mx={1} sx={{color: 'white'}} className="whiteText link" href="/registration/">Регистрация</Link>
                                <Link mx={1} sx={{color: 'white'}} className="whiteText link" href="/login/">Вход</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                )
                : 
                (
                    <Grid container className="startAndEnd mainColor minweight-270" direction='column' py={3} px={1}>
                        <Grid container direction='column'>
                            <Grid container className="startAndEnd">
                                {brand}
                                <Button onClick={toggle} className="deletePaddings"><MenuIcon fontSize="large"/></Button>
                            </Grid>
                            <Grid container direction='column' className={`links ${!hideLinks ? 'hidden' : ''}`}>
                                <Link xs={12} sx={{color: 'white'}} className="whiteText link" href="/registration/">Регистрация</Link>
                                <Link xs={12} sx={{color: 'white'}} className="whiteText link" href="/login/">Вход</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            )
        }
        </>
    );
}

export default Header;