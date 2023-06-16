import axios from 'axios';
import React, { useState } from 'react'
import config from '../utils/getconfig';
import { ToastContainer, toast } from 'react-toastify';

const CaradminUsers = ({ user }) => {
    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        whatsapp: user.whatsapp,
        email: user.email,
        address: user.address,
        namePet: user.namePet,
        species: user.species,
        gender: user.gender,
        race: user.race,
        age: user.age,
        sterilization: user.sterilization,
        description: user.description,
        status: user.status,
        createdAt: user.createdAt,

    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const submit = (event) => {
        event.preventDefault();
        const url = `${import.meta.env.VITE_URL_API}users/${user.id}`;
        const requestBody = {
            ...formData
        };

        axios.patch(url, requestBody, config)
            .then(res => {
                console.log(res.data)
                toast.success('El usuario se Edito Exitosamente');
            }
            )
            .catch(err => console.log(err));
    };
    return (
        <div>
            <ToastContainer />
            <form className='cardAdminUser__form' onSubmit={submit}>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="namePet"
                    value={formData.namePet}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="species"
                    value={formData.species}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="race"
                    value={formData.race}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="sterilization"
                    value={formData.sterilization}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="active">active</option>
                    <option value="disabled">disabled</option>
                </select>
                <input
                    type="text"
                    name="dateUser"
                    value={formData.createdAt}
                    onChange={handleChange}
                />

                <button type="submit">Editar</button>
            </form>
        </div>
    );
};

export default CaradminUsers