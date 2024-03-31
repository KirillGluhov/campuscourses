import { Status } from "../const/const-statuses";

export function chooseStatus(status)
{
    switch (status) {
        case Status.CREATED.Eng:
            return Status.CREATED.Rus;
        case Status.FINISHED.Eng:
            return Status.FINISHED.Rus;
        case Status.OPEN.Eng:
            return Status.OPEN.Rus;
        case Status.STARTED.Eng:
            return Status.STARTED.Rus;
        default:
            return "";
    }
}