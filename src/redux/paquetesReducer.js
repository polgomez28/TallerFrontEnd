const initialState = [];

const paquetesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CARGAR_PAQUETES':
            return action.payload;   
        default:
            return state;    
    }
};

export default paquetesReducer;