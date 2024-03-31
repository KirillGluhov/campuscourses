import { Semestr } from "../const/const-semesters";

export function defineStartAndEndYear(semester, startYear)
{
    switch (semester) {
        case Semestr.AUTUMN.Eng:
            return startYear + "-" + (+startYear + 1);
        case Semestr.SPRING.Eng:
            return (+startYear - 1) + "-" + startYear;
        default:
            return ""
    }
}