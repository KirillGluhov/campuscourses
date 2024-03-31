import { Grid, Typography, Button, Snackbar, Modal, ModalClose, ModalDialog } from "@mui/joy";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DeleteCourse({id, fetchData})
{
    let navigate = useNavigate();

    const [snackState, setSnack] = useState({
        color: "success",
        open: false
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
    }

    const handleClick = (event) =>
    {
        setOpen(true);
    }

    function handleSendDelete()
    {
        axios.delete(`${baseUrl}/courses/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
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

    return (
        <>
            <Button color="danger" className="verydeep buttontodelete ml-8" onClick={handleClick}>Удалить курс</Button>

            <Snackbar
            autoHideDuration={2000}
            color={snackState.color}
            variant="outlined"
            open={snackState.open}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >{snackState.color === "danger" ? "Произошла ошибка" : "Успешно удалено"}
            </Snackbar>

            <Modal 
            open={open}
            onClose={handleCloseModal}
            >
                <ModalDialog>
                    <ModalClose/>
                    <Grid container gap={1}>
                        <Grid xs={12}>
                            <Typography>Вы точно хотите удалить курс?</Typography>
                        </Grid>
                        <Grid xs={12} container className="between">
                            <Button onClick={handleSendDelete}>Да</Button>
                                <Button color="neutral" onClick={handleCloseModal}>Нет</Button>
                        </Grid>
                    </Grid>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default DeleteCourse;