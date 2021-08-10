import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();

    const usuarioRef = useRef(null);
    const passwordRef = useRef(null);
    
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    const login = async () => {

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

        if(resultado.apiKey){
            dispatch({type: 'LOGIN', payload: resultado.apiKey});
            setError('');
        }
        else{
            setError(resultado.mensaje);
        }
        history.push('/Dashboard');
    }

    const registro = async () => {
        
        const usuario = usuarioRef.current.value;
        const password = passwordRef.current.value;

        const response = await fetch('https://destinos.develotion.com/usuarios.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          password,
        }),
      });

      const data = await response.json();
      
      if(data.error){
          setError('Error de registro');
          return;
      }

      dispatch({ type: 'LOGIN', payload: data.apiKey });

      setError('');

      history.push('/Dashboard');
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