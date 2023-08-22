import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import UserViewPet from './UserViewPet';
import './style/userRegister.css';
import { ToastContainer, toast } from 'react-toastify';

const UserRegisterPet = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [existUser, setexistUser] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewIcon, setViewIcon] = useState('');
  const [viewIcon2, setViewIcon2] = useState('');
  const [viewIcon3, setViewIcon3] = useState('');
  const [viewIcon4, setViewIcon4] = useState('');

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_API}users/${id}`;

    axios
      .get(url)
      .then((res) => setexistUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleOnClick = () => {
    document.getElementById('petImg').click();
  };

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_API}users/${id}`;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('whatsapp', data.whatsapp);
    formData.append('email', data.email);
    formData.append('address', data.address);
    formData.append('namePet', data.namePet);
    formData.append('species', data.species);
    formData.append('gender', data.gender);
    formData.append('race', data.race);
    formData.append('age', data.age);
    formData.append('sterilization', data.sterilization);
    formData.append('description', data.description);

    if (selectedFile) {
      formData.append('petImg', selectedFile);
    }

    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data);
        toast.success('Gracias por registrarte');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  if (existUser?.user.qrId === id) {
    return (
      <div>
        <UserViewPet existUser={existUser} />
      </div>
    );
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length === 0) {
      setViewIcon('');
    } else {
      setViewIcon(event.target.id);
    }
  };
  const handleInputChange2 = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length === 0) {
      setViewIcon2('');
    } else {
      setViewIcon2(event.target.id);
    }
  };
  const handleInputChange3 = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length === 0) {
      setViewIcon3('');
    } else {
      setViewIcon3(event.target.id);
    }
  };
  const handleInputChange4 = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length === 0) {
      setViewIcon4('');
    } else {
      setViewIcon4(event.target.id);
    }
  };

  return (
    <div>
      <div className="userRegister__container">
        <span className="line__orange"></span>
        <span className="line__green"></span>
        <ToastContainer />
        <form className="userRegister__form" onSubmit={handleSubmit(submit)}>
          <h2>REGISTRO</h2>
          <img src="../register.png" alt="" />
          <div className="userRegister__date">
            <div className="userRegister__div">
              <label className="userRegister__label" htmlFor="name">
                Nombre del Propetario:
              </label>

              {viewIcon === 'name' ? '' : <i className="bx bxs-user"></i>}
              <input
                className="userRegister__input"
                {...register('name')}
                id="name"
                type="text"
                required
                placeholder="Nombre y Apellidos"
                onChange={handleInputChange}
              />
            </div>
            <div className="userRegister__div">
              <label className="userRegister__label" htmlFor="whatsapp">
                Numero de whatsapp:
              </label>
              {viewIcon2 === 'whatsapp' ? '' : <i className="bx bxl-whatsapp wharsapp"></i>}

              <input
                className="userRegister__input"
                {...register('whatsapp')}
                id="whatsapp"
                type="text"
                required
                placeholder="987654321"
                onChange={handleInputChange2}
              />
            </div>
            <div className="userRegister__div">
              <label className="userRegister__label" htmlFor="email">
                Correo Electronico:
              </label>
              {viewIcon3 === 'email' ? '' : <i className="bx bx-envelope"></i>}

              <input
                className="userRegister__input"
                {...register('email')}
                id="email"
                type="text"
                placeholder="correo"
                required
                onChange={handleInputChange3}
              />
            </div>
            <div className="userRegister__div">
              <label className="userRegister__label" htmlFor="address">
                Dirección:
              </label>
              {viewIcon4 === 'address' ? '' : <i className="bx bxs-map useRegister__direction"></i>}

              <input
                className="userRegister__input"
                {...register('address')}
                id="address"
                type="text"
                onChange={handleInputChange4}
                placeholder="Dirección"
                required
              />
            </div>
          </div>
          <img src="../dog.png" alt="" />
          <div className="userRegister__div">
            <label className="userRegister__label" htmlFor="namePet">
              Nombre de la mascota:
            </label>
            <input
              className="userRegister__input"
              {...register('namePet')}
              id="namePet"
              type="text"
              required
            />
          </div>
          <div className="userRegister__selection">
            <div className="useSelection__contianer">
              <label className="userRegister__label" htmlFor="species">
                Especie:
              </label>

              <select id="species" {...register('species')} className="custom-select">
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
              </select>
            </div>

            <div className="useSelection__contianer">
              <label className="userRegister__label" htmlFor="gender">
                Sexo:
              </label>
              <select id="species" {...register('gender')} className="custom-select">
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
              </select>
            </div>
          </div>
          <div className="userRegister__selection">
            <div className="useSelection__contianer">
              <label className="userRegister__label" htmlFor="race">
                Raza:
              </label>
              <input
                className="userRegister__input"
                {...register('race')}
                id="race"
                type="text"
                required
              />
            </div>
            <div className="useSelection__contianer">
              <label className="userRegister__label" htmlFor="age">
                Edad:
              </label>
              <input
                className="userRegister__input"
                {...register('age')}
                id="age"
                type="text"
                required
              />
            </div>
          </div>
          <div className="userRegister__esterelizado ">
            <label className="userRegister__label" htmlFor="sterilization">
              Esterilizado (a):
            </label>
            <select
              id="species"
              {...register('sterilization')}
              className="custom-select userRegister__select"
            >
              <option value="SI">SI</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="userRegister__div">
            <label className="userRegister__label" htmlFor="description">
              Descripción:
            </label>

            <textarea
              className="userRegister__input userRegister__textarea "
              {...register('description')}
              id="description"
              rows="15"
              cols="50"
              required
              placeholder="Describir las características más relevantes de su mascota"
            />
          </div>
          <div className="userRegister__div">
            <label className="userRegister__label" htmlFor="petImg">
              Subir Imagen:
            </label>
            <div className="custom-file-input">
              <input
                id="petImg"
                type="file"
                required
                {...register('petImg')}
                onChange={handleImageChange}
              />
              <p className="userRegister__imgPet" onClick={handleOnClick}>
                <img src="../subirImg.png" alt="" />
              </p>
            </div>
            <div className="image__preview">
              {selectedImage && <img src={selectedImage} alt="Preview" />}
            </div>
          </div>
          <div className="userRegister__chek">
            <img src="../checkRegister.jpeg" alt="" />
            <p className="userRegister__checkRegister">
              Verifique todos los datos antes de registrarlos
            </p>
          </div>
          <button className="userRegister__button">registrar</button>
        </form>
      </div>
      <h4 className="copyRigth">Copyrigth © Aquí Estoy con QR - Todos los derechos reservados</h4>
    </div>
  );
};

export default UserRegisterPet;
