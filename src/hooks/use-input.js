import { useState } from "react";

function useInput(initialValues) {
    const [values, setValues] = useState(initialValues);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    
    return [values, handleChange];
}

export default useInput;