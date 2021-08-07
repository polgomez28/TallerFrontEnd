const initialState = [];

const paquetesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'CARGAR_PAQUETES':
            const newState = [...state, action.payload];
            return newState;   
        default:
            return state;    
    }
};

export default paquetesReducer;