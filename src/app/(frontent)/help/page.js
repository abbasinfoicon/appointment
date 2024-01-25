"use client"
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import FetchData from '@/app/components/FetchData';
import Highlight from '@/app/components/Highlight';

const Help = () => {
    const [help, setHelp] = useState(null);
    const page = "help"

    const fetchData = async () => {
        try {
            const res = await FetchData({ url: `app/get/${page}`, method: "GET" });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const newData = await res.json();

            setHelp(newData.data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <>
            <Banner title={help?.title} img="bnr1.jpg" />

            <div className="section-full content-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <h1 className="m-b15 m-t0">{help?.title}</h1>
                            <p><strong>{help?.subtitle}</strong></p>

                            <div dangerouslySetInnerHTML={{ __html: help?.description }}></div>
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

export default Help