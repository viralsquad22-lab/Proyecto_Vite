// src/Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//estilos 

import "../../styles/base.css";
import "../../styles/login.css";
import logo from "../../../public/logo2.png";
import { useAuthContext } from '../../context/AuthContext'; 




function Login() {
  const { login } = useAuthContext(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [requireCode, setRequireCode] = useState(false);
  const [expectedCode, setExpectedCode] = useState("");
  const [userToVerify, setUserToVerify] = useState(null); 
  const [tokenToVerify, setTokenToVerify] = useState(null); // 🟢 NUEVO: Estado para guardar el token temporalmente
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ========================================
    // PASO 2: VALIDAR CÓDIGO (SEGUNDO SUBMIT)
    // ========================================
    if (requireCode) {
        if (securityCode !== expectedCode) {
            alert("Código de seguridad incorrecto.");
            setLoading(false);
            return;
        }

        // 🟢 Código correcto: INICIAR SESIÓN y REDIRIGIR
        
        // 1. Llamar a login() para ESTABLECER la sesión en el contexto
        if (userToVerify && tokenToVerify) {
            login(userToVerify, tokenToVerify);
        } else {
             // Este caso solo ocurriría si recarga la página en el paso 2, es un buen fallback
             alert("Error: No se encontró la información del usuario para completar la sesión.");
             setLoading(false);
             return;
        }

        // 2. Redirección
        alert("Inicio de sesión exitoso");
        
        if (userToVerify.id_rol === 1 || userToVerify.id_rol === 2) {
            navigate("/usuarioC"); // Roles administrativos o de empleado
        } else {
            navigate("/catalogo"); // Cliente (rol 3)
        }

        setLoading(false);






        return; 
    }


    // ========================================
    // PASO 1: VERIFICAR CREDENCIALES (PRIMER SUBMIT)
    // ========================================
    try {
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            // 🟢 Almacenar usuario y token TEMPORALMENTE (para el paso 2)
            setUserToVerify(data.user);
            setTokenToVerify(data.token); // 🟢 Guardar el token aquí

            if (data.user.id_rol === 1) { 
                setRequireCode(true);
                setExpectedCode("123");// codigo predeterminado para el admin0
                alert("Este usuario es ADMIN. Ingrese el código de seguridad.");
            } else if (data.user.id_rol === 2) { 
                setRequireCode(true);
                setExpectedCode("456");// codigo predeterminado paea el empleado
                alert("Este usuario es EMPLEADO. Ingrese el código de seguridad.");
            } else { // CLIENTE (id_rol 3)
                // 🟢 Cliente no requiere código: INICIAR SESIÓN y Redirigir de inmediato
                login(data.user, data.token); 
                navigate("/catalogo"); 
            }
        } else {
            alert(data.message || "Credenciales incorrectas");
            // Limpiar sesión si hubo un intento fallido
            login(null, null); 
        }

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error de conexión con el servidor de autenticación.");
    }

    setLoading(false);
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo-section">
            <img src={logo} alt="Logo" className="logo-img" />
            <h1 className="portal-title">Portal 2</h1>
          </div>

          <nav className="nav-links">
            <Link to="/" className="nav-btn">Inicio</Link>
            <Link to="/registro" className="nav-btn">Regístrate</Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="form-container">
          <h2>Iniciar Sesión</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={requireCode}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={requireCode}
              />
            </div>

            {/* CÓDIGO DE SEGURIDAD */}
            {requireCode && (
              <div className="form-group">
                <label htmlFor="securityCode">Código de seguridad</label>
                <input
                  type="text"
                  id="securityCode"
                  placeholder="Ingrese el código de seguridad"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <div className="register-link">
              <p>
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
              </p>
            </div>

          </form>
        </div>
      </main>
    </>
  );
}

export default Login;