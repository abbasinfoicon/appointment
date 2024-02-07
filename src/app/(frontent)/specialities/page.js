"use client"
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import Link from 'next/link';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';

const slugify = (string) => {
  return string.toLowerCase().replace(/\s+/g, '-');
};

const Specialities = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: "app/get/Services", method: "GET" });

        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }

        const result = await res.json();

        // Update the state with result.data
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(true);
      }
    };

    fetchData();

  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return <p>Data not Found!!!</p>;
  }

  return (
    <>
      <Banner title="Specialities" img="bnr1.jpg" />

      <div className="section-full bg-white content-inner" id="services">
        <div className="container">
          <div className="section-head text-center ">
            <h3 className="h3 text-uppercase">Our Best <span className="text-primary">Services</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
          </div>
          <div className="section-content ">
            <div className="row">
              {
                data && data.length ? data.map((item, i) => {
                  const slug = slugify(item.title);
                  return (
                    <div className="col-lg-4 col-md-6 col-sm-6 m-b30" key={i}>
                      <div className="dez-box specialities-box">
                        <div className="dez-media"> <Link href={`/specialities/${item.service_id}`}><img src={process.env.BASE_URL + item.image} alt="" /></Link> </div>
                        <div className="dez-info p-a30 border-1">
                          <h4 className="dez-title m-t0"><Link href={`/specialities/${item.service_id}`}>{item.title}</Link></h4>
                          <div className="dez-separator bg-primary"></div>
                          <p className="m-b15">{item.subtitle}</p>
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
    </>
  )
}

export default Specialities