import { Tabs, TabList, Tab, TabPanel, Chip, Typography, LinearProgress } from "@mui/joy";
import Notifications from "./Notifications";
import { useDispatch, useSelector } from 'react-redux';

function SecondaryInfo({fetchData})
{
    const info = useSelector(state => state.auth.info);

    function displayNumberOfNotifications()
    {
        if (info && info.notifications) 
        {
            if (info.notifications.length > 100)
            {
                return "99+";
            }
            else
            {
                return info.notifications.length;
            }
        } else {
            return 0;
        }
    }

    return (
        <Tabs className="mt-8 mb-8 maxwidth" defaultValue={0} >
            <TabList disableUnderline>
                <Tab className="maxwidth tabName" disableIndicator>
                    <Typography>Требования к курсу</Typography>
                </Tab>
                <Tab className="maxwidth tabName" disableIndicator>
                    <Typography>Аннотация</Typography>
                </Tab>
                <Tab className="maxwidth tabName" disableIndicator >
                    <Typography>Уведомления</Typography>
                    <Chip className="red chipWithNumber">{displayNumberOfNotifications()}</Chip>
                </Tab>
            </TabList>
            <TabPanel className="panel" value={0}>
                {info ? <div dangerouslySetInnerHTML={{ __html: info.requirements }} /> : <LinearProgress/>}
            </TabPanel>
            <TabPanel className="panel" value={1}>
                {info ? <div dangerouslySetInnerHTML={{ __html: info.annotations }} /> : <LinearProgress/>}
            </TabPanel>
            <TabPanel className="panel" value={2}>
                {info ? <Notifications info={info} fetchData={fetchData}/> : <LinearProgress/>}
            </TabPanel>
        </Tabs>
    );
}

export default SecondaryInfo;