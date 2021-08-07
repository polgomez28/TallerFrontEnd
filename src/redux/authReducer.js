const initialState = '';

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OBTENER_PAQUETES':
            return action.payload;
        default: 
        return state;
    }
};

export default authReducer;