import React, { useEffect, useState } from 'react'
import config from '../utils/getconfig'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import CadAdminSponsor from '../components/CadAdminSponsor'
import { Link } from 'react-router-dom'
import './style/adminSponsor.css'

const AdminSponsors = () => {

    const [sponsors, setsponsors] = useState()
    const { register, handleSubmit, reset } = useForm()

    useEffect(() => {
        const url = `${import.meta.env.VITE_URL_API}sponsor`

        axios.get(url, config)
            .then(res => setsponsors(res.data))
            .catch(err => console.log(err))
    }, [])

    const submit = (data) => {
        const url = `${import.meta.env.VITE_URL_API}sponsor`;

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('whatssap', data.whatssap);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('facebook', data.facebook);
        formData.append('sponsorImg', data.sponsorImg[0]);

        axios
            .post(url, formData, config)
            .then((res) => {
                console.log(res.data);
                toast.success('El auspiciador se creo  exitosamente');

            })
            .catch((err) => {
                console.log(err)
                toast.error('Error verifique bien los datos ')
            });
        reset()
    };

    return (
        <div className='adminSponsor__container'>
            <h1> Auspiciadores</h1>
            <div className='adminSponsor__links'>
                <Link to='/admin/login'>Inicio</Link>
                <Link to='/admin/generateQr'>Codigos Qr</Link>
                <Link to='/admin/users'>Usuarios</Link>
            </div>
            <ToastContainer />
            <form className='adminSponsor__form' onSubmit={handleSubmit(submit)}>
                <h2>Crear auspiciador :</h2>
                <div className='adminRegister__div'>
                    <label htmlFor="name">nombre</label>
                    <input {...register('name')} id='name' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label htmlFor="description">Descripcion</label>
                    <input {...register('description')} id='description' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label htmlFor="whatssap">Whatssap</label>
                    <input {...register('whatssap')} id='whatssap' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label htmlFor="email">Email</label>
                    <input {...register('email')} id='email' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label htmlFor="phone">Numero Mobil</label>
                    <input {...register('phone')} id='phone' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label htmlFor="facebook">Facebook</label>
                    <input {...register('facebook')} id='facebook' type="text" required={true} />
                </div>
                <div className='adminRegister__div'>
                    <label htmlFor="sponsorImg">Imagen</label>
                    <input {...register('sponsorImg')} id='sponsorImg' type="file" required={true} />
                </div>
                <button>Crear</button>
            </form>
            <div className='adminSponsor__allCard'>
                <h2>Tus Auspiciadores</h2>
                <ul>
                    <li>ID</li>
                    <li>Nombre</li>
                    <li>Descricion</li>
                    <li>Whatsapp</li>
                    <li>Email</li>
                    <li>Numero Mobil</li>
                    <li>Facebook</li>
                    <li>status</li>
                    <li>Editar</li>
                </ul>
                {
                    sponsors?.sponsors.map(sponsor => (
                        <CadAdminSponsor
                            key={sponsor.id}
                            sponsor={sponsor}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default AdminSponsors