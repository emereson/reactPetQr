import React from 'react'
import './style/sponsorStyle.css'
import { Link } from 'react-router-dom';

const Sponsor = ({ cardsponsor, imgSelected }) => {
    const styleMovent = {
        transform: `translateX(calc(-${imgSelected} * 100%))`,
        transition: `0.5s`,
    }

    return (
        <div className='cardSponsor__container' style={styleMovent}>
            <h2 className='cardSponsor__h2'> {cardsponsor.name}</h2>
            <img className='cardSponsor__img' src={cardsponsor.sponsorImg} alt="" />
            <p className='cardSponsor__p'>{cardsponsor.description}</p>
            <ul className='cardSponsor__ul'>
                <li className='cardSponsor__li' ><Link to={`mailto:${cardsponsor.email}?subject=Hola&body=¡Hola! ¿Cómo estás?`} target='_blank'> <i className='bx bxl-gmail'></i></Link> </li>
                <li className='cardSponsor__li' >
                    <Link to={`https://api.whatsapp.com/send?phone=51${cardsponsor.whatssap}`} target='_blank'><i className='bx bxl-whatsapp'></i>
                    </Link></li>
                <li className='cardSponsor__li' ><Link to={`${cardsponsor.facebook}`} target='_blank'><i className='bx bxl-facebook-circle'  ></i></Link> </li>
            </ul >
        </div >
    )
}

export default Sponsor