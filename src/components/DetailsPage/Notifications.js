import { Fragment, useState } from "react";
import checkRole from "../../functions/checkRole";
import { List, Divider } from "@mui/joy";
import { checkTeacher } from "../../functions/checkTeacher";
import CreateNotification from "./CreateNotification";
import NotificationCard from "./NotificationCard";

function Notifications({info, fetchData})
{
    const [isTeacher, setTeacher] = useState(checkTeacher(info));
    const [isAdmin, setAdmin] = useState(checkRole("isAdmin"));

    

    return (<>
        {
            (isAdmin || isTeacher) 
            ? 
            <CreateNotification info={info} fetchData={fetchData}/> 
            : 
            null
        }
        <List className="mt-8 listOfElements">
            {info.notifications.map((notification, index) => (
                <Fragment key={index}>
                    <NotificationCard notification={notification}/>
                    {index !== info.notifications.length - 1 && <Divider/>}
                </Fragment>
            ))}
        </List>
    </>);
}

export default Notifications;