import { Button, Textarea, Checkbox, Grid, Modal, ModalClose, ModalDialog, Typography, Snackbar, Tooltip } from "@mui/joy";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";

function CreateNotification({info, fetchData})
{
    let navigate = useNavigate();
    
    const [snackState, setSnack] = useState({
        color: "success",
        open: false
    })

    const [error, setError] = useState(false);

    const [state, setState] = useState({
        text: "",
        isImportant: false
    })

    const [open, setOpen] = useState(false);

    function handleClose()
    {
        setSnack(prevState => ({
            ...prevState,
            open: false
        }));
    }

    function handleCloseModal()
    {
        setOpen(false);

        setState(prevState => ({
            ...prevState,
            text: "",
            isImportant: false
        }));
    }

    function handleClick()
    {
        setOpen(true);
    }

    const handleValue = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCheckbox = (e) => {
        setState(prevState => ({
            ...prevState,
            ['isImportant']: !state.isImportant
        }));
    }

    function handleValidation()
    {
        if (state.text === "")
        {
            setError(true);
        }
    }

    function handleSend()
    {
        if (!error)
        {
            axios.post(`${baseUrl}/courses/${info.id}/notifications`, state, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                setSnack(prevState => ({
                    ...prevState,
                    open: true,
                    color: "success"
                }));

                setState(prevState => ({
                    ...prevState,
                    text: "",
                    isImportant: false
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

    return (
    <>
        <Button onClick={handleClick}>Создать уведомление</Button>

        <Modal 
            open={open}
            onClose={handleCloseModal}
        >
            <ModalDialog>
                <ModalClose/>
                <Typography level="h4">Создание уведомления</Typography>
                    <Grid container gap={1} className="column one">
                        {
                            <>
                                <Grid>
                                    {
                                        error ? 
                                        <Tooltip title="Уведомление не должно быть пустым" variant="outlined" color="primary">
                                            <Textarea name="text" value={state.text} onChange={handleValue} minRows={5} onBlur={handleValidation} color="danger"></Textarea>
                                        </Tooltip> 
                                        : 
                                        <Textarea name="text" value={state.text} onChange={handleValue} minRows={5} onBlur={handleValidation}></Textarea>
                                    }
                                </Grid>
                                <Grid>
                                    <Checkbox name="isImportant" onChange={handleCheckbox} label="Важное?" checked={state.isImportant}></Checkbox>
                                </Grid>
                                <Grid container gap={1} className="end">
                                    <Button color="neutral" onClick={handleCloseModal}>Отмена</Button>
                                    {
                                        error ? 
                                        <Tooltip title="Вы ввели некорректные данные" variant="outlined" color="primary">
                                            <Button onClick={handleSend}>Сохранить</Button>
                                        </Tooltip> : <Button onClick={handleSend}>Сохранить</Button>
                                        }
                                </Grid>
                            </>
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
            >{snackState.color === "danger" ? "Произошла ошибка" : "Успешно создано"}
        </Snackbar>
    </>
    );
}

export default CreateNotification