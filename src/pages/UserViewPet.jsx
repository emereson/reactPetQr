import React, { useEffect, useState } from 'react'
import Location from './Location'
import './style/userViewPet.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Sponsor from './Sponsor'


const UserViewPet = ({ existUser }) => {
    const [sponsors, setsponsors] = useState()
    const [imgSelected, setimgSelected] = useState(0)


    useEffect(() => {
        const url = `${import.meta.env.VITE_URL_API}sponsor`

        axios.get(url)
            .then(res => setsponsors(res.data))
            .catch(err => console.log(err))
    }, [])


    setTimeout(function () {
        setimgSelected(imgSelected + 1)
        if (imgSelected > sponsors?.results - sponsors?.results) {
            setimgSelected(0)
        }
    }, 3000);


    return (
        <>
            <div className='userViewPet__container'>
                <span className='line__orange'></span>
                <span className='line__green'></span>
                <div className='userViewPet__allDate'>
                    <div className='userViewPet__hereIam'>
                        <h2 >AQUÍ ESTOY</h2>
                        <div className='userViewPet__img'>
                            <img src={existUser?.user.petImg} alt="" />
                        </div>
                    </div>
                    <div className='userViewPet__name'>
                        <h3>Hola Soy </h3>
                        <h2>{existUser.user.namePet}</h2>
                    </div>
                    <div className='userViewPet__datePet'>
                        <h3>Mis Datos</h3>
                        <ul className='userViewPet__datePetUl'>
                            <li>soy un : <p>{existUser?.user.species}</p></li>
                            <li>raza : <p>{existUser?.user.race}</p></li>
                            <li>edad :  <p>{existUser?.user.age}</p></li>
                            <li>genero : <p>{existUser?.user.gender}</p></li>
                            <li>esterilizado  : <p>{existUser?.user.sterilization}</p></li>
                            <li>descripcion : <p>{existUser?.user.description}</p></li>

                        </ul>
                    </div>
                    <div className='userViewPet__date'>
                        <h3 >Datos De Mis Padres Humanos </h3>
                        <ul className='userViewPet__dateUl'>
                            <li>nombre : <p>{existUser?.user.name}</p></li>
                            <li>numero : <p>{existUser?.user.whatsapp}</p></li>
                            <li>dirección  :  <p>{existUser?.user.address}</p></li>
                        </ul>
                    </div>
                    <div className='userViewPet__location'>
                        <h3>Mi Ubicación</h3>
                        <Location />
                        <Link className='userViewPet__contactame' to={`https://api.whatsapp.com/send?phone=51${existUser?.user.whatsapp}`} target='_blank'>Enviar Mensaje <i className='bx bxl-whatsapp'></i>
                        </Link>
                    </div>
                </div>

                <div className='userViewPet__information' >
                    <div className='userViewPet__information-allDate'>

                        <h3>Aquí Estoy Con QR</h3>
                        <p>te brindamos stickers y placas de identificación diseñados con la mejor tegnologia para que tu mascota sea identificada en cualquier momento y tengas la seguridad de localizar a tu mascota en tiempo real  con un sistema de geolocalización. <br />Registra todos los datos en el aplicativo para que tu mascota  este segura </p>
                        <p>Realiza tu pedido que estamos a tu servicio </p>
                        <ul>
                            <li><i className='bx bxl-whatsapp'></i></li>
                            <li><i className='bx bxl-facebook-circle'  ></i></li>
                            <li><i className='bx bxl-instagram'></i></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='sponsor__container'>
                <div className='sponsor__slider' >
                    {
                        sponsors?.sponsors.map(cardsponsor => (
                            <Sponsor
                                key={cardsponsor.id}
                                cardsponsor={cardsponsor}
                                imgSelected={imgSelected}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default UserViewPet