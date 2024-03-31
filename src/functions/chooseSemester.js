import { Semestr } from "../const/const-semesters"

export function chooseSemester(semester)
{
    switch (semester) {
        case Semestr.AUTUMN.Eng:
            return Semestr.AUTUMN.Rus
        case Semestr.SPRING.Eng:
            return Semestr.SPRING.Rus
        default:
            return ""
    }
}