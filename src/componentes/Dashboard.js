import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const Dashboard = () => {

    const history = useHistory();

    const usuarioRef = useRef(null);
    const adultosRef = useRef(0);
    const menoresRef = useRef(0);

    const comprar = () => {
        console.log("presionando Realizar compra")
    }

    return (<div className="dashboard">

        <section>
            <h2>Venta de Paquetes</h2>
            <Form>
                <Form.Group >
                    <Form.Control className="input" type="text" placeholder="Nombre Cliente" ref={usuarioRef} />

                    <Form.Select className="select">
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

                {/* {error && <Alert variant="danger">{error}</Alert>} */}

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