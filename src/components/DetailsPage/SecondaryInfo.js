import { Tabs, TabList, Tab, TabPanel, Chip, Typography } from "@mui/joy";
import Notifications from "./Notifications";

function SecondaryInfo({info, fetchData})
{

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
                <div dangerouslySetInnerHTML={{ __html: info.requirements }} />
            </TabPanel>
            <TabPanel className="panel" value={1}>
                <div dangerouslySetInnerHTML={{ __html: info.annotations }} />
            </TabPanel>
            <TabPanel className="panel" value={2}>
                <Notifications info={info} fetchData={fetchData}/>
            </TabPanel>
        </Tabs>
    );
}

export default SecondaryInfo;