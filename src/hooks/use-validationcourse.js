import { useState } from "react";

function useValidationCourse(initialValues)
{
    const [errors, setErrors] = useState(initialValues);

    function handleValidation(e) {
        const { name, value } = e.target;

        let error = false;

        switch (name) 
        {
            case "name":
                if (value.length > 0)
                {
                    error = false;
                }
                else
                {
                    error = true;
                }
                break;
            case "startYear":
                if (isNaN(+value))
                {
                    error = true;
                }
                else
                {
                    if (+value >= 2000 && +value <= 2029)
                    {
                        error = false;
                    }
                    else
                    {
                        error = true;
                    }
                }
                break;
            case "maximumStudentsCount":
                if (isNaN(+value))
                {
                    error = true;
                }
                else
                {
                    if (+value >= 1 && +value <= 200)
                    {
                        error = false;
                    }
                    else
                    {
                        error = true;
                    }
                }
                break;
            case "semester":
                if (value !== "")
                {
                    error = false;
                }
                else
                {
                    error = true;
                }
                break;
            default:
                break;
        }

        setErrors({
            ...errors,
            [name]: error
        });
    }

    return [errors, handleValidation];
}

export default useValidationCourse