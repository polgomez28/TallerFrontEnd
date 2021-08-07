import { useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card, Form, ListGroup, ListGroupItem } from "react-bootstrap";


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

        const nombreCliente = clienteRef.current.value;
        const idPaquete = paqueteRef.current.value;
        const cantidadMayores = adultosRef.current.value;
        const cantidadMenores = menoresRef.current.value;

        if (nombreCliente.length === 0 || idPaquete.length === 0 || cantidadMayores.length === 0 || cantidadMenores.length === 0) {
            setError('Debe completar todos los campos.');
            return;
        }
        if (cantidadMayores + cantidadMenores > 10) {
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

        const response = await fetch("https://destinos.develotion.com//ventas.php", requestOptions)

        const resultado = await response.json();

        if (resultado.token) {
            console.log("--------->", resultado);

            dispatch({ type: 'AGREGAR_VENTA', payload: resultado.token });
            setError('');
        }
        else {
            setError(resultado.mensaje);
        }

    }

    const paquetes = useSelector((state) => state.ventasReducer);

    useEffect(() => {
        if (!token.length) {
            history.push('/login');
          }
        cargarPaquetes();
    }, []);

    const token = useSelector((state) => state.authReducer);
    const cargarPaquetes = async () => {
        
        var myHeaders = new Headers();
            myHeaders.append(token);
            myHeaders.append("Content-Type", "application/json");

        var urlencoded = new URLSearchParams();

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        const response = await fetch("https://destinos.develotion.com/paquetes.php")
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        console.log(response);
    }

    return (<div className="dashboard">

        <section>
            <h2>Venta de Paquetes</h2>
            <Form>
                <Form.Group >
                    <Form.Control className="input" type="text" placeholder="Nombre Cliente" ref={clienteRef} required />

                    <Form.Select className="select" ref={paqueteRef}>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>

                        {/* {paquetes.map((destinos) => (
                            <option value={destinos.id}> {destinos.nombre} </option>
                        ))} */}


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

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Paquete</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem> Cliente: </ListGroupItem>
                        <ListGroupItem>  Adultos</ListGroupItem>
                        <ListGroupItem>  Niños</ListGroupItem>
                        <ListGroupItem> Precio Final: </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>

            {/*             
            {ventas.map((venta) =>

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{venta.idPaquete}</Card.Title>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem> Cliente: {venta.nombreCliente}</ListGroupItem>
                            <ListGroupItem> {venta.cantidadMayores} Adultos</ListGroupItem>
                            <ListGroupItem> {venta.cantidadMenores} Niños</ListGroupItem>
                            <ListGroupItem> Precio Final: {total} </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>

            )}; */}

            {/* const total =  totalMayores + totalMenores
            
                const totalMayores = {venta.cantidadMayores}*destino.precio_mayor
                const totalMenores = {venta.cantidadMenores}*destino.precio_menor
            */}



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