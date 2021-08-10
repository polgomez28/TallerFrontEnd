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
        const ventas = useSelector((state) => state.ventasReducer);

        const destinosPorPax = {};

        ventas.forEach((venta) => {
            const paquete = venta.Paquete;
            const cantidad = leerVentas.length;

            destinosPorPax[paquete] = !destinosPorPax[paquete]
                ? +venta.CostoTotal / (+venta.Adultos + +venta.Menores)
                : ((destinosPorPax[paquete] + +venta.CostoTotal / (+venta.Adultos + +venta.Menores)) / cantidad);
        });

        const data = {
            labels: Object.keys(destinosPorPax),
            datasets: [
                {
                    label: 'Promedio de Precio de cada paquete',
                    data: Object.values(destinosPorPax),

                    borderWidth: 1,
                },
            ],

        };

        return (
            <section>
                <h2>Gráfica de Precios por Destinos</h2>
                <Bar data={data} />
            </section>
        );
    };


    const GraficaPorPax = () => {
        const ventas = useSelector((state) => state.ventasReducer);
        console.log("ventas", ventas)
        const destinosPorPax = {};
 
        ventas.forEach((venta) => {
            const paquete = venta.Paquete;

            destinosPorPax[paquete] = !destinosPorPax[paquete]
                ? +venta.Adultos + +venta.Menores
                : destinosPorPax[paquete] + (+venta.Adultos + +venta.Menores);
            
        });
// Tabla cantidad de ventas
        const destinosTop = {};
        let contador = 0;
        ventas.forEach((venta) => {
            const paquete = venta.Paquete;

            destinosTop[paquete] = !destinosTop[paquete]
                ? +contador + +1
                : destinosTop[paquete] + (+contador + +1);
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
                {console.log(destinosPorPax)}
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th>Paquete</th>
                            <th>Cantidad de Paquetes vendidos</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(destinosTop).map(function(key) {
                            return <tr><td>{key}</td><td>{destinosTop[key]}</td></tr>
                    })}

                    </tbody>
                </Table>

            </div>
        );
    };


    const DestinosAPromocionar = () => {
        const ventas = useSelector((state) => state.ventasReducer);
        const destinos = useSelector((state) => state.paquetesReducer);
        console.log("ventas------->>", ventas);
        console.log("destinos----->>", destinos);


        return (
            <div>       
                
                {
                    destinos.forEach((destino) => {
                        ventas.forEach((venta) => {
                            if(destino.nombre !== venta.Paquete)
                            {
                                <p>{venta.Paquete}</p>
                                console.log("dentro del if",destino);
                            }else{
                                <p></p>
                            }
                            {console.log("los destinos",destino.nombre)}
                            {console.log("los destinos de las ventas",venta.Paquete)}
                        })
                    })
                } 
            </div>
        );
    }



const ListarDestinosTop = () => {
    const ventas = useSelector((state) => state.ventasReducer);

        const destinosTop = {};
        let contador = 0;
        ventas.forEach((venta) => {
            const paquete = venta.Paquete;

            destinosTop[paquete] = !destinosTop[paquete]
                ? +contador + +1
                : destinosTop[paquete] + (+contador + +1);
        });
        console.log(destinosTop);
        return(
            <div>
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th>Paquete</th>
                            <th>Cantidad de ventas</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.keys(destinosTop).map(function(key) {
                        if(destinosTop[key] > 3){
                            return <tr><td>{key}</td><td>{destinosTop[key]}</td></tr>
                        }else{
                            return <tr></tr>
                        }
                    })}
                    </tbody>
                </Table>
            </div>
        );


}


    return (<div className="dashboard">

        <Formulario />
        <LeerVentas />
        <GraficaPorPax></GraficaPorPax>

        <GraficaPreciosDestino></GraficaPreciosDestino>

        <h2>Destinos </h2>
        <h3>Destinos Top</h3>
        <ListarDestinosTop />
        {/* <DestinosTop></DestinosTop> */}
        <h3>Destinos a Promocionar</h3>
        <DestinosAPromocionar></DestinosAPromocionar>

        <button className="btn" id="volver" onClick={() => history.goBack()}>Volver</button>

    </div>);
};

export default Dashboard;