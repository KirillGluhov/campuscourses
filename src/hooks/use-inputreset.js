import { useState } from "react";

function useInputReset(initialValues) {
    const [values, setValues] = useState(initialValues);

    function handleChange(e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    function reset()
    {
        setValues(initialValues);
    }
    
    return [values, handleChange, reset];
}

export default useInputReset;