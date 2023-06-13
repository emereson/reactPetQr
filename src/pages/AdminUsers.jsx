import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CaradminUsers from '../components/CaradminUsers'
import config from '../utils/getconfig'
import './style/adminUsers.css'
import { Link } from 'react-router-dom'

const AdminUsers = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        const url = `${import.meta.env.VITE_URL_API}users`

        axios.get(url, config)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])


    return (
        <div className='adminUser__container'>
            <h1>Tus Usuarios</h1>
            <div>
                <Link to='/admin/generateQr'>Generar Qr</Link>
                <Link to='/admin/sponsor'>Tus Auspiciadores</Link>
            </div>
            <div className='adminUser__dates'>
                <ul>
                    <li>ID</li>
                    <li>Nombre</li>
                    <li>Whatsapp</li>
                    <li>Email</li>
                    <li>Direccion</li>
                    <li>Nombre de La Mascota</li>
                    <li>Tipo de Mascota</li>
                    <li>Genero</li>
                    <li>Raza</li>
                    <li>Edad</li>
                    <li>Esterelizado</li>
                    <li>Descricion</li>
                    <li>Status</li>
                    <li>Usuario Creado</li>
                    <li>Editar</li>
                </ul>
                {
                    users?.users.map(user => (
                        <CaradminUsers
                            key={user.id}
                            user={user}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminUsers