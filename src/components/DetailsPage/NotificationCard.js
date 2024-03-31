import {ListItem, ListItemContent } from "@mui/joy";

function NotificationCard({notification})
{
    return (
    <>
        {
            notification.isImportant 
            ? 
            <ListItem className="p-8 danger">
                <ListItemContent className="wrap-text">{notification.text}</ListItemContent> 
            </ListItem>
            :
            <ListItem className="p-8">
                <ListItemContent className="wrap-text">{notification.text}</ListItemContent> 
            </ListItem>
        }
    </>
    );
}

export default NotificationCard;