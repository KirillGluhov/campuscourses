import { Status } from "../const/const-statuses";

export function chooseColor(status)
{
    switch (status) {
        case Status.CREATED.Eng:
            return "neutral";
        case Status.FINISHED.Eng:
            return "danger";
        case Status.OPEN.Eng:
            return "success";
        case Status.STARTED.Eng:
            return "primary";
        default:
            return "";
    }
}