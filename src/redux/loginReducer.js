const initialState = {};

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            console.log("--->, action" , action )
            return state;
        default:
            return state;    
    }
};

export default loginReducer;