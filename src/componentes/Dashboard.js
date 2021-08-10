import { useHistory } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card, Form, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Formulario from "./Formulario";


const Dashboard = () => {
    const history = useHistory();
    const usuario = useSelector((state) => state.loginReducer);
    const leerVentas = useSelector((state) => state.ventasReducer);

    /*defino destinos*/
    const destinos = useSelector((state) => state.paquetesReducer)
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const cargarPaquetes = async () => {

        const response = await fetch('https://destinos.develotion.com/paquetes.php', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'apikey': usuario.apikey,
                'Content-Type': 'application/json'

            }
        });

        return response.json();
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        const venta = await traerVentas();
        const paquete = await cargarPaquetes();
        console.log("venta en cargar datos", venta);
        console.log("paquete en cargar datos", paquete);
        dispatch({ type: 'CARGAR_PAQUETES', payload: paquete.destinos });
        if (venta.length) {
            dispatch({ type: 'AGREGAR_CANTIDAD', payload: venta.ventas });
        }
    };
    const LeerVentas = () => {
        const cantidad = leerVentas.length;

        return (
            <div>
                <h1>{cantidad}</h1>
            </div>
        )
    }
    const traerVentas = async () => {
        // const usuario = useSelector((state) => state.loginReducer);
        const response = await fetch(`https://destinos.develotion.com/ventas.php?idVendedor=${usuario.idVendedor}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'apikey': usuario.apikey,
                'Content-Type': 'application/json'
            }
        });

        return response.json()
    };

    // ORDENANDO CODIGO HACIA ABAJO


    const GraficaPreciosDestino = () => {
        return (
            <section>
                <h2>Gráfica de Precios por Destinos</h2>
            </section>
        );
    };


    const GraficaPorPax = () => {
        const ventas = useSelector((state) => state.ventasReducer);

        const destinosPorPax = {};

        ventas.forEach((venta) => {
            const paquete = venta.Paquete;

            console.log("1***********paquete", paquete)
            console.log("ventas***********", ventas)
            console.log("venta.Adultos***********", venta.Adultos)

            destinosPorPax[paquete] = !destinosPorPax[paquete]
                ? +venta.Adultos + +venta.Menores
                : destinosPorPax[paquete] + (+venta.Adultos + +venta.Menores);
        });

        const data = {
            labels: Object.keys(destinosPorPax),
            datasets: [
                {
                    label: 'Cantidad de Pasajeros por Destino',
                    data: Object.values(destinosPorPax),

                    borderWidth: 1,
                },
            ],

        };

        return (
            <div>
                <h2>Gráfico cantidad de Viajeros por Destino</h2>
                <Bar data={data} />

                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th>Paquete</th>
                            <th>Cantidad de Paquetes vendidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            
                            <tr><td>{venta.Paquete}</td> <td>{+venta.Adultos + +venta.Menores}</td></tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        );
    };

    return (<div className="dashboard">

        <Formulario />
        <LeerVentas />
        <GraficaPorPax></GraficaPorPax>

        <GraficaPreciosDestino></GraficaPreciosDestino>

        <h2>Destinos </h2>
        <h3>Destinos Top</h3>
        {/* <DestinosTop></DestinosTop> */}
        <h3>Destinos a Promocionar</h3>
        {/* <DestinosAPromocionar></DestinosAPromocionar> */}

        <button className="btn" id="volver" onClick={() => history.goBack()}>Volver</button>

    </div>);
};

export default Dashboard;