import {useSelector} from 'react-redux';

function useCheckToken(selector)
{
    const token = useSelector(selector);

    return token != null;
}

export default useCheckToken;