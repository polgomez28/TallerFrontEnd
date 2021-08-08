import { Form, Button, Alert } from 'react-bootstrap';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Formulario = () => {
    const destinos = useSelector((state) => state.paquetesReducer);
    const paqueteRef = useRef(null);
    const clienteRef = useRef(null);
    const adultosRef = useRef(0);
    const menoresRef = useRef(0);
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const token = useSelector((state) => state.loginReducer);

    const comprar = async () => {
        console.log("presionando Realizar compra")

        const nombreCliente = clienteRef.current.value;
        const idPaquete = paqueteRef.current.value;
        const cantidadMayores = adultosRef.current.value;
        const cantidadMenores = menoresRef.current.value;

        if (nombreCliente.length === 0 || idPaquete.length === 0 || cantidadMayores.length === 0 || cantidadMenores.length === 0) {
            setError('Debe completar todos los campos.');
            return;
        }
        if ((+cantidadMayores + +cantidadMenores) > 10) {
            setError('Los paquetes son para un máximo de 10 personas.');
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

        const response = await fetch("https://destinos.develotion.com/ventas.php", requestOptions)

        const resultado = await response.json();

        if (resultado.token) {
            console.log("APIKEY--------->", resultado.token);

            dispatch({ type: 'AGREGAR_VENTA', payload: resultado.token });
            setError('');

        }
        else {
            setError(resultado.mensaje);
        }

    }

    return(
        <section>
            <h2>Venta de Paquetes</h2>
            <Form>
                <Form.Group >
                    <Form.Control className="input" type="text" placeholder="Nombre Cliente" ref={clienteRef} required />
                    <Form.Select className="select" ref={paqueteRef}> 
                        {destinos.map((destino) => (
                            <option value={destino.id}> {destino.nombre} </option>
                        ))}
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
    );
};

export default Formulario;
