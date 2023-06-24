import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import './style/generateQr.css'
import config from '../utils/getconfig';
import { Link } from 'react-router-dom';

const AdminGenerateQr = () => {
    const [qrCodes, setQrCodes] = useState([]);
    const [showDownloadAllButton, setShowDownloadAllButton] = useState(false);

    useEffect(() => {
        generateQrCodes();
    }, []);

    const generateQrCodes = async () => {
        try {
            const url = `${import.meta.env.VITE_URL_API}/admin/generateQr`;
            const response = await axios.get(url, config);
            setQrCodes(response.data.qrCodes);

            if (response.data.qrCodes.length > 0) {
                setShowDownloadAllButton(true);
            } else {
                setShowDownloadAllButton(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGenerateNewQr = () => {
        generateQrCodes();
    };

    const handleDownloadAll = () => {
        const zip = new JSZip();
        const qrFolder = zip.folder('QR_Codes');

        qrCodes.forEach((qrCode, index) => {
            const filename = `QR_Code_${index}.png`;
            const qrBlob = fetch(qrCode).then((response) => response.blob());

            qrFolder.file(filename, qrBlob);
        });

        zip.generateAsync({ type: 'blob' }).then((content) => {
            FileSaver.saveAs(content, 'QR_Codes.zip');
        });
    };

    return (
        <div className='generateQr__container'>
            <h1>Codigos Qr</h1>
            <div className='generateQr__Links'>
                <Link to='/admin/login'>Inicio</Link>
                <Link to='/admin/sponsor'>Tus Auspiciadores</Link>
                <Link to='/admin/users'>Usuarios</Link>
            </div>
            <div className='generateQr__AllQr'>
                {qrCodes.map((qrCode, index) => (
                    <div key={index}>
                        <img className='imgQr' src={qrCode} alt={`QR Code ${index}`} />
                    </div>
                ))}

            </div>
            <div className='generateQr__AllButtom'>

                {showDownloadAllButton ?
                    <button onClick={handleDownloadAll}>Descargar todos los QR</button>
                    : ''
                }
                <button onClick={handleGenerateNewQr}>Generar nuevos QR</button>
            </div>
        </div>
    );
};

export default AdminGenerateQr;