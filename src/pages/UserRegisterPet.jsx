import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom';
import UserViewPet from './UserViewPet';
import './style/userRegister.css'
import { ToastContainer, toast } from 'react-toastify';

const UserRegisterPet = () => {
    const { register, handleSubmit } = useForm();
    const { id } = useParams();
    const [existUser, setexistUser] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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
                console.log(res.data)
                toast.success('Se registro Exitosamente')
                setTimeout(() => {
                    window.location.reload(); // Recargar la página después de 3 segundos
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

    return (
        <div>
            <div className="userRegister__container">
                <span className="line__orange"></span>
                <span className="line__green"></span>
                <ToastContainer />
                <form className="userRegister__form" onSubmit={handleSubmit(submit)}>
                    <h2>Registro</h2>
                    <img src="../register.png" alt="" />
                    <div className="userRegister__date">
                        <div className="userRegister__div">
                            <label className="userRegister__label" htmlFor="name">
                                Nombre del Propetario:
                            </label>
                            <i className='bx bxs-user' ></i>
                            <input
                                className="userRegister__input"
                                {...register('name')}
                                id="name"
                                type="text"
                                required
                                placeholder='Nombre'
                            />
                        </div>
                        <div className="userRegister__div">
                            <label className="userRegister__label" htmlFor="whatsapp">
                                Numero de whatsapp:
                            </label>
                            <i className='bx bxl-whatsapp wharsapp'></i>
                            <input
                                className="userRegister__input"
                                {...register('whatsapp')}
                                id="whatsapp"
                                type="text"
                                required
                                placeholder='whatsapp'
                            />
                        </div>
                        <div className="userRegister__div">
                            <label className="userRegister__label" htmlFor="email">
                                Correo Electronico:
                            </label>
                            <i className='bx bx-envelope' ></i>
                            <input
                                className="userRegister__input"
                                {...register('email')}
                                id="email"
                                type="text"
                                required
                            />
                        </div>
                        <div className="userRegister__div">
                            <label className="userRegister__label" htmlFor="address">
                                Dirección:
                            </label>
                            <input
                                className="userRegister__input"
                                {...register('address')}
                                id="address"
                                type="text"
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
                    <div className='userRegister__selection'>
                        <div className="userRegister__div">
                            <label className="userRegister__label" htmlFor="species">
                                Especie:
                            </label>
                            <select
                                className="userRegister__input"
                                {...register('species')}
                                id="species"
                                required
                            >
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>

                        <div className="userRegister__div">
                            <label className="userRegister__label" htmlFor="gender">
                                Sexo:
                            </label>
                            <select
                                className="userRegister__input"
                                {...register('gender')}
                                id="gender"
                                required
                            >
                                <option value="masculino">Macho</option>
                                <option value="femenino">Hembra</option>
                            </select>
                        </div>
                    </div>
                    <div className="userRegister__div">
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
                    <div className="userRegister__div">
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
                    <div className="userRegister__div">
                        <label className="userRegister__label" htmlFor="sterilization">
                            Esterilización:
                        </label>
                        <input
                            className="userRegister__input"
                            {...register('sterilization')}
                            id="sterilization"
                            type="text"
                            required
                        />
                    </div>
                    <div className="userRegister__div">
                        <label className="userRegister__label" htmlFor="description">
                            Descripción:
                        </label>
                        <textarea
                            className="userRegister__input"
                            {...register('description')}
                            id="description"
                            rows="5"
                            cols="23"
                            required
                            placeholder='Describir las características más relevantes de su mascota'
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
                            {selectedImage && (
                                <img src={selectedImage} alt="Preview" />
                            )}
                        </div>
                    </div>
                    <div className="userRegister__div">
                        <p className="userRegister__checkRegister">
                            <img src="../checkRegister.jpeg" alt="" />
                            Verifique todos los datos antes de registrarlos
                        </p>
                    </div>
                    <button className="userRegister__button">registrar</button>
                </form>
            </div>
            <h4 className='copyRigth'>Copyrigth © Aquí Estoy - Todos los derechos reservados</h4>
        </div>
    );
};

export default UserRegisterPet