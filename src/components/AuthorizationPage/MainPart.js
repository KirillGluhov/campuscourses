import useValidationAuth from "../../hooks/use-validationforauth";
import useInput from "../../hooks/use-input";
import { Typography, Input, Grid, Button, FormControl, FormLabel, Tooltip } from "@mui/joy";
import { useState } from "react";
import axios from 'axios';
import {baseUrl} from "../../const/const-urls";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

function MainPart()
{
    const navigate = useNavigate();

    const [state, handleChange] = useInput({
        email: "",
        password: ""
    })

    const [error, handleValidation] = useValidationAuth({
        email: false,
        password: false
    })

    const [visible, setVisible] = useState(false);

    const [correct, setCorrect] = useState(true);

    function handleSubmit(e)
    {
        e.preventDefault();
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

        localStorage.setItem("email", state.email);

        if (!hasError)
        {
            axios.post(`${baseUrl}/login`, state)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                setCorrect(true);

                axios.get(`${baseUrl}/roles`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
                .then(response => {
                    localStorage.setItem("isAdmin", response.data.isAdmin);
                    localStorage.setItem("isTeacher", response.data.isTeacher);
                    localStorage.setItem("isStudent", response.data.isStudent);
                    navigate('/groups');
                })
                .catch(error => {
                    console.log(error)
                });
            })
            .catch(error => {
                console.log(error);
                setCorrect(false);
            });
        }
    }

    return (
        <Grid container justifyContent="center" mt={3}>
            <Grid container xl={6} lg={6} md={8} sm={10} xs={11} gap={2}>
                <Typography level="h1">Авторизация</Typography>

                <FormControl className="maxWidth">
                    <FormLabel>Email</FormLabel>
                    {
                        !error.email ?
                        <Input id="email" name="email" value={state.email} onChange={handleChange} onBlur={handleValidation}/> :
                        <Tooltip title="Вы ввели не email" variant="outlined" color="primary">
                            <Input id="email" name="email" value={state.email} onChange={handleChange} onBlur={handleValidation} color="danger"/>
                        </Tooltip>
                    }
                </FormControl>

                <FormControl className="maxWidth">
                    <FormLabel>Пароль</FormLabel>
                    {
                        !error.password ?
                        <Input id="password" name="password" value={state.password} onChange={handleChange} onBlur={handleValidation} type={visible ? 'text' : 'password'} endDecorator={<Button onClick={() => setVisible(!visible)}>{visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}</Button>}/> :
                        <Tooltip title="Пароль должен быть длиннее 6 и меньше 32 символов с хотя бы одной цифрой" variant="outlined" color="primary">
                            <Input id="password" name="password" value={state.password} onChange={handleChange} onBlur={handleValidation} type={visible ? 'text' : 'password'} color="danger" endDecorator={<Button onClick={() => setVisible(!visible)}>{visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}</Button>}/>
                        </Tooltip>
                    }
                </FormControl>

                {
                    correct ? 
                    <Button type="submit" onClick={handleSubmit}>Войти</Button> :
                    <Tooltip title="Данные входа некорректны" variant="outlined" color="primary">
                        <Button type="submit" onClick={handleSubmit}>Войти</Button>
                    </Tooltip>
                }
            </Grid>
        </Grid>
    );
}

export default MainPart;