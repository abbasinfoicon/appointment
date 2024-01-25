"use client"
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import FetchData from '@/app/components/FetchData';

const Facilities = () => {
  const [facilitie, setFacilitie] = useState(null);
  const page = "facilities"

  const fetchData = async () => {
    try {
      const res = await FetchData({ url: `app/get/${page}`, method: "GET" });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const newData = await res.json();

      setFacilitie(newData.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <Banner title={facilitie?.title} img="bnr1.jpg" />

      <div className="section-full content-area bg-white">
        <div className="container">
          <div className="row m-b50">
            <div className="col-lg-4 col-md-4 m-b30">
              <img src={process.env.BASE_URL + facilitie?.image} alt={facilitie?.title} />
            </div>
            <div className="col-lg-8 col-md-8">
              <h2 className="text-uppercase">{facilitie?.title}</h2>
              <p><strong>{facilitie?.subtitle}</strong></p>

              <div dangerouslySetInnerHTML={{ __html: facilitie?.description }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Facilities