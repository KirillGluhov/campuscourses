import { Typography, Grid, Tooltip, Snackbar, Button, FormLabel, Input, Modal, ModalClose, ModalDialog, FormControl } from "@mui/joy";
import { useState } from "react";
import useInputReset from "../../hooks/use-inputreset";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";

function CreateButton(props)
{
    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("success");

    const [openSnack, setOpenSnack] = useState(false);
    const [state, handleChange, reset] = useInputReset({
        create: ""
    })

    const [error, setError] = useState(false);

    function handleValidate()
    {
        if (state.create === "")
        {
            setError(true);
        }
        else
        {
            setError(false);
        }
    }

    function handleClose()
    {
        setOpenSnack(false);
    };

    function handleCloseModal()
    {
        reset();
        setError(false);
        setOpen(false);
    }

    function handleCreate()
    {
        reset();
        setOpen(true);
    }

    function handleSend()
    {
        const data = {name: state.create};
        console.log("Группа ", data, "Заголовки ", `Bearer ${localStorage.getItem("token")}`)
        axios.post(`${baseUrl}/groups`, data, {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            setOpenSnack(true);
            setColor("success");
            setOpen(false);

            axios.get(`${baseUrl}/groups`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                props.handleList(response.data);
            })
            .catch(error => {
                console.log(error)
            });
        })
        .catch(error => {
            if (error.response.status === 401)
            {
                localStorage.clear();
                navigate("/login");
            }

            console.log(error);
            setOpenSnack(true);
            setColor("danger");
        })
    }

    return (
    <Grid className="maximum">
        <Button onClick={handleCreate}>Создать</Button>
        <Snackbar
            autoHideDuration={2000}
            color={color}
            variant="outlined"
            open={openSnack}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >{color === "danger" ? "Произошла ошибка" : "Успешно создано"}
        </Snackbar>
        <Modal 
            open={open}
            onClose={handleCloseModal}
        >
            <ModalDialog>
                <ModalClose/>
                <Typography level="h4">Создание группы</Typography>
                <FormControl className="scroll">
                    <FormLabel>Название группы</FormLabel>
                    <Grid container gap={2}>
                        <Grid xs={12}>
                            {
                            error ? 
                            <Tooltip title="Название должно состоять хотя бы из одного символа" variant="outlined" color="primary">
                                <Input onBlur={handleValidate} onChange={handleChange} value={state.create} name="create" color="danger"></Input>
                            </Tooltip> 
                            : 
                            <Input onBlur={handleValidate} onChange={handleChange} value={state.create} name="create"></Input>
                            }
                        </Grid>
                        <Grid xs={12} container className="end" gap={1}>
                            <Button color="neutral" onClick={handleCloseModal}>Отмена</Button>
                            <Button onClick={handleSend}>Сохранить</Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </ModalDialog>
        </Modal>
    </Grid>
    );
}

export default CreateButton;