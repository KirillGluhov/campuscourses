import { Marks } from "../const/const-marks";

export function chooseMark(mark)
{
    switch (mark) {
        case Marks.FAILED.Eng:
            return Marks.FAILED.Rus;
        case Marks.NOTDEFINED.Eng:
            return Marks.NOTDEFINED.Rus;
        case Marks.PASSED.Eng:
            return Marks.PASSED.Rus;
        default:
            return "";
    }

}