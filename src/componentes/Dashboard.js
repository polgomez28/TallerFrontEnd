import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch} from "react-redux";
import { Alert, Button, Form } from "react-bootstrap";

const Dashboard = () => {

    const history = useHistory();

    const clienteRef = useRef(null);
    const paqueteRef = useRef(null);
    const adultosRef = useRef(0);
    const menoresRef = useRef(0);

    const dispatch = useDispatch();

    const [error, setError] = useState('');


    const comprar = async () => {
        console.log("presionando Realizar compra")

       // const token = useSelector((state) => state.authReducer)

        const nombreCliente = clienteRef.current.value;
        const idPaquete = paqueteRef.current.value;
        const cantidadMayores = adultosRef.current.value;
        const cantidadMenores = menoresRef.current.value;

        if(nombreCliente.length === 0 || idPaquete.length === 0 || cantidadMayores.length === 0 || cantidadMenores.length === 0 ){
            setError('Debe completar todos los campos.');
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            nombreCliente: nombreCliente,
            idPaquete: idPaquete,
            cantidadMayores: cantidadMayores,
            cantidadMenores: cantidadMenores,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://destinos.develotion.com//ventas.php", requestOptions)

        const resultado = await response.json();

        if(resultado.token){
            console.log("--------->", resultado);

            dispatch({type: 'AGREGAR_VENTA', payload: resultado.token});
            setError('');
        }
        else{
            setError(resultado.mensaje);
        }
    }

    return (<div className="dashboard">

        <section>
            <h2>Venta de Paquetes</h2>
            <Form>
                <Form.Group >
                    <Form.Control className="input" type="text" placeholder="Nombre Cliente" ref={clienteRef} required/>

                    <Form.Select className="select" ref={paqueteRef}>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>

                    <Form.Control className="input" type="number" placeholder="Cantidad Adultos" ref={adultosRef} />
                    <Form.Control className="input" type="number" placeholder="Cantidad Niños" ref={menoresRef} />

                </Form.Group>


                <Button variant="primary" onClick={comprar} className="btn">
                    Realizar Compra
                </Button>

                 {error && <Alert variant="danger">{error}</Alert>} 

            </Form>
        </section>
        <section>
            <h2>Listado de Paquetes</h2>
        </section>
        <section>
            <h2>Cantidad de Ventas</h2>
        </section>
        <section>
            <h2>Personas por Destino</h2>
        </section>
        <section>
            <h2>Gráfica de Precios por Destinos</h2>
        </section>
        <section >

            <h2>Destinos </h2>
            <h3>Destinos Top</h3>
            <h3>Destinos a Promocionar</h3> 


        </section>
        <button className="btn" id="volver" onClick={() => history.goBack()}>Volver</button>

    </div>)
};

export default Dashboard;