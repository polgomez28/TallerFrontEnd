import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const ListarPaquetes = () => {
    const ventas = useSelector((state) => state.ventasReducer)

    return (
        <section>
            <h2>Listado de Ventas</h2>
            
            {ventas.map((i) => (
                <Card style={{ width: '18rem' }} className="card">
                    <Card.Body key={i.idVenta}>
                        <Card.Title key={i.idVenta +1}>Destino: {i.Paquete}</Card.Title>
                        <Card.Text key={i.idVenta + 1}>IdVenta: {i.idVenta}</Card.Text>
                        <Card.Text key={i.idVenta + 1}>Cliente: {i.Cliente}</Card.Text>
                        <Card.Text key={i.idVenta + 1}>Adultos: {i.Adultos}</Card.Text>
                        <Card.Text key={i.idVenta + 1}>Menores: {i.Menores}</Card.Text>
                        <Card.Text key={i.idVenta + 1}>Costo total: {i.CostoTotal}</Card.Text>
                    </Card.Body>
                </Card>
            ))};
        </section>
    );
};

export default ListarPaquetes;