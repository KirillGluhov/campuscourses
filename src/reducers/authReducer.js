import { Actions } from "../const/const-actions"

const initialState = {
    info: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.DEFINE:
            return {
                ...state,
                info: action.payload
            };
        case Actions.RESET:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;