// // import { Form, Button, Alert } from 'react-bootstrap';
// import { useState } from "react";
// import { unstable_renderSubtreeIntoContainer } from "react-dom";
// import { useDispatch, useSelector } from "react-redux"

// const CantidadVentas = () => {
    


//     const traerVentas = async () => {
//         const usuario = useSelector((state) => state.loginReducer);
//         const [contador, setContador] = useState(0);
//         const response = await fetch(`https://destinos.develotion.com/ventas.php?idVendedor=${usuario.idVendedor}`, {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//                 'apikey': usuario.apikey,
//                 'Content-Type': 'application/json'
//             }
//         });
//         const ventas = await response.json();
//         console.log("Ventas desde la api ----->",ventas);
        
//         ventas.forEach((venta) => {
//             setContador = setContador+1;
//           });
//     };
    
    

//     return (

//         <div>
//         <h1>{contador}</h1>
//         </div>

//     );
// };

// export default CantidadVentas;