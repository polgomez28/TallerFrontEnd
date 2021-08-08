import { useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card, Form, ListGroup, ListGroupItem, Table } from "react-bootstrap";


const Dashboard = () => {
    const history = useHistory();
    const clienteRef = useRef(null);
    const paqueteRef = useRef(null);
    const adultosRef = useRef(0);
    const menoresRef = useRef(0);

    const token = useSelector((state) => state.loginReducer);

    /*defino destinos*/
    const destinos = useSelector((state) => state.paquetesReducer)


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

    const paquetes = useSelector((state) => state.ventasReducer);
    /*
    useEffect(() => {
        cargarPaquetes();
    }, []);
    */

    const cargarPaquetes = async () => {

        const idPaquete = paqueteRef.current.value;

        const response = await fetch('https://destinos.develotion.com/paquetes.php', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'apikey': token.apikey,
                'Content-Type': 'application/json'

            }
        });

        const destino = await response.json();

        if (response.error) {
            setError('Ocurrió un error');
            return;
        }

        dispatch({ type: 'CARGAR_PAQUETES', payload: destino.destinos });
        console.log("destinos al state ---->", destino.destinos);

        setError('');

    }

    //const dispatch = useDispatch();
    //const token = useSelector((state) => state.authReducer.apikey);
    const ventas = useSelector((state) => state.ventasReducer);
  
    //const [error, setError] = useState('');
  
    useEffect(() => {
      
      cargarPaquetes();
      cargarVentas();
    }, []);
  
    const cargarVentas = async () => {
      
      const response = await fetch('https://destinos.develotion.com/ventas.php?idVendedor={ventas.vendedor_id}')
      //const response = await fetch("https://destinos.develotion.com/ventas.php?idVendedor=4")
      const datos = await response.json();
  
      dispatch({ type: 'AGREGAR_VENTA', payload: datos.data });
    };

    return (<div className="dashboard">

        <section>
            <h2>Venta de Paquetes</h2>
            <Form>
                <Form.Group >
                    <Form.Control className="input" type="text" placeholder="Nombre Cliente" ref={clienteRef} required />

                    <Form.Select className="select" ref={paqueteRef}>
                        {/* <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>   */}

                        {destinos.map((destino) => (
                            <option value={destino.id}> paq1 {destino.nombre} </option>
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

        {/* 3.2 */}
        <section>
            <h2>Listado de Paquetes</h2>

            <Card style={{ width: '18rem' }} className="card">
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

                <Card style={{ width: '18rem' }} className="card">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title> Paquete {venta.idPaquete}</Card.Title>
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

        {/* 3.3 */}
        <section>
            <h2>Cantidad de Ventas</h2>

            <Table hover size="sm">
                <thead>
                    <tr>
                        <th>Id Paquete</th>
                        <th>Cantidad de Paquetes vendidos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>

        </section>

        {/* 3.4 */}
        <section>
            <h2>Personas por Destino</h2>
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th>Id Destino</th>
                        <th>Cantidad de Viajeros</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
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