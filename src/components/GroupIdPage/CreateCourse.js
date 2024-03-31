import { Grid, Button, FormLabel, ModalClose, Select, Typography, Modal, ModalDialog, Option, Input, Radio, RadioGroup, Snackbar, Tooltip } from "@mui/joy"
import { useState, useEffect } from "react";
import useInputReset from "../../hooks/use-inputreset";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { baseUrl } from "../../const/const-urls";
import axios from "axios";
import useValidationCourse from "../../hooks/use-validationcourse";
import { useNavigate } from "react-router-dom";

function CreateCourse({handleFetch})
{
    let navigate = useNavigate();

    const [state, handleChange, reset] = useInputReset({
        name: "",
        startYear: "",
        maximumStudentsCount: "",
        semester: "",
    })

    const [requirements, setReq] = useState("");
    const [annotations, setAnn] = useState("");
    const [mainTeacherId, setId] = useState("");

    const [error, handleValidation] = useValidationCourse({
        name: false,
        startYear: false,
        maximumStudentsCount: false,
        semester: false
    })
    const [otherErrors, setOtherErrors] = useState({
        requirements: false,
        annotations: false,
        mainTeacherId: false
    })

    const [color, setColor] = useState("success");
    const [openSnack, setOpenSnack] = useState(false);

    const [errored, setErrored] = useState(false);


    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData()
    {
        axios.get(`${baseUrl}/users`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            setUsers(response.data);
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

    const [open, setOpen] = useState(false);

    function handleClick()
    {
        setOpen(true);
    }

    function handleCloseModal()
    {
        setOpen(false);
        reset()
        setAnn("");
        setReq("");
        setId("");
    }

    const handleSaveSelected = (e, value) => {
        setId(value);
    }

    function handleClose()
    {
        setOpenSnack(false);
    }

    function handleValidateOthers(value, key)
    {
        if (value.length > 0)
        {
            setOtherErrors(prevErrors => ({
                ...prevErrors,
                [key]: false
            }));
        }
        else
        {
            setOtherErrors(prevErrors => ({
                ...prevErrors,
                [key]: true
            }));
        }
    }

    function handleSend()
    {
        const course = {
            name: state.name,
            startYear: state.startYear,
            maximumStudentsCount: state.maximumStudentsCount,
            semester: state.semester,
            requirements: requirements,
            annotations: annotations,
            mainTeacherId: mainTeacherId
        };

        const allErrors = {
            name: error.name,
            startYear: error.startYear,
            maximumStudentsCount: error.maximumStudentsCount,
            semester: error.semester,
            requirements: otherErrors.requirements,
            annotations: otherErrors.annotations,
            mainTeacherId: otherErrors.mainTeacherId
        }

        let hasErrors = false;

        for (let errorValue in allErrors)
        {
            if (allErrors[errorValue])
            {
                hasErrors = true;
            }
        }

        for (let errorValue in course)
        {
            if (course[errorValue] === "")
            {
                hasErrors = true;
            }
        }

        if (hasErrors)
        {
            setErrored(true);
        }
        else
        {
            setErrored(false);
        }

        if (!hasErrors)
        {
            axios.post(`${baseUrl}/groups/${window.location.pathname.split("/")[2]}`, course, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                setColor("success");
                setOpenSnack(true);
                handleCloseModal();
                handleFetch();

            })
            .catch(error => {
                if (error.response.status === 401)
                {
                    localStorage.clear();
                    navigate("/login");
                }
                
                console.log(error);
                setColor("danger");
                setOpenSnack(true);
                handleCloseModal();
                handleFetch();
            })
        }
    }

    return (
    <Grid>
        <Button onClick={handleClick}>Создать курс</Button>

        <Modal 
            open={open}
            onClose={handleCloseModal}
        >
            <ModalDialog>
                <ModalClose/>
                <Typography level="h4">Создание курса</Typography>
                    <Grid container gap={1} className="column one">
                        <Grid>
                            <FormLabel>Название курса</FormLabel>
                            {
                                !error.name ? <Input value={state.name} onChange={handleChange} name="name" onBlur={handleValidation}></Input>
                                : 
                                <Tooltip title="Название не должно быть пустым" variant="outlined" color="primary">
                                    <Input value={state.name} onChange={handleChange} name="name" onBlur={handleValidation} color="danger"></Input>
                                </Tooltip>
                            }
                        </Grid>
                        <Grid>
                            <FormLabel>Год начала курса</FormLabel>
                            {
                                !error.startYear ? <Input value={state.startYear} onChange={handleChange} name="startYear" onBlur={handleValidation}></Input>
                                :
                                <Tooltip title="Год начала должен быть после 2000 и до 2029" variant="outlined" color="primary">
                                    <Input value={state.startYear} onChange={handleChange} name="startYear" onBlur={handleValidation} color="danger"></Input>
                                </Tooltip>
                            }
                        </Grid>
                        <Grid>
                            <FormLabel>Общее количество мест</FormLabel>
                            {
                                !error.maximumStudentsCount ? <Input value={state.maximumStudentsCount} onChange={handleChange} name="maximumStudentsCount" onBlur={handleValidation}></Input>
                                :
                                <Tooltip title="Количество мест - от 1 до 200" variant="outlined" color="primary">
                                    <Input value={state.maximumStudentsCount} onChange={handleChange} name="maximumStudentsCount" onBlur={handleValidation} color="danger"></Input>
                                </Tooltip>
                            }
                        </Grid>
                        <Grid>
                            <FormLabel>Семестр</FormLabel>
                            {
                                !otherErrors.semester ? 
                                (<RadioGroup name="semester" className="row one" onChange={handleChange} onBlur={handleValidation}>
                                    <Radio value="Autumn" label="Осенний" variant="outlined" className="m-0 one"/>
                                    <Radio value="Spring" label="Весенний" variant="outlined" className="m-0 one ml"/>
                                </RadioGroup>) 
                                :
                                <Tooltip title="Не указан семестр" variant="outlined" color="primary">
                                    <RadioGroup name="semester" className="row one" onChange={handleChange} onBlur={handleValidation} color="danger">
                                        <Radio value="Autumn" label="Осенний" variant="outlined" className="m-0 one"/>
                                        <Radio value="Spring" label="Весенний" variant="outlined" className="m-0 one ml"/>
                                    </RadioGroup>
                                </Tooltip>
                            }
                        </Grid>
                        <Grid>
                            <FormLabel>Требования</FormLabel>
                            <ReactQuill theme="snow" value={requirements} onChange={setReq} name="requirements" onBlur={() => handleValidateOthers(requirements, "requirements")}/>
                        </Grid>
                        <Grid>
                            <FormLabel>Аннотации</FormLabel>
                            <ReactQuill theme="snow" value={annotations} onChange={setAnn} name="annotations" onBlur={() => handleValidateOthers(annotations, "annotations")}/>
                        </Grid>
                        <Grid>
                            <FormLabel>Основной преподаватель курса</FormLabel>
                            <Select onChange={handleSaveSelected} name="mainTeacherId" onBlur={() => handleValidateOthers(mainTeacherId, "mainTeacherId")}>
                                {
                                    users.map(user => (<Option key={user.id} value={user.id}>{user.fullName}</Option>))
                                }
                            </Select>
                        </Grid>
                        <Grid container gap={1} className="end">
                            <Button color="neutral" onClick={handleCloseModal}>Отмена</Button>
                            {
                                errored ? 
                                <Tooltip title="Вы ввели некорректные данные" variant="outlined" color="primary">
                                    <Button onClick={handleSend}>Сохранить</Button>
                                </Tooltip> : <Button onClick={handleSend}>Сохранить</Button>
                            }
                        </Grid>
                    </Grid>
            </ModalDialog>
        </Modal>

        <Snackbar
            autoHideDuration={2000}
            color={color}
            variant="outlined"
            open={openSnack}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >{color === "danger" ? "Произошла ошибка" : "Успешно создано"}
        </Snackbar>
    </Grid>
    )
}

export default CreateCourse;