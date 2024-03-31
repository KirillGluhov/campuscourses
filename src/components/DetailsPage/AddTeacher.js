import { Button, Snackbar, Modal, ModalClose, ModalDialog, Grid, Typography, Select, Tooltip, Option, FormLabel } from "@mui/joy";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";

function AddTeacher({info, fetchData})
{
    let navigate = useNavigate();
    
    const [snackState, setSnack] = useState({
        color: "success",
        open: false
    })

    const [teacher, setTeacher] = useState({
        userId: null
    });
    const [users, setUsers] = useState([]);

    const [error, setError] = useState(false);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

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

        setTeacher(prevState => ({
            ...prevState,
            userId: null
        }));

        
        setError(false);
    }

    const handleSaveSelected = (e, value) => {
        setTeacher(prevState => ({
            ...prevState,
            ['userId']: value
        }));
    }

    function getUsers()
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

    function handleClick()
    {
        setOpen(true);
    }

    function handleSend()
    {

        if (teacher.userId === null)
        {
            setError(true);
        }
        else
        {
            setError(false);
        }

        if (!error)
        {
            axios.post(`${baseUrl}/courses/${info.id}/teachers`, teacher, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
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

    return (
        <>
            <Button onClick={handleClick}>Добавить преподавателя</Button>

            <Modal 
            open={open}
            onClose={handleCloseModal}
            >
                <ModalDialog>
                    <ModalClose/>
                    <Typography level="h4" mr={5}>Добавление преподавателя на курс</Typography>
                        <Grid container gap={1} className="column one">
                            <Grid>
                                <FormLabel>Выберете преподавателя из списка</FormLabel>
                                <Select onChange={handleSaveSelected} value={teacher.userId} name="userId">
                                    {
                                        users.map(user => (<Option key={user.id} value={user.id}>{user.fullName}</Option>))
                                    }
                                </Select>
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
            >{snackState.color === "danger" ? "Произошла ошибка" : "Успешно добавлен"}
            </Snackbar>
        </>
    );
}

export default AddTeacher;