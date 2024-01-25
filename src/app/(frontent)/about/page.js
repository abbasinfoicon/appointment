"use client"
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import Banner from '@/app/components/Banner';
import Testimonial from '@/app/components/home/Testimonial';
import { useGetAllDoctorQuery } from '@/redux/slices/serviceApi';
import Loading from '@/app/loading';
import Link from 'next/link';
import FetchData from '@/app/components/FetchData';

const About = () => {
  const [about, setAbout] = useState(null);
  const { data = [], isLoading, isFetching, isError } = useGetAllDoctorQuery();

  const fetchData = async () => {
    try {
      const res = await FetchData({ url: `app/get/about`, method: "GET" });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const newData = await res.json();

      setAbout(newData.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.$ = window.jQuery = require('jquery');
    }

    fetchData();
  }, []);

  if (isError) return <p>An error has occurred!</p>
  if (isLoading) return <Loading />
  if (isFetching) return <p>Fetching...</p>

  return (
    <>
      <Banner title={about?.title} img="bnr1.jpg"/>

      <div className="section-full bg-white content-inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center section-head">
              <h3 className="h3">{about?.title}</h3>
              <div className="dez-separator bg-primary"></div>
              <div className="clear"></div>
              <p className="m-b0">{about?.subtitle}</p>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: about?.description }}></div>
        </div>
      </div>

      <div className="section-full bg-img-fix content-inner overlay-black-middle" style={{ backgroundImage: 'url(assets/images/background/bg2.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 m-b30">
              <div className="p-a30 text-white text-center border-3">
                <div className="icon-lg m-b20">
                  <div className="icon-cell text-white"> <i className="fa fa-building-o"></i> </div>
                </div>
                <CountUp start={0} end={1035} duration={2.75}>
                  {({ countUpRef, start }) => (
                    <div className="counter font-26 font-weight-800 text-primary m-b5" ref={countUpRef}></div>
                  )}
                </CountUp>
                <span>Completed Project</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 m-b30">
              <div className="p-a30 text-white text-center border-3">
                <div className="icon-lg m-b20">
                  <div className="icon-cell text-white"> <i className="fa fa-male"></i> </div>
                </div>
                <CountUp start={0} end={1124} duration={2.75}>
                  {({ countUpRef, start }) => (
                    <div className="counter font-26 font-weight-800 text-primary m-b5" ref={countUpRef}></div>
                  )}
                </CountUp>
                <span>Active Experts</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 m-b30">
              <div className="p-a30 text-white text-center border-3">
                <div className="icon-lg m-b20">
                  <div className="icon-cell text-white"> <i className="fa fa-male"></i> </div>
                </div>
                <CountUp start={0} end={834} duration={2.75}>
                  {({ countUpRef, start }) => (
                    <div className="counter font-26 font-weight-800 text-primary m-b5" ref={countUpRef}></div>
                  )}
                </CountUp>
                <span>Happy Clients</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 m-b30">
              <div className="p-a30 text-white text-center border-3">
                <div className="icon-lg m-b20">
                  <div className="icon-cell text-white"> <i className="fa fa-area-chart"></i> </div>
                </div>
                <CountUp start={0} end={538} duration={2.75}>
                  {({ countUpRef, start }) => (
                    <div className="counter font-26 font-weight-800 text-primary m-b5" ref={countUpRef}></div>
                  )}
                </CountUp>
                <span>Developer Hand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-full bg-white content-inner">
        <div className="container">
          <div className="section-head text-center ">
            <h3 className="h3">Meet our Dedicate Team</h3>
            <div className="dez-separator bg-primary"></div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
          </div>
          <div className="section-content ">
            <div className="row">
              {
                data.length ? data.slice(0, 3).map((item, i) => (
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12 m-b30" key={i}>
                    <div className="dez-box">
                      <div className="dez-media height_eql">
                        <Link href={`/doctor/${item.user.id}`}><img src={`${item?.image == null ? "/assets/images/our-team/pic1.jpg" : item?.image}`} alt="" /></Link>
                      </div>

                      <div className="dez-info p-a20 p-t40 border-1">
                        <h4 className="dez-title m-tb0"><Link href={`/doctor/${item.user.id}`}>Dr. {item.user.first_name} {item.user.last_name}</Link></h4>

                        <div className="bg-primary skew-content-box">
                          <ul className="dez-social-icon">
                            <li><Link className="fa fa-facebook" href="#"></Link></li>
                            <li><Link className="fa fa-twitter" href="#"></Link></li>
                            <li><Link className="fa fa-linkedin" href="#"></Link></li>
                            <li><Link className="fa fa-google-plus" href="#"></Link></li>
                            <li><Link className="fa fa-pinterest-p" href="#"></Link></li>
                            <li><Link className="fa fa-instagram" href="#"></Link></li>
                          </ul>
                        </div>
                        <span>{item.specialization}</span>
                        <p className="m-t10 m-b0">{item.doctor_details}</p>
                      </div>
                    </div>
                  </div>
                )) : <p>Doctor not found...!!!</p>
              }


              <div className="col-md-12 text-center">
                <Link className="site-button" href="/doctor">View More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-full overlay-black-middle bg-img-fix content-inner-1" style={{ backgroundImage: 'url(assets/images/background/bg2.jpg)' }}>
        <div className="container">
          <div className="section-head text-center text-white">
            <h3 className="h3">Our Testimonials</h3>
            <div className="dez-separator-outer ">
              <div className="dez-separator bg-primary style-liner"></div>
            </div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
          </div>
          <div className="section-content">
            <Testimonial />
          </div>
        </div>
      </div>
    </>
  )
}

export default About