import React, { useEffect } from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api';
import './style/location.css';

const Location = ({ latitude, longitude }) => {
  useEffect(() => {
    const initMap = async () => {
      try {
        const googleMaps = await loadGoogleMapsAPI({
          key: 'AIzaSyAmrdnn3EJ9kvjDcEFDVX18FZjpTENpYz0',
          libraries: ['places'],
        });

        const mapElement = document.getElementById('map');

        if (!mapElement) return;

        const map = new googleMaps.Map(mapElement, {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
        });

        const addMarker = (lat, lng) => {
          new googleMaps.Marker({
            position: { lat, lng },
            map,
          });
        };

        const addInfoWindow = (lat, lng) => {
          const infoWindow = new googleMaps.InfoWindow({
            content: '¡Estás aquí! 🔻',
          });

          infoWindow.setPosition({ lat, lng });
          infoWindow.open(map);
        };

        const addButton = (text, onClick) => {
          const button = document.createElement('button');
          button.textContent = text;
          button.classList.add('custom-map-control-button');
          map.controls[googleMaps.ControlPosition.TOP_RIGHT].push(button);
          button.addEventListener('click', onClick);
        };

        addButton('Saber mi ubicación', () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;

                map.setCenter({ lat: userLatitude, lng: userLongitude });
                map.setZoom(15);

                addMarker(userLatitude, userLongitude, true); // Agregar marcador de ubicación actual
                addInfoWindow(userLatitude, userLongitude);
              },
              (error) => {
                console.error('Error al obtener la geolocalización:', error);
              }
            );
          } else {
            console.error('Geolocalización no soportada por el navegador.');
          }
        });

        addButton('Compartir ubicación', () => {
          if (navigator.share) {
            const shareURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            navigator
              .share({
                title: 'Compartir ubicación',
                text: 'Mi ubicación actual',
                url: shareURL,
              })
              .then(() => {
                console.log('Ubicación compartida exitosamente.');
              })
              .catch((error) => {
                console.error('Error al compartir la ubicación:', error);
              });
          } else {
            console.error('Compartir ubicación no soportado por el navegador.');
          }
        });
      } catch (error) {
        console.error('Error al cargar la API de Google Maps:', error);
      }
    };

    initMap();
  }, [latitude, longitude]);

  return <div id="map" style={{ height: '15em', width: '100%' }}></div>;
};

export default Location;
