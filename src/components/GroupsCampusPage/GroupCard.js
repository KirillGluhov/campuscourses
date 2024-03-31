import { Typography, Grid, ListItem, ListItemContent, FormControl, Snackbar, Button, FormLabel, Input, Modal, ModalClose, ModalDialog } from "@mui/joy";
import axios from "axios";
import { useState } from "react";
import useInputReset from "../../hooks/use-inputreset";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";

function GroupCard({item, handleList})
{
    const navigate = useNavigate();

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [colorUpdate, setColorUpdate] = useState("success");
    const [colorDelete, setColorDelete] = useState("success");

    const [openSnackUpdate, setOpenSnackUpdate] = useState(false);
    const [openSnackDelete, setOpenSnackDelete] = useState(false);

    const [state, handleChange, reset] = useInputReset({
        update: item.name
    })

    function handleCloseUpdate()
    {
        setOpenSnackUpdate(false);
    };

    function handleCloseDelete()
    {
        setOpenSnackDelete(false);
    }

    function handleCloseModalUpdate()
    {
        reset();
        setOpenUpdate(false);
    }

    function handleCloseModalDelete()
    {
        setOpenDelete(false);
    }

    function handleDelete()
    {
        setOpenDelete(true);
    }

    function handleNew()
    {
        setOpenUpdate(true);
    }

    function handleSendDelete()
    {
        console.log("Группа ", item.id, "Заголовки ", `Bearer ${localStorage.getItem("token")}`)
        axios.delete(`${baseUrl}/groups/${item.id}`, {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            console.log(response);
            setOpenDelete(false);
            setOpenSnackDelete(true);
            setColorDelete("success");
            

            axios.get(`${baseUrl}/groups`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                handleList(response.data);
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
            setOpenSnackDelete(true);
            setColorDelete("danger");
        })
    }

    function handleSend()
    {
        const data = {name: state.update};
        console.log("Группа ", data, "Заголовки ", `Bearer ${localStorage.getItem("token")}`)
        axios.put(`${baseUrl}/groups/${item.id}`, data, {headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            console.log(response);
            setOpenSnackUpdate(true);
            setColorUpdate("success");
            setOpenUpdate(false);

            axios.get(`${baseUrl}/groups`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {
                handleList(response.data);
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
            setOpenSnackUpdate(true);
            setColorUpdate("danger");
        })
    }

    return (
        <ListItem className="hover" key={item.id} id={item.id}>
            <ListItemContent onClick={() => navigate(`/groups/${item.id}`)} className="wrap-text">{item.name}</ListItemContent>
            <Button color="warning" className="yellow specified" onClick={handleNew}>Редактировать</Button>
            <Button color="danger" onClick={handleDelete}>Удалить</Button>


            <Snackbar
                autoHideDuration={2000}
                color={colorUpdate}
                variant="outlined"
                open={openSnackUpdate}
                onClose={handleCloseUpdate}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                >{colorUpdate === "danger" ? "Произошла ошибка" : "Успешно обновлено"}
            </Snackbar>
            <Modal 
                open={openUpdate}
                onClose={handleCloseModalUpdate}
            >
                <ModalDialog>
                    <ModalClose/>
                    <Typography level="h4">Обновление группы</Typography>
                    <FormControl>
                        <FormLabel>Название группы</FormLabel>
                        <Grid container gap={2}>
                            <Grid xs={12}>
                                <Input onChange={handleChange} value={state.update} name="update"></Input>
                            </Grid>
                            <Grid xs={12} container className="end" gap={1}>
                                <Button color="neutral" onClick={handleCloseModalUpdate}>Отмена</Button>
                                <Button onClick={handleSend}>Сохранить</Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </ModalDialog>
            </Modal>

            <Snackbar
                autoHideDuration={2000}
                color={colorDelete}
                variant="outlined"
                open={openSnackDelete}
                onClose={handleCloseDelete}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                >{colorDelete === "danger" ? "Произошла ошибка" : "Успешно удалено"}
            </Snackbar>
            <Modal 
                open={openDelete}
                onClose={handleCloseModalDelete}
            >
                <ModalDialog>
                    <ModalClose/>
                    <Grid container gap={1}>
                        <Grid xs={12}>
                            <Typography>Вы точно хотите удалить группу?</Typography>
                        </Grid>
                        <Grid xs={12} container className="between">
                            <Button onClick={handleSendDelete}>Да</Button>
                            <Button color="neutral" onClick={handleCloseModalDelete}>Нет</Button>
                        </Grid>
                    </Grid>
                </ModalDialog>
            </Modal>

        </ListItem>
    )
}

export default GroupCard;