'use client'
import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

const options = {
    loop: true,
    margin: 30,
    autoplaySpeed: 8000,
    autoplay: 5000,
    autoplayHoverPause: true,
    nav: true,
    dots: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
        0: { items: 1 },
        480: { items: 2 },
        991: { items: 2 },
        1000: { items: 3 }
    }
}

const Testimonial = () => {
    const [testimonial, setTestimonial] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(process.env.BASE_URL + '/app/ratings');

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                }

                const data = await res.json();
                setTestimonial(data.data);

                if (!data) {
                    return <p>Loading...</p>;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="section-full content-inner-1 bg-white">
            <div className="container">
                <div className="section-head text-center ">
                    <h3 className="h3 text-uppercase">What <span className="text-primary"> Patients Says</span></h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
                </div>
                <div className="section-content owl-dots-black-full btn-black">
                    {
                        testimonial.length ? <OwlCarousel className="testimonial-three1 owl-theme owl-btn-3 primary owl-btn-center-lr owl-dots-white-full btn-white" {...options}>
                            {
                                testimonial.map((item) => {
                                    return (
                                        <div className="item" key={item.id}>
                                            <div className="testimonial-2 testimonial-bg">
                                                <div className="testimonial-text">
                                                    <div className="rating-bar">
                                                        {
                                                            Array.from({ length: 5 }).map((_, index) => (
                                                                <i key={index} className={`fa fa-star ${index < item?.star ? 'text-warning' : ''}`}></i>
                                                            ))
                                                        }
                                                    </div>

                                                    <p dangerouslySetInnerHTML={{ __html: item?.comment }}></p>
                                                </div>
                                                <div className="testimonial-detail clearfix">
                                                    <div className="testimonial-pic quote-left radius shadow"><img src="/assets/images/patients/patient2.png" alt="" width="100" height="100" /></div>
                                                    <strong className="testimonial-name">{item.user.first_name}</strong> <span className="testimonial-position">{item.user.roles}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </OwlCarousel>
                            : <p className='text-center'>No Testimonial...!!!</p>
                    }
                </div>
            </div>
        </div>

    )
}

export default Testimonial