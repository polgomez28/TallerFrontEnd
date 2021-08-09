const initialState = [];
const ventasReducer = (state = initialState, action) => {
    switch(action.type){
        case 'AGREGAR_VENTA':
            const newState = [{...state, ...action.payload}];
            return newState;   
        default:
            return state;    
    }
};

export default ventasReducer;