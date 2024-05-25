import React from 'react'
import './Background.css'

import video1 from '../../Assets/Video1.mp4'
import image1 from '../../Assets/Screenshot (109).png'
import image2 from '../../Assets/Screenshot (111).png'
import image3 from '../../Assets/Screenshot (112).png'

const Background = ({ playStatus, heroCount }) => {

    if (playStatus) {
        return (
            <video className='Background fade-in' autoPlay loop muted>
                <source src={video1} type='video/mp4' />
            </video>
        )
    }
    else if (heroCount === 0) {
        return <img src={image1} className='Background fade-in' alt="img1"></img>
    }
    else if (heroCount === 1) {
        return <img src={image2} className='Background fade-in' alt="img2"></img>
    }
    else if (heroCount === 2) {
        return <img src={image3} className='Background fade-in' alt="img3"></img>
    }

}

export default Background