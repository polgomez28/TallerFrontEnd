import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Form } from "react-bootstrap";

const Login = () => {
    const usuarioRef = useRef(null);
    const passwordRef = useRef(null);
    
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    const login = async () => {
        console.log("presionando Ingresar")

        const usuario = usuarioRef.current.value;
        const password = passwordRef.current.value;

        if(usuario.length === 0 || password.length === 0 ){
            setError('Debe ingresar usuario y contraseña.');
            return;
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            usuario: usuario,
            password: password,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://destinos.develotion.com//login.php", requestOptions)

        const resultado = await response.json();

        if(resultado.token){
            console.log("--------->", resultado);

            dispatch({type: 'LOGIN', payload: resultado.token});
            setError('');
        }
        else{
            setError(resultado.mensaje);
        }
    }

    const registro = () => {
        console.log("presionando registrarme")
    }

    return (

        <Form>
            <Form.Group >
                <Form.Control className="input" type="text" placeholder="Usuario" ref={usuarioRef} />

                <Form.Control className="input" type="password" placeholder="Contraseña" ref={passwordRef} />
            </Form.Group>

            <Form.Group>
                <Button variant="primary" onClick={login} className="btn">
                    Ingresar
                </Button>
                <Button variant="primary" onClick={registro} className="btn">
                    Registrarme
                </Button>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

        </Form>
    )
}

export default Login;