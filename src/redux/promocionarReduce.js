const initialState = [];

const promocionarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CARGAR_PROMOCION':
            return action.payload;   
        default:
            return state;    
    }
};

export default promocionarReducer;