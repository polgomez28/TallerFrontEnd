const initialState = { apikey: ''};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OBTENER_PAQUETES':
            return { ...state, apikey: action.payload };
        default: 
        return state;
    }
};
