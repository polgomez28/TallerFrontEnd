import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const ListarPaquetes = () => {
    const ventas = useSelector((state) => state.ventasReducer)

    return (
        <section>
            <h2>Listado de Ventas</h2>

            {ventas.map((i) => (
                <Card style={{ width: '18rem' }} className="card">
                    <Card.Body>
                        <Card.Title>Destino: {i.Paquete}</Card.Title>
                        <Card.Text>IdVenta: {i.idVenta}</Card.Text>
                        <Card.Text>Cliente: {i.Cliente}</Card.Text>
                        <Card.Text>Adultos: {i.Adultos}</Card.Text>
                        <Card.Text>Menores: {i.Menores}</Card.Text>
                        <Card.Text>Costo total: {i.CostoTotal}</Card.Text>
                    </Card.Body>
                </Card>
            ))};
        </section>
    );
};

export default ListarPaquetes;