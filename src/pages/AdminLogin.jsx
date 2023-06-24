import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './style/adminLogin.css'

const AdminLogin = () => {
    const { register, handleSubmit, reset } = useForm();
    const [token, setToken] = useState(null);

    const submit = data => {
        const url = `${import.meta.env.VITE_URL_API}/admin/login`;

        axios.post(url, data)
            .then(res => {
                console.log(res.data);
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.admin.name);
                toast.success('inicio de sesion exitoso');
            })
            .catch(err => {
                console.log(err);
                toast.error('Correo electrónico o contraseña incorrectos');
            });

        reset();
    };

    const handleClick = () => {
        localStorage.clear();
        setToken(null);
        window.location.reload();
    };

    if (localStorage.getItem('name')) {
        return (
            <div className='adminLongin__container'>
                <ToastContainer />
                <div>
                    <h2>bienvenido </h2>
                    <h2> {localStorage.getItem('name')}</h2>
                </div>
                <Link to='/admin/generateQr'>Codigos Qr</Link>
                <Link to='/admin/sponsor'>Auspiciadores</Link>
                <Link to='/admin/users'>Usuarios</Link>
                <button onClick={handleClick}>cerrar sesion </button>
            </div>
        )

    } else {

    }
    return (
        <div className='adminLongin__container'>
            <ToastContainer />
            <form className='adminLogin__form' onSubmit={handleSubmit(submit)}>
                <h2>ingresar</h2>
                <div className='adminLogin__div'>
                    <label htmlFor="email">email :</label>
                    <input {...register('email')} id='email' type="text" />
                </div>
                <div className='adminLogin__div'>
                    <label htmlFor="password">contraseña :</label>
                    <input {...register('password')} id='password' type="text" />
                </div>
                <button>iniciar secion</button>
            </form>
            <Link to='/admin/register'>registrarse</Link>
        </div>
    )
}

export default AdminLogin