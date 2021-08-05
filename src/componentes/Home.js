import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>Home </h2>

            <Link to="/Destinos" className="link">Ir a Destinos</Link>
        </div>
    );
}

export default Home;