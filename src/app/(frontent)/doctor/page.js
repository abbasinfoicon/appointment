"use client"
import Banner from '@/app/components/Banner'
import Loading from '@/app/loading'
import { useGetAllDoctorQuery } from '@/redux/slices/serviceApi'
import Link from 'next/link'
import React from 'react'

const Doctor = () => {
  const { data = [], isLoading, isFetching, isError } = useGetAllDoctorQuery();

  if (isError) return <p>An error has occurred!</p>
  if (isLoading) return <Loading />
  if (isFetching) return <p>Fetching...</p>

  return (
    <>
      <Banner title="Doctors" img="bnr1.jpg" />

      <div className="section-full content-inner bg-gray">
        <div className="container">
          <div className="section-head text-center ">
            <h3 className="h3 text-uppercase">Meet Our  <span className="text-primary">Doctors</span></h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
          </div>
          <div className="section-content text-center ">
            <div className="row">
              {
                data.length && data.map((item, i) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 m-b15" key={i}>
                    <div className="dez-box xob-zed">
                      <div className="dez-media">
                        <Link href={`/doctor/${item.user.id}`}><img src={`${item?.image == null ? "/assets/images/avatar/1.jpg" : item?.image}`} alt={item.user.first_name} /></Link>
                      </div>

                      <div className="dez-info p-a30 bg-white">
                        <h4 className="dez-title m-t0 m-b15"><Link href={`/doctor/${item.user.id}`}>Dr. {item.user.first_name} {item.user.last_name}</Link></h4>

                        <div className="specialitie">
                          <p><i className="fa fa-user-md" aria-hidden="true"></i> {item.specialization}</p>
                          <p><i className="fa fa-graduation-cap" aria-hidden="true"></i> {item.qualifications}</p>
                        </div>

                        <ul className="dez-social-icon border dez-social-icon-lg">
                          <li><Link href="#" className="fa fa-facebook facebook-btn"></Link></li>
                          <li><Link href="#" className="fa fa-twitter twitter-btn"></Link></li>
                          <li><Link href="#" className="fa fa-linkedin linkedin-btn"></Link></li>
                          <li><Link href="#" className="fa fa-instagram instagram-btn"></Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Doctor