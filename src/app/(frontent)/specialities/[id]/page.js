'use client'
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import { useParams } from 'next/navigation';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';

const SpecialitiesDetails = () => {
    const params = useParams();
    const id = params.id
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/fetch/${id}`, method: "POST" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const postData = await res.json();

                setData(postData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Banner title={data?.title} img="bnr1.jpg" parents="specialities" />

            <div className="content-area">
                <div className="container">
                    <div className="row portfolio-detail">
                        <div className="col-md-12">
                            <img src={process.env.BASE_URL + data?.image} className="m-b30" alt={data?.title} />
                            <h2 className="m-b10 font-weight-700 ">{data?.title}</h2>

                            <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpecialitiesDetails