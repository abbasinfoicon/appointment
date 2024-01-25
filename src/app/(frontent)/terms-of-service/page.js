"use client"
import Banner from '@/app/components/Banner'
import FetchData from '@/app/components/FetchData';
import Highlight from '@/app/components/Highlight';
import React, { useEffect, useState } from 'react'

const TermsOfService = () => {
    const [terms, setTerms] = useState(null);
    const page = "privacy-policy"

    const fetchData = async () => {
        try {
            const res = await FetchData({ url: `app/get/${page}`, method: "GET" });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const newData = await res.json();

            setTerms(newData.data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <>
            <Banner title={terms?.title} img="bnr1.jpg" />

            <div className="section-full content-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <h1 className="m-b15 m-t0">{terms?.title}</h1>
                            <p><strong>{terms?.subtitle}</strong></p>

                            <div dangerouslySetInnerHTML={{ __html: terms?.description }}></div>
                        </div>

                        <div className="col-lg-3">
                            <Highlight />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TermsOfService