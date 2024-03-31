import { useState } from "react";

function useValidationAuth(initialValues) {
    const [errors, setErrors] = useState(initialValues);

    function handleValidation(e) {
        const { name, value } = e.target;

        let error = false;

        switch (name) 
        {
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

                        error = false
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

export default useValidationAuth;