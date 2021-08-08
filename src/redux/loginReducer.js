function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
const initialState = {idVendedor: getRandomInt(1,99), apikey: ''};

const loginReducer = (state = initialState, action) => {
    
    switch(action.type){
        case 'LOGIN':
            const newState = {...state, apikey: action.payload};
            return newState;   
        default:
            return state;    
    }
};

export default loginReducer;