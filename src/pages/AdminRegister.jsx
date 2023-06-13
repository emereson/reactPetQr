import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import defaultValues from '../utils/defaultValues'
import { Link } from 'react-router-dom'
import './style/adminRegister.css'

const AdminRegister = () => {
    const { register, handleSubmit, reset } = useForm()

    const submit = data => {
        const url = `${import.meta.env.VITE_URL_API}admin/signup`

        axios.post(url, data)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        reset(defaultValues)
    }

    return (
        <div className='adminRegister__container'>
            <form className='adminRegister__form' action="" onSubmit={handleSubmit(submit)}>
                <h2>Registrate</h2>
                <div className='adminRegister__div'>
                    <label className='adminRegister__label' htmlFor="name">nombre :</label>
                    <input className='adminRegister__input'{...register('name')} id='name' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label className='adminRegister__label' htmlFor="email">email :</label>
                    <input className='adminRegister__input'{...register('email')} id='email' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label className='adminRegister__label' htmlFor="password">contraseña :</label>
                    <input className='adminRegister__input'{...register('password')} id='password' type="text" required={true} />
                </div>
                <button>registrarme</button>
            </form>
            <Link to='/admin/login'>iniciar secion</Link>
        </div>
    )
}

export default AdminRegister