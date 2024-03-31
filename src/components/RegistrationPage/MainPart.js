import { Typography, Input, Grid, Button, FormControl, FormLabel, FormHelperText, Tooltip } from "@mui/joy";
import useInput from "../../hooks/use-input";
import useValidation from "../../hooks/use-validation";
import { useState } from "react";
import axios from 'axios';
import {baseUrl} from "../../const/const-urls";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";

function MainPart()
{
    const navigate = useNavigate();

    const [state, handleChange] = useInput({
        fullname: "",
        birthdate: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, handleValidation] = useValidation({
        fullname: false,
        birthdate: false,
        email: false,
        password: false,
        confirmPassword: false
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
            axios.post(`${baseUrl}/registration`, state)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                setCorrect(true);

                axios.get(`${baseUrl}/roles`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
                .then(response => {
                    localStorage.setItem("isAdmin", response.data.isAdmin);
                    localStorage.setItem("isTeacher", response.data.isTeacher);
                    localStorage.setItem("isStudent", response.data.isStudent);
                    navigate("/groups/");
                })
                .catch(error => {
                    console.log(error)
                });
            })
            .catch(error => {
                console.log(error);
                setCorrect(false);
            })
        }
    }

    function handleValidationWithState(e)
    {
        handleValidation(e, state);
    }

    return (
        <Grid container justifyContent="center" mt={3}>
            <Grid container xl={6} lg={6} md={8} sm={10} xs={11} gap={2}>
                <Typography level="h1">Регистрация нового пользователя</Typography>

                <FormControl className="maxWidth">
                    <FormLabel>ФИО</FormLabel>
                    {
                        !error.fullname ?
                        <Input id="fullname" name="fullname" value={state.fullname} onChange={handleChange} onBlur={handleValidationWithState}/> :
                        <Tooltip title="ФИО должно состоять хотя бы из одного символа" variant="outlined" color="primary">
                            <Input id="fullname" name="fullname" value={state.fullname} onChange={handleChange} onBlur={handleValidationWithState} color="danger"/>
                        </Tooltip>
                    }
                </FormControl>

                <FormControl className="maxWidth">
                    <FormLabel>День рождения</FormLabel>
                    {
                        !error.birthdate ? 
                        <Input id="birthdate" name="birthdate" type="date" value={state.birthdate} onChange={handleChange} onBlur={handleValidationWithState}/> :
                        <Tooltip title="День рождения должно быть после 1 января 1900 года и до текущей даты" variant="outlined" color="primary">
                            <Input id="birthdate" name="birthdate" type="date" value={state.birthdate} onChange={handleChange} onBlur={handleValidationWithState} color="danger"/>
                        </Tooltip>
                    }
                </FormControl>

                <FormControl className="maxWidth">
                    <FormLabel>Email</FormLabel>
                    {
                        !error.email ?
                        <Input id="email" name="email" value={state.email} onChange={handleChange} onBlur={handleValidationWithState}/> :
                        <Tooltip title="Вы ввели не email" variant="outlined" color="primary">
                            <Input id="email" name="email" value={state.email} onChange={handleChange} onBlur={handleValidationWithState} color="danger"/>
                        </Tooltip>
                    }
                    <FormHelperText>Email будет использоваться для входа в систему</FormHelperText>
                </FormControl>

                <FormControl className="maxWidth">
                    <FormLabel>Пароль</FormLabel>
                    {
                        !error.password ?
                        <Input id="password" name="password" value={state.password} onChange={handleChange} onBlur={handleValidationWithState} type={visible ? 'text' : 'password'} endDecorator={<Button onClick={() => setVisible(!visible)}>{visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}</Button>}/> :
                        <Tooltip title="Пароль должен быть длиннее 6 и меньше 32 символов с хотя бы одной цифрой" variant="outlined" color="primary">
                            <Input id="password" name="password" value={state.password} onChange={handleChange} onBlur={handleValidationWithState} color="danger" type={visible ? 'text' : 'password'} endDecorator={<Button onClick={() => setVisible(!visible)}>{visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}</Button>}/>
                        </Tooltip>
                    }
                </FormControl>

                <FormControl className="maxWidth">
                    <FormLabel>Повторите пароль</FormLabel>
                    {
                        !error.confirmPassword ?
                        <Input id="confirmPassword" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} onBlur={handleValidationWithState} type={visible ? 'text' : 'password'}/> :
                        <Tooltip title="Пароли должны совпадать" variant="outlined" color="primary">
                            <Input id="confirmPassword" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} onBlur={handleValidationWithState} color="danger" type={visible ? 'text' : 'password'}/>
                        </Tooltip>
                    }
                </FormControl>

                {
                    correct ? 
                    <Button type="submit" onClick={handleSubmit}>Зарегистрироваться</Button> :
                    <Tooltip title="Данные некорректны" variant="outlined" color="primary">
                        <Button type="submit" onClick={handleSubmit}>Зарегистрироваться</Button>
                    </Tooltip>
                }
            </Grid>
        </Grid>
    );

}

export default MainPart;