"use client"
import React, { useEffect, useState } from 'react'
import FetchData from '../FetchData';
import dynamic from "next/dynamic";
import Link from 'next/link';
import Loading from '@/app/loading';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false, });

const options = {
    loop: true,
    margin: 0,
    autoplaySpeed: 5000,
    autoplay: 8000,
    items: 1,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    nav: true,
    dots: false,
    navText: ["<i class='arow-left'></i>", "<i class='arow-right'></i>"],
}

const Slider = () => {
    const [slider, setSlider] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSlider = async () => {
        try {
            const res = await FetchData({ url: "app/allBanners", method: "GET" });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await res.json();

            setSlider(result.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setLoading(true);
        }
    };

    useEffect(() => {
        fetchSlider();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        slider.length ?
            <OwlCarousel className="main-slider" id="home" {...options}>
                {
                    slider.map((item, i) => {
                        return (
                            <div className="item" key={i}>
                                <div className="mainSlider">
                                    <img className='img-fluid' src={`${item?.image == null ? "/assets/images/avatar/1.jpg" : process.env.BASE_URL + item?.image}`} />
                                    <div className="mainSlider-text">
                                        <h3>{item.availability ? 'T' : 'F'}-{item.heading}</h3>
                                        <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>
                                        <Link href="/about" className="site-button">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </OwlCarousel>
            : <p className="text-center">No found the slider.</p>
    )
}

export default Slider