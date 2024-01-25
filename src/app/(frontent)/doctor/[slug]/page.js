'use client'
import Banner from '@/app/components/Banner';
import Loading from '@/app/loading';
import { useGetSingleDoctorQuery } from '@/redux/slices/serviceApi';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Appointment from '../Appointment';
import FetchData from '@/app/components/FetchData';

const page = () => {
    const pathname = usePathname();
    const slug = pathname.replace(/^\/doctor\//, '');
    const { data = [], isLoading, isFetching, isError } = useGetSingleDoctorQuery(slug)
    const [slotData, setSlotData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res2 = await FetchData({ url: `app/all_slot_v/${slug}`, method: "POST" });
                if (!res2.ok) {
                    throw new Error('Failed to fetch data from app/all_slot_v');
                }

                const result2 = await res2.json();
                setSlotData(result2.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();

    }, [slug]);

    if (isError) return <p>An error has occurred!</p>
    if (isLoading) return <Loading />
    if (isFetching) return <p>Fetching...</p>

    const today = new Date().toISOString().split('T')[0];
    const filteredSlots = slotData.filter(item => item.slot_date >= today);

    return (
        <>
            <Banner title={`Dr. ${data.user.first_name} ${data.user.last_name}`} img="bnr1.jpg" parents="doctor" />

            <section className="team_details content-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 wow fadeInLeft" data-wow-duration="1s">
                            <div className="row">
                                <div className="col-xl-5 col-md-5 col-lg-5">
                                    <div className="team_details_img">
                                        <img src={`${data.image == null ? "/assets/images/our-team/pic13.jpg" : data.image}`} alt={data.user.first_name} className="img-fluid w-100" />
                                    </div>
                                </div>
                                <div className="col-xl-7 col-md-7 col-lg-7">
                                    <div className="team_details_img_text">
                                        <p className='mt-0 mb-2 rating-star'>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </p>
                                        <h3>Dr. <strong>{data.user.first_name} {data.user.last_name}</strong></h3>
                                        <p>Gender: <strong>{data.user.gender}</strong></p>
                                        <p>Address: <strong>{data.user.address}</strong></p>
                                        <p>City: <strong>{data.user.city}</strong></p>
                                        <p>State: <strong>{data.user.state}</strong></p>
                                        <a href={`callto:${data.user.phone_no}`}>Call: <strong>{data.user.phone_no}</strong></a>
                                        <a href={`mailto:${data.user.email}`}>Email: <strong>{data.user.email}</strong></a>
                                    </div>
                                </div>
                            </div>

                            <div className="biography">
                                <h3>Biography of Dr. {data.user.first_name} {data.user.last_name}</h3>
                                <div className="biography_text">
                                    <h4 className="mb-3">Educational Background</h4>
                                    <p>Qualifications: <strong>{data.qualifications}</strong></p>
                                    <p>Experience: <strong>{data.experience} Year</strong></p>
                                    <p>Specialization: <strong>{data.specialization}</strong></p>
                                    <p>License No: <strong>{data.license_no}</strong></p>

                                    <p className="mb-4">{data.brief_description}</p>

                                    <h4 className="mb-3">Consultation Fees</h4>
                                    <p>Consultation Fees Online: <strong>{data.consultation_fees_online}</strong></p>
                                    <p>Consultation Fees Offline: <strong>{data.consultation_fees_offline}</strong></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 wow fadeInRight" data-wow-duration="1s">
                            <div className="team_details_sidebar" id="sticky_sidebar">
                                <Appointment slot={filteredSlots} drId={slug} />

                                <div className="team_details_timeing">
                                    <h5>Opening Time</h5>
                                    {
                                        filteredSlots.map((item) => {
                                            const months = [
                                                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                            ];

                                            const dateObject = new Date(item.slot_date);
                                            const formattedDate = `${dateObject.getDate()}-${months[dateObject.getMonth()]}-${dateObject.getFullYear()}`;

                                            const formattedStartTime = new Date(`01/01/1970 ${item.slot_start_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                                            const formattedEndTime = new Date(`01/01/1970 ${item.slot_end_time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                                            return (
                                                <p className="d-flex justify-content-between" key={item.id}>
                                                    {formattedDate} <span>{formattedStartTime} - {formattedEndTime}</span>
                                                </p>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page