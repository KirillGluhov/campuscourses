import { Typography, Grid, Button, Tooltip, Modal, ModalDialog, ModalClose, FormLabel, Snackbar, Input, Radio, RadioGroup} from "@mui/joy";
import { useEffect, useState } from "react";
import checkRole from "../../functions/checkRole";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

function Name({info, fetchData})
{
    let navigate = useNavigate();

    const [isTeacher, setTeacher] = useState(false);
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    const [teachers, setTeachers] = useState([]);

    const [currentTeacher, setCurrentTeacher] = useState(null);

    const [infoState, setInfoState] = useState({
        name: info.name,
        startYear: info.startYear,
        requirements: info.requirements,
        annotations: info.annotations,
        maximumStudentsCount: info.maximumStudentsCount,
        semester: info.semester,
        mainTeacherId: "00000000-0000-0000-0000-000000000000"
    })

    const [error, setError] = useState({
        name: false,
        startYear: false,
        requirements: false,
        annotations: false,
        maximumStudentsCount: false,
        semester: false
    })

    const handleOpenModal = () => {
        setInfoState({
            name: info.name,
            startYear: info.startYear,
            requirements: info.requirements,
            annotations: info.annotations,
            maximumStudentsCount: info.maximumStudentsCount,
            semester: info.semester,
            mainTeacherId: "00000000-0000-0000-0000-000000000000"
        });

        setOpen(true);
    }

    const [open, setOpen] = useState(false);
    const [errorInfo, setErrorInfo] = useState(false);

    const [snackState, setSnack] = useState({
        color: "success",
        open: false
    })

    function checkIsTeacher()
    {
        axios.get(`${baseUrl}/courses/${window.location.pathname.split("/")[2]}/details`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            setTeachers(response.data.teachers)
            let teachers = response.data.teachers;

            for (let teacher in teachers)
            {
                if (teachers[teacher].email === localStorage.getItem("email"))
                {
                    setTeacher(true);
                }
            }

            for (let teacher in teachers)
            {
                if (teachers[teacher].isMain)
                {
                    setCurrentTeacher(teachers[teacher].name);
                }
            }

            return false;
        })
        .catch(error => {
            if (error.response.status === 401)
            {
                localStorage.clear();
                navigate("/login");
            }

            console.log(error);
            setTeacher(false);
        })
    }

    function handleCloseModal()
    {
        setOpen(false);
        setInfoState(prevState => ({
            ...prevState,
            name: info.name,
            startYear: info.startYear,
            requirements: info.requirements,
            annotations: info.annotations,
            maximumStudentsCount: info.maximumStudentsCount,
            semester: info.semester,
            mainTeacherId: "00000000-0000-0000-0000-000000000000"
        }));

        setError(prevState => ({
            ...prevState,
            name: false,
            startYear: false,
            requirements: false,
            annotations: false,
            maximumStudentsCount: false,
            semester: false
        }));
    }

    function notNull(name)
    {
        if (infoState.name == "")
        {
            setError(prevState => ({
                ...prevState,
                [name]: true
            }));

        }
        else
        {
            setError(prevState => ({
                ...prevState,
                [name]: false
            }));
        }

    }

    function handleChange(e, name)
    {
        setInfoState(prevState => ({
            ...prevState,
            [name]: e
        }))
    }

    function handleChangeOthers(e)
    {
        const { name, value } = e.target;
        setInfoState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleChangeRadio = (event) => {

        setInfoState(prevState => ({
            ...prevState,
            ['semester']: event.target.value
        }));
      };

    function handleClose()
    {
        setSnack(prevState => ({
            ...prevState,
            open: false
        }));
    }

    const handleValidation = (e) =>
    {
        const { name, value } = e.target;

        let currentError = false;

        switch (name) 
        {
            case "startYear":
                if (isNaN(+value))
                {
                    currentError = true;
                }
                else
                {
                    if (+value >= 2000 && +value <= 2029)
                    {
                        currentError = false;
                    }
                    else
                    {
                        currentError = true;
                    }
                }
                break;
            case "maximumStudentsCount":
                if (isNaN(+value))
                {
                    currentError = true;
                }
                else
                {
                    if (+value >= 1 && +value <= 200)
                    {
                        currentError = false;
                    }
                    else
                    {
                        currentError = true;
                    }
                }
                break;
            case "semester":
                if (value !== "")
                {
                    currentError = false;
                }
                else
                {
                    currentError = true;
                }
                break;
            default:
                break;
        }

        setError({
            ...error,
            [name]: currentError
        });
    }

    function handleSend()
    {
        let hasError = false;

        for (let element in error)
        {
            if (error[element] === true)
            {
                hasError = true;
            }

        }

        for (let element in infoState)
        {
            if (infoState[element] === "")
            {
                hasError = true;
            }
        }

        if (hasError)
        {
            setErrorInfo(true);
        }
        else
        {
            setErrorInfo(false);
        }

        if (!hasError)
        {
            axios.put(`${baseUrl}/courses/${info.id}`, infoState, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                setSnack(prevState => ({
                    ...prevState,
                    open: true,
                    color: "success"
                }));

                setErrorInfo(false);

                setOpen(false);
                fetchData();
            })
            .catch(error => {
                if (error.response.status === 401)
                {
                    localStorage.clear();
                    navigate("/login");
                }

                console.log(error);
                setSnack(prevState => ({
                    ...prevState,
                    open: true,
                    color: "danger"
                }));
            })
        }
    }

    function checkAndSend()
    {
        let hasError = false;

        for (let errors in error)
        {
            if (error[errors])
            {
                hasError = true;
            }
        }

        if (hasError)
        {
            setErrorInfo(true);
        }
        else
        {
            setErrorInfo(false);

            const infoForTeacher = {
                requirements: infoState.requirements,
                annotations: infoState.annotations
            }

            axios.put(`${baseUrl}/courses/${info.id}/requirements-and-annotations`, infoForTeacher, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                setSnack(prevState => ({
                    ...prevState,
                    open: true,
                    color: "success"
                }));

                setOpen(false);
                fetchData();
            })
            .catch(error => {
                if (error.response.status === 401)
                {
                    localStorage.clear();
                    navigate("/login");
                }
                console.log(error);
                
                setSnack(prevState => ({
                    ...prevState,
                    open: true,
                    color: "danger"
                }));
            })
        }
    }

    useEffect(() => {
        checkIsTeacher();
    }, []);

    return (
    <Grid container className="maxwidth">
        <Grid className="maxwidth" container justifyContent="space-between" mb={1} mt={1}>
            <Grid container alignContent="flex-end">
                <Typography level="h1">{info.name}</Typography>
            </Grid>
        </Grid>
        <Grid className="maxwidth" container justifyContent="space-between" mb={1}>
            <Grid container alignContent="flex-end">
                <Typography level="title-lg">Основные данные курса</Typography>
            </Grid>
            {
                (isAdmin || isTeacher) ?
                <Button className="specified yellow" onClick={handleOpenModal}>Редактировать</Button> :
                null
            }
        </Grid>

        <Modal 
            open={open}
            onClose={handleCloseModal}
        >
            <ModalDialog>
                <ModalClose/>
                <Typography level="h4">Редактирование курса</Typography>
                    <Grid container gap={1} className="column one">
                        { 
                            isAdmin ?
                            <>
                                <Grid>
                                    <FormLabel>Название курса</FormLabel>
                                    {
                                        !error.name ? <Input value={infoState.name} onChange={(e) => handleChangeOthers(e)} name="name" onBlur={(e) => notNull("name")}></Input>
                                        : 
                                        <Tooltip title="Название не должно быть пустым" variant="outlined" color="primary">
                                            <Input value={infoState.name} onChange={(e) => handleChangeOthers(e)} name="name" onBlur={(e) => notNull("name")} color="danger"></Input>
                                        </Tooltip>
                                    }
                                </Grid>
                                <Grid>
                                    <FormLabel>Год начала курса</FormLabel>
                                    {
                                        !error.startYear ? <Input value={infoState.startYear} onChange={(e) => handleChangeOthers(e)} name="startYear" onBlur={(e) => handleValidation(e)}></Input>
                                        :
                                        <Tooltip title="Год начала должен быть после 2000 и до 2029" variant="outlined" color="primary">
                                            <Input value={infoState.startYear} onChange={(e) => handleChangeOthers(e)} name="startYear" onBlur={(e) => handleValidation(e)} color="danger"></Input>
                                        </Tooltip>
                                    }
                                </Grid>
                                <Grid>
                                    <FormLabel>Общее количество мест</FormLabel>
                                    {
                                        !error.maximumStudentsCount ? <Input value={infoState.maximumStudentsCount} onChange={(e) => handleChangeOthers(e)} name="maximumStudentsCount" onBlur={(e) => handleValidation(e)}></Input>
                                        :
                                        <Tooltip title="Количество мест - от 1 до 200" variant="outlined" color="primary">
                                            <Input value={infoState.maximumStudentsCount} onChange={(e) => handleChangeOthers(e)} name="maximumStudentsCount" onBlur={(e) => handleValidation(e)} color="danger"></Input>
                                        </Tooltip>
                                    }
                                </Grid>
                                <Grid>
                                    <FormLabel>Семестр</FormLabel>
                                    {
                                        !error.semester ? 
                                        (<RadioGroup name="semester" value={infoState.semester} className="row one" onChange={handleChangeRadio} onBlur={(e) => handleValidation(e)}>
                                            <Radio value="Autumn" label="Осенний" variant="outlined" className="m-0 one"/>
                                            <Radio value="Spring" label="Весенний" variant="outlined" className="m-0 one ml"/>
                                        </RadioGroup>) 
                                        :
                                        <Tooltip title="Не указан семестр" variant="outlined" color="primary">
                                            <RadioGroup name="semester" value={infoState.semester} className="row one" onChange={handleChangeRadio} onBlur={(e) => handleValidation(e)} color="danger">
                                                <Radio value="Autumn" label="Осенний" variant="outlined" className="m-0 one"/>
                                                <Radio value="Spring" label="Весенний" variant="outlined" className="m-0 one ml"/>
                                            </RadioGroup>
                                        </Tooltip>
                                    }
                                </Grid>
                                <Grid>
                                    <FormLabel>Требования</FormLabel>
                                    <ReactQuill theme="snow" value={infoState.requirements} onChange={(e) => handleChange(e, "requirements")} name="requirements" onBlur={() => notNull("requirements")}/>
                                </Grid>
                                <Grid>
                                    <FormLabel>Аннотации</FormLabel>
                                    <ReactQuill theme="snow" value={infoState.annotations} onChange={(e) => handleChange(e, "annotations")} name="annotations" onBlur={() => notNull("annotations")}/>
                                </Grid>
                                <Grid>
                                    <FormLabel>Основной преподаватель курса: {`${currentTeacher}`}</FormLabel>
                                </Grid>
                                <Grid container gap={1} className="end">
                                    <Button color="neutral" onClick={handleCloseModal}>Отмена</Button>
                                    {
                                        errorInfo ? 
                                        <Tooltip title="Вы ввели некорректные данные" variant="outlined" color="primary">
                                            <Button onClick={handleSend}>Сохранить</Button>
                                        </Tooltip> : <Button onClick={handleSend}>Сохранить</Button>
                                    }
                                </Grid>
                            </> 
                            :
                            isTeacher ? 
                            <>
                                <Grid>
                                    <FormLabel>Требования</FormLabel>
                                    <ReactQuill theme="snow" value={infoState.requirements} onChange={(e) => handleChange(e, "requirements")} name="requirements" onBlur={() => notNull("requirements")}/>
                                </Grid>
                                <Grid>
                                    <FormLabel>Аннотации</FormLabel>
                                    <ReactQuill theme="snow" value={infoState.annotations} onChange={(e) => handleChange(e, "annotations")} name="annotations" onBlur={() => notNull("annotations")}/>
                                </Grid>
                                <Grid container gap={1} className="end">
                                    <Button color="neutral" onClick={handleCloseModal}>Отмена</Button>
                                    {
                                        errorInfo ? 
                                        <Tooltip title="Данные некорректны" variant="outlined" color="primary">
                                            <Button onClick={checkAndSend}>Сохранить</Button>
                                        </Tooltip> : 
                                        <Button onClick={checkAndSend}>Сохранить</Button>
                                    }
                                </Grid>
                            </> : null
                        }
                    </Grid>
            </ModalDialog>
        </Modal>

        <Snackbar
            autoHideDuration={2000}
            color={snackState.color}
            variant="outlined"
            open={snackState.open}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >{snackState.color === "danger" ? "Произошла ошибка" : "Успешно отредактировано"}
        </Snackbar>
    </Grid>);
}

export default Name;