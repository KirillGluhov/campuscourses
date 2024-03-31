import { Button } from "@mui/joy";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";

function SignStudent({info, fetchData, setSigned, setSnack})
{
    let navigate = useNavigate();
    
    function handleClick()
    {
        axios.post(`${baseUrl}/courses/${info.id}/sign-up`,{
            data: ''
        }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
            .then(response => {

                setSnack(prevState => ({
                    ...prevState,
                    open: true,
                    color: "success"
                }));

                fetchData();
                setSigned(true);
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
            <Button color="success" onClick={handleClick}>Записаться на курс</Button>
        </>
    );
}

export default SignStudent;