import { Form, Button, Alert } from 'react-bootstrap';
import { useEffect, useRef, useState } from "react";
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
    const idVendedor = useSelector((state) => state.loginReducer);

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

        const response = await fetch('https://destinos.develotion.com/ventas.php', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
                'apikey': token.apikey,
                'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idVendedor: idVendedor,
        nombreCliente: nombreCliente,
        idPaquete: idPaquete,
        cantidadMayores: cantidadMayores,
        cantidadMenores: cantidadMenores,
      })
    });

    const data = await response.json();

        if (data) {
            console.log("Entre al if data, destinos tiene..", destinos);
            const paqueteAFacturar = destinos.filter((dest) => dest.id == idPaquete);
            console.log("Paquete filtrado....", paqueteAFacturar);
            console.log("Precio mayor", paqueteAFacturar[0].precio_mayor);
            const precioPaquete = {CostoTotal: (parseInt(paqueteAFacturar[0].precio_mayor) * cantidadMayores)+(parseInt(paqueteAFacturar[0].precio_menor) * cantidadMenores)};
            console.log("precio del Paquete", precioPaquete);
        
                if (data.error) {
                    setError('Ocurrió un error');
                    return;
                }
                console.log("data antes del push ---->",data);
                const ventaFinal = {idVenta: data.idVenta, Paquete: paqueteAFacturar[0].nombre, Adultos: cantidadMayores, Menores: cantidadMenores, CostoTotal: (parseInt(paqueteAFacturar[0].precio_mayor) * cantidadMayores)+(parseInt(paqueteAFacturar[0].precio_menor) * cantidadMenores)};
                console.log("data luego del push ---->",ventaFinal);
                dispatch({ type: 'AGREGAR_VENTA', payload: ventaFinal });
                setError('');

        }
        else {
            setError(data.mensaje);
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
