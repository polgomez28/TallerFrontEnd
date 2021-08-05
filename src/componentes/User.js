import { useParams } from "react-router-dom";

const User = () => {
    const {nombreUsuario} = useParams();
    return <h2>El usuario es: {nombreUsuario} </h2>
}

export default User;