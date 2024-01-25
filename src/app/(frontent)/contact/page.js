"use client"
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import ContactData from '@/app/(backend)/dashboard/contact/ContactData';
import Link from 'next/link';
import Appointment from '@/app/components/Appointment';

const Contact = () => {
  const [dataContact, setDataContact] = useState([]);
  const [dataSocial, setDataSocial] = useState([]);

  useEffect(() => {
    setDataContact(ContactData.contact);
    setDataSocial(ContactData.social);
  }, [])

  return (
    <>
      <Banner title="Contact" img="bnr1.jpg" />

      <div className="section-full content-inner-1 bg-white contact-style-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="p-a30 bg-gray clearfix m-b30 ">
                <h2>Send Message Us</h2>

                <Appointment />
              </div>
            </div>

            <div className="col-lg-4 d-flex">
              <div className="p-a30 m-b30 border-1 contact-area align-self-stretch">
                <h2 className="m-b10">Quick Contact</h2>
                <p>If you have any questions simply use the following contact details.</p>

                <ul className="no-margin">
                  {
                    dataContact.map(item => (
                      <li className="icon-bx-wraper left m-b30" key={item.id}>
                        <div className="icon-bx-xs bg-primary"><Link href={`${item.name === 'Phone' ? `tel:${item.content}` : item.name === 'Email' ? `mailto:${item.content}` : '#'}`} className="icon-cell"><i className={`icon-${item.icon}`}></i></Link> </div>
                        <div className="icon-content">
                          <h6 className="text-uppercase m-tb0 dez-tilte">{item.name}:</h6>
                          <p>
                            <Link href={`${item.name === 'Phone' ? `tel:${item.content}` : item.name === 'Email' ? `mailto:${item.content}` : '#'}`}>
                              {item.content}
                            </Link>
                          </p>
                        </div>
                      </li>
                    ))
                  }
                </ul>

                <div className="m-t20">
                  <ul className="dez-social-icon border dez-social-icon-lg">
                    {
                      dataSocial.map(item => (
                        <li key={item.id}><Link href={item.link} className={`fa fa-${item.icon} bg-primary`} target='_blank'></Link></li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-md-12">
              <h2 className="m-b20">Our Location</h2>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825624477!2d75.65046970649679!3d26.88544791796718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1500819483219"
                style={{ border: '0', width: '100%', height: '400px' }}
                allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Contact