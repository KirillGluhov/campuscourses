import { Button, Input, Grid, Typography, Tooltip, FormControl, FormLabel, Snackbar } from "@mui/joy";
import useValidation from "../../hooks/use-validation";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useEffect, useState } from "react";
import "../ProfilePage/profile.css";
import { useNavigate } from "react-router-dom";

function Profile()
{
    let navigate = useNavigate();

    const [state, setState] = useState({
        fullname: "",
        birthdate: "",
        email: ""
    })

    const [open, setOpen] = useState(false)
    const [color, setColor] = useState("success");

    const [error, handleValidation] = useValidation({
        fullname: false,
        birthdate: false,
        email: false
    })

    const [correct, setCorrect] = useState(true);

    useEffect(() => {

        axios.get(`${baseUrl}/profile`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {

            setState(
                {
                    fullname: response.data.fullName, 
                    birthdate: response.data.birthDate.split('T')[0], 
                    email: response.data.email
                }
            )

        })
        .catch(error => {
            if (error.response.status === 401)
            {
                localStorage.clear();
                navigate("/login");
            }
            
            console.log(error)
        })
        
    }, []);

    function handleSubmit()
    {

        let hasError = false;
        for (let element in error)
        {
            if (error[element] === true)
            {
                hasError = true;
            }

        }

        for (let element in state)
        {
            if (state[element] === "")
            {
                hasError = true;
            }
        }

        if (hasError)
        {
            setCorrect(false);
        }
        else
        {
            setCorrect(true);
        }

        console.log(state);

        if (!hasError)
        {
            const user = {fullName: state.fullname, birthDate: state.birthdate};
            axios.put(`${baseUrl}/profile`, user, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                setCorrect(true);
                setOpen(true);
                setColor("success");
            })
            .catch(error => {

                if (error.response.status === 401)
                {
                    localStorage.clear();
                    navigate("/login");
                }

                setCorrect(false);
                setOpen(true);
                setColor("danger");
            })
        }
    }

    const handleClose = () => {
        setOpen(false);
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    return (<Grid container justifyContent="center" mt={3}>
            <Grid container xl={6} lg={6} md={8} sm={10} xs={11} gap={2}>
                <Typography level="h1">Профиль</Typography>

                <Grid container xs={12}>
                    <FormControl className="maxWidth row">
                        <Grid xs={3}>
                            <FormLabel>ФИО</FormLabel>
                        </Grid>
                        <Grid xs={9}>
                        {
                            !error.fullname ?
                            <Input id="fullname" name="fullname" value={state.fullname} onChange={handleChange} onBlur={handleValidation}/> :
                            <Tooltip title="ФИО должно состоять хотя бы из одного символа" variant="outlined" color="primary">
                                <Input id="fullname" name="fullname" value={state.fullname} onChange={handleChange} onBlur={handleValidation} color="danger"/>
                            </Tooltip>
                        }
                        </Grid>
                    </FormControl>
                </Grid>

                <Grid container xs={12}>
                    <FormControl className="maxWidth row">
                        <Grid xs={3}>
                            <FormLabel>Email</FormLabel>
                        </Grid>
                        <Grid xs={9}>
                            <Typography level="body-md">{state.email}</Typography>
                        </Grid>
                    </FormControl>
                </Grid>

                <Grid container xs={12}>
                    <FormControl className="maxWidth row">
                        <Grid xs={3}>
                            <FormLabel>День рождения</FormLabel>
                        </Grid>
                        <Grid xs={9}>
                        {
                            !error.birthdate ? 
                            <Input id="birthdate" name="birthdate" type="date" value={state.birthdate} onChange={handleChange} onBlur={handleValidation}/> :
                            <Tooltip title="День рождения должно быть после 1 января 1900 года и до текущей даты" variant="outlined" color="primary">
                                <Input id="birthdate" name="birthdate" type="date" value={state.birthdate} onChange={handleChange} onBlur={handleValidation} color="danger"/>
                            </Tooltip>
                        }
                        </Grid>
                    </FormControl>
                </Grid>

                <Grid container xs={12} className="row end">
                {
                    correct ? 
                    <Button onClick={handleSubmit}>Изменить</Button> :
                    <Tooltip title="Данные некорректны" variant="outlined" color="primary">
                        <Button onClick={handleSubmit}>Изменить</Button>
                    </Tooltip>
                }
                </Grid>

                <Snackbar
                autoHideDuration={2000}
                color={color}
                variant="outlined"
                open={open}
                onClose={handleClose}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                >{color === "danger" ? "Произошла ошибка" : "Успешно сохранено"}</Snackbar>
            </Grid>
        </Grid>);
}

export default Profile;