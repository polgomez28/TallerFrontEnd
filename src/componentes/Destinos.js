import { useHistory } from "react-router-dom";

const Destino = () => {

    const history = useHistory();

    return (
        <div className="destinos">

            <h2>Destinos </h2>
            <h3>Destinos Top</h3>
            <h3>Destinos a Promocionar</h3>

            <button onClick={() => history.goBack()}>Volver</button>

        </div>
    );
}

export default Destino;