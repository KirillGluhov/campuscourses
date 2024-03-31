import { Button } from "@mui/joy";
import { StudentStatus } from "../../const/const-studentstatuses";
import axios from "axios";
import { baseUrl } from "../../const/const-urls";
import { useNavigate } from "react-router-dom";

function RequestButton({student, fetchData, id, type})
{
    let navigate = useNavigate();
    
    function handleSend()
    {
        let status = {
            status: type.Eng
        }
        
        console.log(`${baseUrl}/courses/${id}/student-status/${student.id}`);
        axios.post(`${baseUrl}/courses/${id}/student-status/${student.id}`, status, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } })
        .then(response => {
            fetchData();
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

    return (
        <>
            {
                type === StudentStatus.ACCEPTED ? 
                <Button onClick={handleSend}>Принять</Button> 
                : 
                <Button onClick={handleSend} color="danger">Отклонить заявку</Button>
            }
        </>
    );
}

export default RequestButton;