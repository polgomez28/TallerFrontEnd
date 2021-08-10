const initialState = {};
const cantidadReduce = (state = initialState, action) => {
    switch(action.type){
        case 'AGREGAR_CANTIDAD':
            return action.payload;   
        default:
            return state;    
    }
};

export default cantidadReduce;