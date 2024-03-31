import { Link, Snackbar, Modal, ModalClose, ModalDialog, Grid, Radio, RadioGroup, Button, Typography } from "@mui/joy";
import { useState, useEffect } from "react";
import { Marks } from "../../const/const-marks";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { Results } from "../../const/const-result";
import { useNavigate } from "react-router-dom";

function Result({student, id, fetchData, type}) 
{
    let navigate = useNavigate();
    
    const [snackState, setSnack] = useState({
        color: "success",
        open: false
    })

    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        markType: type.Eng,
        mark: Marks.NOTDEFINED.Eng
    })

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            markType: type.Eng,
            mark: findValue()
        }));
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
        setState(prevState => ({
            ...prevState,
            markType: type.Eng,
            mark: findValue()
        }));
    }

    function findValue()
    {
        switch (type.Eng) {
            case Results.FINAL.Eng:
                return student.finalResult;
            case Results.MIDTERM.Eng:
                return student.midtermResult;
            default:
                return Marks.NOTDEFINED.Eng
        }
    }

    const handleChangeRadio = (event) => {

        setState(prevState => ({
            ...prevState,
            ['mark']: event.target.value
        }));
      };

    function handleClick()
    {
        setOpen(true);
    }

    function handleSend()
    {
        axios.post(`${baseUrl}/courses/${id}/marks/${student.id}`, state, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
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
            <Link onClick={handleClick}>{`${type.Rus}`} аттестация</Link>

            <Modal 
            open={open}
            onClose={handleCloseModal}
        >
            <ModalDialog>
                <ModalClose/>
                <Typography level="h4" mr={5}>Изменение отметки для {`"${type.Rus} аттестация"`}</Typography>
                    <Grid container gap={1} className="column one">
                        <Grid>
                            <Typography>Студент - {`${student.name}`}</Typography>
                        </Grid>
                        <Grid>
                            <RadioGroup name="mark" value={state.mark} className="row one" onChange={handleChangeRadio}>
                                <Radio value={Marks.PASSED.Eng} label="Пройдено" variant="outlined" className="m-0 one"/>
                                <Radio value={Marks.FAILED.Eng} label="Зафейлено" variant="outlined" className="m-0 one ml"/>
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
            >{snackState.color === "danger" ? "Произошла ошибка" : "Успешно изменено"}
            </Snackbar>
        </>
    );
}

export default Result