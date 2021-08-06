const initialState = {};
//const initialState = {token:'', usuario: ''};

const ventasReducer = (state = initialState, action) => {
    switch(action.type){
        case 'AGREGAR_VENTA':
            const newState = {...state, token: action.payload};
            return newState;   
        default:
            return state;    
    }
};

export default ventasReducer;