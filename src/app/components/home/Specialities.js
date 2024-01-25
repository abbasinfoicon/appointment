"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FetchData from '../FetchData';
import Loading from '@/app/loading';

const Specialities = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "app/get/Services", method: "GET" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                // Update the state with result.data
                setData(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="section-full bg-white content-inner" id="services">
            <div className="container">
                <div className="section-head text-center ">
                    <h3 className="h3 text-uppercase">Our Best <span className="text-primary">Services</span></h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
                </div>
                <div className="section-content ">
                    <div className="row">
                        {
                            data.length ? data.slice(0, 6).map((item, i) => {
                                return (
                                    <div className="col-lg-4 col-md-6 col-sm-6 m-b30" key={i}>
                                        <div className="dez-box">
                                            <div className="dez-media"> <Link href={`/specialities/${item.service_id}`}><img src={process.env.BASE_URL + item.image} alt="" /></Link> </div>
                                            <div className="dez-info p-a30 border-1">
                                                <h4 className="dez-title m-t0"><Link href={`/specialities/${item.service_id}`}>{item.title}</Link></h4>
                                                <div className="dez-separator bg-primary"></div>
                                                <p className="m-b15">{item.subtitle}</p>
                                                {/* <p className="m-b15" dangerouslySetInnerHTML={{ __html: item.description }}></p> */}
                                                <Link href={`/specialities/${item.service_id}`} className="site-button-link black">Read More <i className="fa fa-long-arrow-right"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <p>Data not Found!!!</p>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Specialities