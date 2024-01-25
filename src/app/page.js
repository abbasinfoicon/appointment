'use client'
import { useEffect } from "react";
import CountUp from 'react-countup';
import Testimonial from "./components/home/Testimonial";
import Link from "next/link";
import Appointment from "./components/Appointment";
import Slider from "./components/home/Slider";
import Doctor from "./components/home/Doctor";
import Gallery from "./components/home/Gallery";
import Post from "./components/home/Post";
import Specialities from "./components/home/Specialities";

export default function Home() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Import and initialize magnific-popup
      const $ = require("jquery");
      require("magnific-popup");

      $(document).ready(function () {
        $('.popup-youtube').magnificPopup({
          type: 'iframe',
        });
      });
    }
  }, []);

  return (
    <div className="page-content">
      <Slider />


      <div className="section-full content-inner bg-white video-section">
        <div className="container">
          <div className="section-content">
            <div className="row d-flex">
              <div className="col-lg-6 col-md-6 align-self-center m-b30">
                <h2 className="m-b15">Health Care with <br /><span className="text-primary">Carezone Hospital Center</span></h2>
                <p className="m-b15">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has.</p>
                <p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                <img src="assets/images/sign.png" width="200" alt="" />
                <h4 className="m-b0">Jone Doe</h4>
                <span className="font-14">HOSPITAL DIRECTOR</span>
              </div>
              <div className="col-lg-6 col-md-6 m-b30">
                <div className="video-bx">
                  <img src="assets/images/pic1.jpg" alt="" />
                  <div className="video-play-icon">
                    <Link href="https://www.youtube.com/watch?v=q5sURR9fvvk" className="popup-youtube video bg-primary"><i className="fa fa-play"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-full content-inner doctor-stats-bx bg__img">
        <div className="container">
          <div className="section-head text-center ">
            <h3 className="h3 text-uppercase">About <span className="text-primary">Dr. Appointment</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
          </div>
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="counter-style-1 m-b30">
                <div className="text-primary">
                  <i className="icon flaticon-bar-chart"></i>
                  <CountUp start={0} end={7652} delay={2.75}>
                    {({ countUpRef }) => (
                      <span className="counter" ref={countUpRef} />
                    )}
                  </CountUp>
                </div>
                <span className="counter-text">Completed Projects</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="counter-style-1 m-b30">
                <div className="text-primary">
                  <i className="icon flaticon-social"></i>
                  <CountUp start={0} end={4562} duration={2.75}>
                    {({ countUpRef }) => (
                      <span className="counter" ref={countUpRef} />
                    )}
                  </CountUp>
                </div>
                <span className="counter-text">Happy Clients</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="counter-style-1 m-b30">
                <div className="text-primary">
                  <i className="icon flaticon-file"></i>
                  <CountUp start={0} end={3569} duration={2.75}>
                    {({ countUpRef }) => (
                      <span className="counter" ref={countUpRef} />
                    )}
                  </CountUp>
                </div>
                <span className="counter-text">Questions Answered</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="counter-style-1 m-b30">
                <div className="text-primary">
                  <i className="icon flaticon-pencil"></i>
                  <CountUp start={0} end={2089} duration={2.75}>
                    {({ countUpRef }) => (
                      <span className="counter" ref={countUpRef} />
                    )}
                  </CountUp>
                </div>
                <span className="counter-text">Ordered Coffee's</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Specialities />

      <div className="section-full bg-img-fix overlay-primary-dark content-inner-1 dez-support" style={{ backgroundImage: 'url(assets/images/background/bg5.jpg)' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center text-white ">
              <h2 className="m-b15 m-t0">We provide 24/7 customer support.</h2>
              <h3 className="m-t0 m-b20">Please feel free to contact us at (01) 234 5678 for emergency case.</h3>
              <Link href="/contact" className="site-button white radius-sm">Read More</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section-full content-inner bg-white">
        <div className="container">
          <div className="section-content">
            <div className="row">
              <div className="col-lg-5 align-self-end m-b30">
                <div className="dez-thum d-sm-none d-lg-block"><img src="assets/images/worker.png" alt="" /></div>
              </div>
              <div className="col-lg-7 m-b30">
                <h3 className="h3 text-uppercase">Make An <span className="text-primary"> Request</span></h3>
                <p className="m-b30">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.</p>
                <div className="clearfix bg-primary radius-sm text-white p-a30 about-appoint">
                  <div className="dzFormMsg"></div>

                  <Appointment />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Doctor />

      <Gallery />

      <Post />

      <Testimonial />
    </div >
  )
}
