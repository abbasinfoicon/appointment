"use client"
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import FetchData from '@/app/components/FetchData';
import Highlight from '@/app/components/Highlight';

const PrivacyPolicy = () => {
    const [privacyPolicy, setPrivacyPolicy] = useState(null);
    const page = "privacy-policy"

    const fetchData = async () => {
        try {
            const res = await FetchData({ url: `app/get/${page}`, method: "GET" });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const newData = await res.json();

            setPrivacyPolicy(newData.data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <>
            <Banner title={privacyPolicy?.title} img="bnr1.jpg" />

            <div className="section-full content-inner">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-md-12 m-b10">
                            <h1 className="m-b20 m-t0">{privacyPolicy?.title}</h1>
                            <p><strong>{privacyPolicy?.subtitle}</strong></p>
                            <div className="dez-separator bg-primary"></div>

                            <div dangerouslySetInnerHTML={{ __html: privacyPolicy?.description }}></div>
                        </div>

                        <div className="col-lg-3 col-md-12">
                            <Highlight />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy