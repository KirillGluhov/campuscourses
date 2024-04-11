import useCheckToken from "./useCheckToken";
import {useSelector} from 'react-redux';

function useCheckRole(roleName)
{
    const haveToken = useCheckToken(state => state.auth.token);
    const role = useSelector(state => state.auth[roleName]);

    if (haveToken)
    {
        if (role != null)
        {
            return role;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

export default useCheckRole;