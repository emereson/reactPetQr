import React, { useEffect, useState } from 'react';
import Location from './Location';
import './style/userViewPet.css';
import axios from 'axios';
import Sponsor from './Sponsor';

const UserViewPet = ({ existUser }) => {
  const [sponsors, setSponsors] = useState([]);
  const [imgSelected, setImgSelected] = useState(0);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const predefinedMessage = `¡Hola! Encontre  a tu en mascota en esta ubicación: 
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
            <h2>AQUÍ ESTOY CON QR</h2>
            <div className="userViewPet__img">
              <img src={existUser?.user.petImg} alt="" />
            </div>
          </div>
          <div className="userViewPet__name">
            <h3>Me llamo </h3>
          </div>
          <div className="userViewPet__datePet">
            <h2>{existUser?.user.namePet.toUpperCase()}</h2>
            <ul className="userViewPet__datePetUl">
              <li>
                Soy un <p>{existUser?.user.species}</p>
              </li>
              <li>
                Raza <p>{existUser?.user.race}</p>
              </li>
              <li>
                Edad <p>{existUser?.user.age}</p>
              </li>
              <li>
                Sexo <p>{existUser?.user.gender}</p>
              </li>
              <li>
                Esterilizado <p>{existUser?.user.sterilization}</p>
              </li>

              <li className="userViewPet__li">
                Descripción <p>{existUser?.user.description}</p>
              </li>
            </ul>
          </div>
          <div className="userViewPet__datePet userViewPet__date">
            <h2>Propietario </h2>
            <ul className="userViewPet__datePetUl">
              <li>
                Nombre<p>{existUser?.user.name} </p>
              </li>
              <li>
                Número<p>{existUser?.user.whatsapp}</p>
              </li>
              <li className="userViewPet__li">
                Dirección<p>{existUser?.user.address}</p>
              </li>
            </ul>
          </div>

          <div className="userViewPet__location">
            <h3>Mi Ubicación</h3>
            <Location latitude={latitude} longitude={longitude} />
            <a
              className="userViewPet__contactame"
              href={`https://api.whatsapp.com/send?phone=51${
                existUser?.user.whatsapp
              }&text=${encodeURIComponent(predefinedMessage)}`}
              target="_blank"
            >
              Enviar Mensaje <i className="bx bxl-whatsapp"></i>
            </a>
            <a className="userViewPet__contactame" href={`tel:${existUser?.user.whatsapp}`}>
              Llamar <i className="bx bx-phone"></i>
            </a>
          </div>
        </div>

        <div className="userViewPet__information">
          <div className="userViewPet__information-allDate">
            <h3>Aquí Estoy con QR</h3>
            <p>Es la mejor aplicación para identificar a tu mascota que tanto quieres y cuidas.</p>
            <p>Te brindamos un código QR con acceso simplificado.</p>
            <p>
              Nosotros nos preocupamos por brindarte <br /> total seguridad y confianza, <br />{' '}
              porque hemos desarrollado la mejor tecnología con un diseño exclusivo, <br /> para una
              rápida comunicación y ubicación en tiempo real.
            </p>
            <p>Te ofrecemos stickers, placas y collares de identificación QR.</p>

            <ul>
              <li>
                <a href="tel:958004140" target="_blank" rel="noopener noreferrer">
                  <i className="bx bx-phone"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=51958004140"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-whatsapp"></i>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/aquiestoy.conqr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/aquiestoycqr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bx bxl-facebook-circle"></i>
                </a>
              </li>
              <li className="userViewPewt__informaiton-net">
                <a className="" href="https://web.aquiestoyconqr.com">
                  <img src="./net1.jpeg" alt="" />
                </a>
              </li>
            </ul>
            <h4>www.web.aquiestoyconqr.com</h4>
            <img src="./dog.png" alt="" />
          </div>
        </div>
      </div>
      {sponsors?.length === 0 ? (
        ''
      ) : (
        <div className="sponsor__container">
          <div className="sponsor__slider">
            {sponsors?.sponsors.map((cardsponsor) => (
              <Sponsor key={cardsponsor.id} cardsponsor={cardsponsor} imgSelected={imgSelected} />
            ))}
          </div>
        </div>
      )}

      <h4 className="copyRigth copyRigthH4">
        Copyrigth © Aquí Estoy - Todos los derechos reservados
      </h4>
    </>
  );
};

export default UserViewPet;
