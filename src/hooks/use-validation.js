import { useState } from "react";

function useValidation(initialValues) {
    const [errors, setErrors] = useState(initialValues);

    function handleValidation(e, state) {
        const { name, value } = e.target;

        let error = false;
        let flag1 = null;

        switch (name) 
        {
            case "fullname":
                if (value.length < 1)
                {
                    error = true;
                }
                break;
            case "birthdate":
                if (Date.parse(value) > Date.now || Date.parse(value) < Date.parse("1900-01-01"))
                {
                    error = true;
                }
                break;
            case "email":
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/;
                if (emailRegex.test(value))
                {
                    error = false;
                }
                else
                {
                    error = true;
                }
                break;
            case "password":
                if (value !== state.confirmPassword)
                {
                    flag1 = true;

                    if (value.length >= 6 && value.length <= 32)
                    {
                        let flag = false;
                        for (let i = 0; i < value.length; i++)
                        {
                            if (!isNaN(+value[i]))
                            {
                                flag = true;
                                break;
                            }
                        }

                        if (flag)
                        {
                            error = false
                        }
                        else
                        {
                            error = true;
                        }

                    }
                    else
                    {
                        error = true;
                    }
                }
                else
                {
                    flag1 = false;

                    if (value.length >= 6 && value.length <= 32)
                    {
                        let flag = false;
                        for (let i = 0; i < value.length; i++)
                        {
                            if (!isNaN(+value[i]))
                            {
                                flag = true;
                                break;
                            }
                        }

                        if (flag)
                        {
                            error = false
                        }
                        else
                        {
                            error = true;
                        }
                    }
                    else
                    {
                        error = true;
                    }
                }
                break;
            case "confirmPassword":
                if (value !== state.password)
                {
                    error = true;
                }
                break;
            default:
                break;
        }

        if (flag1 === true)
        {
            setErrors({
                ...errors,
                [name]: error,
                ['confirmPassword']: true
            });
        }
        else if (flag1 === null)
        {
            setErrors({
                ...errors,
                [name]: error
            });
        }
        else if (flag1 === false)
        {
            setErrors({
                ...errors,
                [name]: error,
                ['confirmPassword']: false
            });
        }
    }


    return [errors, handleValidation];
}

export default useValidation;