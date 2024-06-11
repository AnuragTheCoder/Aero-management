import React, { useEffect } from 'react'

import Background from './Background/Background';
import { useState } from 'react';
import Hero from './Hero/Hero';
const Header = () => {
    let heroData = [
        {
            text1: "Streamline", text2: "Your Airline"
        },
        {
            text1: "Your Partner", text2: "in Excellence"
        },
        {
            text1: "The future of", text2: "Airline Management"
        }
    ]

    useEffect(() => {
        setInterval(() => {
            setHeroCount((prev) => { return (prev + 1) % 3 })
        }, 3000)
    }, [])

    const [heroCount, setHeroCount] = useState(2);
    const [playStatus, setPlayStatus] = useState(true);
    return (
        <div>

            <Background heroCount={heroCount} playStatus={playStatus} />
            <Hero setPlayStatus={setPlayStatus} heroData={heroData} heroCount={heroCount} setHeroCount={setHeroCount} playStatus={playStatus} />
        </div>
    )
}

export default Header