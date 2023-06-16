import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import config from '../utils/getconfig';

const CadAdminSponsor = ({ sponsor }) => {
    const [formData, setFormData] = useState({
        id: sponsor.id,
        name: sponsor.name,
        description: sponsor.description,
        whatssap: sponsor.whatssap,
        email: sponsor.email,
        phone: sponsor.phone,
        facebook: sponsor.facebook,
        status: sponsor.status
    });


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const submit = (event) => {
        event.preventDefault();
        const url = `${import.meta.env.VITE_URL_API}sponsor/${sponsor.id}`;
        const requestBody = {
            ...formData
        };
        console.log(requestBody);;
        axios.patch(url, requestBody, config)
            .then(res => {
                console.log(res.data)
                toast.success('El usuario se editó exitosamente');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <ToastContainer />
            <form className='cardAdminsponsor__form' onSubmit={submit}>
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
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="whatssap"
                    value={formData.whatssap}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="facebook"
                    value={formData.facebook}
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

                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default CadAdminSponsor;
