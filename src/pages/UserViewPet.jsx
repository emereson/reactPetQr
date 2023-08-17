import React, { useEffect, useState } from 'react';
import Location from './Location';
import './style/userViewPet.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sponsor from './Sponsor';

const UserViewPet = ({ existUser }) => {
  const [sponsors, setSponsors] = useState([]);
  const [imgSelected, setImgSelected] = useState(0);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const predefinedMessage = `¡Hola! Encontre  a tu en mascota esta ubicacion: 
  https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}
  `;

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}sponsor`;

    axios
      .get(url)
      .then((res) => setSponsors(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgSelected((prevSelected) =>
        prevSelected + 1 > sponsors?.results - 1 ? 0 : prevSelected + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [sponsors]);
  return (
    <>
      <div className="userViewPet__container">
        <span className="line__orange"></span>
        <span className="line__green"></span>
        <div className="userViewPet__allDate">
          <div className="userViewPet__hereIam">
            <h2>AQUÍ ESTOY</h2>
            <div className="userViewPet__img">
              <img src={existUser?.user.petImg} alt="" />
            </div>
          </div>
          <div className="userViewPet__name">
            <h3>Hola, Soy </h3>
            <h2>{existUser.user.namePet}</h2>
          </div>
          <div className="userViewPet__datePet">
            <h3>Mis Datos</h3>
            <ul className="userViewPet__datePetUl">
              <li>
                Soy un: <p>{existUser?.user.species}</p>
              </li>
              <li>
                Raza: <p>{existUser?.user.race}</p>
              </li>
              <li>
                Edad: <p>{existUser?.user.age}</p>
              </li>
              <li>
                Género: <p>{existUser?.user.gender}</p>
              </li>
              <li>
                Esterilizado: <p>{existUser?.user.sterilization}</p>
              </li>
              <li>
                Descripción : <p>{existUser?.user.description}</p>
              </li>
            </ul>
          </div>
          <div className="userViewPet__date">
            <h3>Datos Del Propietario </h3>
            <ul className="userViewPet__dateUl">
              <li>
                Nombre : <p>{existUser?.user.name}</p>
              </li>
              <li>
                Numero : <p>{existUser?.user.whatsapp}</p>
              </li>
              <li>
                dirección : <p>{existUser?.user.address}</p>
              </li>
            </ul>
          </div>
          <div className="userViewPet__location">
            <h3>Mi Ubicación</h3>
            <Location latitude={latitude} longitude={longitude} />
            <a className="userViewPet__contact-link" href={`tel:${existUser?.user.whatsapp}`}>
              Llamar <i className="bx bx-phone"></i>
            </a>
            <Link
              className="userViewPet__contactame"
              to={`https://api.whatsapp.com/send?phone=51${
                existUser?.user.whatsapp
              }&text=${encodeURIComponent(predefinedMessage)}`}
              target="_blank"
            >
              Enviar Mensaje <i className="bx bxl-whatsapp"></i>
            </Link>
          </div>
        </div>

        <div className="userViewPet__information">
          <div className="userViewPet__information-allDate">
            <h3>Aquí Estoy Con QR</h3>
            <p>
              Te brindamos stickers y placas de identificación diseñados con la mejor tegnologia
              para que tu mascota sea identificada en cualquier momento y tengas la seguridad de
              localizar a tu mascota en tiempo real con un sistema de geolocalización. <br />
              Registra todos los datos en el aplicativo para que tu mascota este segura{' '}
            </p>
            <p>Realiza tu pedido que estamos a tu servicio </p>
            <ul>
              <li>
                <i className="bx bxl-whatsapp"></i>
              </li>
              <li>
                <i className="bx bxl-facebook-circle"></i>
              </li>
              <li>
                <i className="bx bxl-instagram"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sponsor__container">
        <div className="sponsor__slider">
          {sponsors?.length === 0
            ? ''
            : sponsors?.sponsors.map((cardsponsor) => (
                <Sponsor key={cardsponsor.id} cardsponsor={cardsponsor} imgSelected={imgSelected} />
              ))}
        </div>
      </div>
      <h4 className="copyRigth">Copyrigth © Aquí Estoy - Todos los derechos reservados</h4>
    </>
  );
};

export default UserViewPet;
