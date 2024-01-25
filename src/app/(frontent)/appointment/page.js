import Banner from '@/app/components/Banner'
import React from 'react'
import AppointmentForm from "@/app/components/Appointment";

const Appointment = () => {
    return (
        <>
            <Banner title="Appointment" img="bnr1.jpg" />

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

                                    <AppointmentForm />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appointment