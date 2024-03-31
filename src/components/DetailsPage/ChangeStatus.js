import { Button, Snackbar, Radio, RadioGroup, Modal, ModalClose, ModalDialog, Typography, Grid } from "@mui/joy";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";

function ChangeStatus({info, fetchData})
{
    let navigate = useNavigate();
    
    const [state, setState] = useState(
        {
            status: info.status
        }
    );

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            status: info.status
        }));
    }, []);

    const [open, setOpen] = useState(false);

    const [snackState, setSnack] = useState({
        color: "success",
        open: false
    })

    function handleClick()
    {
        setOpen(true);
    }

    function handleCloseModal()
    {
        setOpen(false);

        setState(prevState => ({
            ...prevState,
            status: info.status
        }));
    }

    const handleChangeRadio = (event) => {

        setState(prevState => ({
            ...prevState,
            status: event.target.value
        }));
    };

    function handleClose()
    {
        setSnack(prevState => ({
            ...prevState,
            open: false
        }));
    }

    function handleSend()
    {
        axios.post(`${baseUrl}/courses/${info.id}/status`, state, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
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
        <Button className="specified yellow" onClick={handleClick}>Изменить</Button>

        <Modal 
            open={open}
            onClose={handleCloseModal}
        >
            <ModalDialog>
                <ModalClose/>
                <Typography level="h4">Изменение статуса курса</Typography>
                    <Grid container gap={1} className="column one">
                    <Grid>
                        <RadioGroup name="status" value={state.status} className="row one" onChange={handleChangeRadio} style={{flexWrap: 'wrap'}}>
                            <Radio value="OpenForAssigning" label="Открыт для записи" variant="outlined" className="m-0 one mr"/>
                            <Radio value="Started" label="В процессе" variant="outlined" className="m-0 one mr"/>
                            <Radio value="Finished" label="Завершён" variant="outlined" className="m-0 one"/>
                        </RadioGroup>
                    </Grid>
                    <Grid container gap={1} className="end">
                        <Button color="neutral" onClick={handleCloseModal}>Отмена</Button>
                        <Button onClick={handleSend}>Сохранить</Button>
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
            >{snackState.color === "danger" ? "Произошла ошибка" : "Успешно отредактировано"}
        </Snackbar>
    </>
    );
}

export default ChangeStatus;