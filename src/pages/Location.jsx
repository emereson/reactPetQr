import React, { useEffect } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import './style/location.css'

const Location = () => {
    useEffect(() => {
        loadGoogleMapsAPI({ key: 'AIzaSyAmrdnn3EJ9kvjDcEFDVX18FZjpTENpYz0', libraries: ['places'] })
            .then((googleMaps) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const latitude = position.coords.latitude;
                            const longitude = position.coords.longitude;

                            const map = new googleMaps.Map(document.getElementById('map'), {
                                center: { lat: latitude, lng: longitude },
                                zoom: 15,
                            });

                            new googleMaps.Marker({
                                position: { lat: latitude, lng: longitude },
                                map: map,
                            });

                            const infoWindow = new googleMaps.InfoWindow({
                                content: '¡Estás aquí!',
                            });

                            const locationButton = document.createElement('button');
                            locationButton.textContent = 'Saber mi ubicación';
                            locationButton.classList.add('custom-map-control-button');

                            map.controls[googleMaps.ControlPosition.TOP_RIGHT].push(locationButton);

                            locationButton.addEventListener('click', () => {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                            const userLatitude = position.coords.latitude;
                                            const userLongitude = position.coords.longitude;

                                            map.setCenter({ lat: userLatitude, lng: userLongitude });
                                            map.setZoom(15);

                                            new googleMaps.Marker({
                                                position: { lat: userLatitude, lng: userLongitude },
                                                map: map,
                                            });

                                            infoWindow.setPosition({ lat: userLatitude, lng: userLongitude });
                                            infoWindow.open(map);
                                        },
                                        (error) => {
                                            console.error('Error al obtener la geolocalización:', error);
                                        }
                                    );
                                } else {
                                    console.error('Geolocalización no soportada por el navegador.');
                                }
                            });

                            const shareLocationButton = document.createElement('button');
                            shareLocationButton.textContent = 'Compartir ubicación';
                            shareLocationButton.classList.add('custom-map-control-button1');

                            map.controls[googleMaps.ControlPosition.TOP_RIGHT].push(shareLocationButton);

                            shareLocationButton.addEventListener('click', () => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'Compartir ubicación',
                                        text: 'Mi ubicación actual',
                                        url: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
                                    })
                                        .then(() => console.log('Ubicación compartida exitosamente.'))
                                        .catch((error) => console.error('Error al compartir la ubicación:', error));
                                } else {
                                    console.error('Compartir ubicación no soportado por el navegador.');
                                }
                            });
                        },
                        (error) => {
                            console.error('Error al obtener la geolocalización:', error);
                        }
                    );
                } else {
                    console.error('Geolocalización no soportada por el navegador.');
                }
            })
            .catch((error) => {
                console.error('Error al cargar la API de Google Maps:', error);
            });
    }, []);

    return <div id="map" style={{ height: '15em', width: '100%' }}></div>;
};

export default Location;