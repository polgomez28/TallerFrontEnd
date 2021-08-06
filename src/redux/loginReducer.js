const initialState = {};
//const initialState = {token:'', usuario: ''};

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            const newState = {...state, token: action.payload};
            return newState;   
        default:
            return state;    
    }
};

export default loginReducer;