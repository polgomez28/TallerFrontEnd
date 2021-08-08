import { useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card, Form, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Formulario from "./Formulario";


const Dashboard = () => {
    const history = useHistory();
    const token = useSelector((state) => state.loginReducer);

    /*defino destinos*/
    const destinos = useSelector((state) => state.paquetesReducer)
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const paquetes = useSelector((state) => state.ventasReducer);

    const cargarPaquetes = async () => {

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

    const ventas = useSelector((state) => state.ventasReducer);

    useEffect(() => {
        cargarPaquetes();
        //   cargarVentas();
    }, []);

    const cargarVentas = async () => {

        const response = await fetch('https://destinos.develotion.com/ventas.php?idVendedor={ventas.vendedor_id}')
        const datos = await response.json();

        dispatch({ type: 'AGREGAR_VENTA', payload: datos.data });

        return (
            /* 3.3 */
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
        );
    };

    // const GraficaPorPax = () => {
    //     const ventas = useSelector((state) => state.ventasReducer);

    //     const destinosPorPax = {};

    //     ventas.forEach((venta) => {
    //         const paquete = venta.id_paquete[1];

    //         destinosPorPax[paquete] = !destinosPorPax[paquete]
    //             ? 1
    //             : destinosPorPax[paquete] + 1;
    //     });

    //     const data = {
    //         labels: Object.keys(destinosPorPax),
    //         datasets: [
    //             {
    //                 label: 'Cantidad de Pasajeros por Destino',
    //                 data: Object.values(destinosPorPax),

    //                 borderWidth: 1,
    //             },
    //         ],
    //     };

    //     return (
    //         <div>
    //             <h2>Gráfico cantidad de Viajeros por Destino</h2>
    //             <Bar data={data} />
    //         </div>
    //     );
    // };

    // ORDENANDO CODIGO HACIA ABAJO

    const ListarPaquetes = () => {
        const destinos = useSelector((state) => state.paquetesReducer)

        return (
            <section>
                <h2>Listado de Paquetes</h2>

                {destinos.map((i) => (
                    <Card style={{ width: '18rem' }} className="card">
                        <Card.Img variant="top" src="holder.js/100px180" />

                        <Card.Body>
                            <Card.Title>{i.nombre}</Card.Title>
                            <Card.Text>{i.precio_mayor}</Card.Text>
                            <Card.Text>{i.precio_menor}</Card.Text>
                        </Card.Body>
                    </Card>
                ))};
            </section>
        );
    };



    return (<div className="dashboard">

        <section>
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

            ))};
            */}


        </section>

        <ListarPaquetes />
        <Formulario />
        <cargarVentas></cargarVentas>
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
        {/* <GraficaPorPax></GraficaPorPax> */}
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