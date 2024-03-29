'use client'

import DeleteModal from '@/app/(backend)/components/DeleteModal';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const AppointmentDetails = () => {
  const params = useParams();
  const name = params.name;
  const searchParams = useSearchParams();
  const docId = searchParams.get('docId');

  const [data, setData] = useState({});
  const [prescription, setPrescription] = useState([]);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;
  const [loading, setLoading] = useState(true);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `app/appointment/${name}`, method: "GET", authorization: `Bearer ${token}` });
        const pre = await FetchData({ url: `app/prescriptions`, method: "GET", authorization: `Bearer ${token}` });

        if (!res.ok || !pre.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await res.json();
        setData(result.data);

        const appointment_id = result.data.id;
        const preRes = await pre.json();
        const filteredData = preRes.filter(item => item.appointment_id.id === appointment_id);
        setPrescription(filteredData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  const handleDeletePopup = (did) => {
    setDeleteContent(!deleteContent);
    setDeleteId(did);
  }

  if (loading) {
    return <Loading />;
  }

  const isDatePassed = (dateString) => {
    const currentDate = new Date();
    const expireDate = new Date(dateString);
    expireDate.setDate(expireDate.getDate() + 1);
    expireDate.setHours(23, 59, 59, 999);
    return currentDate > expireDate;
  };

  return (

    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>View Appointment</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            {docId === null ? null : <li className="breadcrumb-item"><Link href="/dashboard/doctors">Doctors</Link></li>}
            <li className="breadcrumb-item"><Link href={`/dashboard/${docId === null ? 'appointments' : `doctors/${docId}/appointment`}`}>Appointment</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Appointment Details</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className={`${docId === null ? 'col-xl-4' : 'd-none'} col-xxl-6 col-lg-6 col-md-12`}>
          <div className="card card-custom">
            <div className="text-center p-3 overlay-box" style={{ backgroundImage: 'url(/assets/images/big/img5.jpg)' }}>
              <img src={`${data?.doctor?.image == null ? "/assets/images/avatar/1.jpg" : process.env.BASE_URL + data?.doctor?.image}`} width="100" className="img-fluid rounded-circle mt-2 h-100px" alt="" />
              <h3 className="mt-3 mb-0 text-white">{`${data?.doctor?.user?.first_name} ${data?.doctor?.user?.last_name}`}</h3>
              <p className="text-white mb-0 mt-2">{`${data?.doctor?.specialization}`}</p>
            </div>

            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-5">
                  <div className="rating-bar">
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <i className="fa fa-star text-warning"></i>
                    <span className="badge border-dark border ml-3">4.9</span>
                  </div>
                </div>

                <div className="col-7">
                  <Link href={`mailto:${data?.doctor?.user?.email}`} className="d-block my-2 text-dark"><strong>{data?.doctor?.user?.email}</strong></Link>
                </div>
              </div>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Doctor ID</span> {data?.doctor?.user?.id}</li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Years of Experience</span> {data?.doctor?.experience} Year</li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">License number</span>{data?.doctor?.license_no} </li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Consultation_fees_online</span> {data?.doctor?.consultation_fees_online}</li>
                <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Consultation_fees_offline</span> {data?.doctor?.consultation_fees_offline}</li>
              </ul>
            </div>

            <div className="card card-custom">
              <div className="card-header">
                <h4 className="card-title">Brief Information About Doctor</h4>
              </div>
              <div className='card-body'>
                <p dangerouslySetInnerHTML={{ __html: data?.doctor?.brief_description }}></p>
              </div>
            </div>

            <Link href={`/dashboard/doctors/${data.doctor.user.id}`} className={`btn btn-primary btn-rounded pl-3 pr-3`}>Show Details</Link>
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-md-6">
          <div className="card">
            <div className="text-center py-4 px-5 overlay-box" style={{ backgroundImage: 'url(/assets/images/big/img1.jpg)' }}>
              <div className="profile-photo">
                <img src={`/assets/images/patients/patient1.png`} width="100" className="img-fluid rounded-circle" alt="" />
              </div>

              <h3 className="mt-3 mb-1 text-white">{data.patient.first_name} {data.patient.last_name}</h3>
              <p className="text-white mb-0">{data.patient.email}</p>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Patient Id</span><strong className="text-muted">{data.patient.id}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Patient Gender</span> <strong className="text-muted">{data.patient.gender}	</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Phone No.</span> <strong className="text-muted">{data.patient.phone_no}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">Address</span> <strong className="text-muted">{data.patient.address}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">City</span> <strong className="text-muted">{data.patient.city}</strong></li>
              <li className="list-group-item d-flex justify-content-between"><span className="mb-0">State</span> <strong className="text-muted">{data.patient.state}</strong></li>
            </ul>

            <div className="card card-custom">
              <div className="card-header">
                <h4 className="card-title">Patient's disease information</h4>
              </div>
              <div className='card-body'>
                <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
              </div>
            </div>

            <Link href={`/dashboard/patients/${data.patient.id}`} className={`btn btn-primary btn-rounded pl-3 pr-3`}>Show Details</Link>
          </div>
        </div>

        <div className={`${docId === null ? 'col-xl-4' : 'col-xl-8'} col-xxl-6 col-lg-6 col-md-12`}>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Appointment Timeline</h4>
            </div>

            <div className="card-body">
              <div className="widget-timeline ps ps--active-y">
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge primary"></div>
                    <div className="timeline-panel text-muted">
                      <span>{data.slot_date}</span>
                      <h6 className="m-t-5">Appointment Time - {data.slot_start_time} to {data.slot_end_time}</h6>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-badge warning"></div>
                    <div className="timeline-panel text-muted">
                      <span>{data.created_by}</span>
                      <h6 className="m-t-5">Created by</h6>
                    </div>
                  </li>

                  <li>
                    <div className={`timeline-badge ${data.status == 'Confirmed' ? 'success' : 'danger'}`}></div>
                    <div className="timeline-panel text-muted">
                      <span>{isDatePassed(data.slot_date) ? "Expired" : data.status}</span>
                      <h6 className="m-t-5">Appointment {data.status == 'Confirmed' ? '' : 'Not'} Completed</h6>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-badge info"></div>
                    <div className="timeline-panel text-muted">
                      <span>Description</span>
                      <h6 className="m-t-5" dangerouslySetInnerHTML={{ __html: data.description }}></h6>
                    </div>
                  </li>

                  <li>
                    <div className="timeline-badge dark"></div>
                    <div className="timeline-panel text-muted">
                      <span>
                        <strong>Updated: </strong>
                        {(() => {
                          const updatedAtDate = new Date(data.updated_at);
                          const formattedUpdatedAt = `${updatedAtDate.toLocaleDateString()}, ${updatedAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

                          return formattedUpdatedAt;
                        })()}
                      </span>
                      <h6 className="m-t-5">Updated Time</h6>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-footer border-0 mt-0 text-center">
              <Link className="btn btn-primary btn-rounded pl-3 pr-3" href={`/dashboard/${docId === null ? 'appointments' : `doctors/${docId}/appointment`}`}><i className="icon-list pr-1"></i>All View Appointments</Link>
              <Link className={`${docId === null ? 'd-none' : 'btn btn-info btn-rounded pl-3 pr-3 mx-2'} ${isDatePassed(data.slot_date) ? 'disabled' : ''}`} href={`/dashboard/appointments/edit/${data.id}`}><i className="icon-pencil pr-1"></i> Edit </Link>
              <button className={docId === null ? 'd-none' : 'btn btn-rounded btn-danger'} onClick={() => handleDeletePopup(data.id)}><i className="icon-trash pr-1"></i> Delete</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Prescription Details</h4>
            </div>

            <div className="card-body">
              <div className="widget-prescription ps ps--active-y">
                {
                  prescription.length ? prescription.map((item) => {
                    const updatedAtDate = new Date(item.updated_at);
                    const formattedUpdatedAt = `${updatedAtDate.toLocaleDateString()}, ${updatedAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

                    return (
                      <>
                        <p><strong>Prescription: </strong> <span dangerouslySetInnerHTML={{ __html: item.prescription_detail }}></span></p>
                        <p><strong>Notes: </strong> {item.notes}</p>
                        <p><strong>Updated: </strong> {formattedUpdatedAt}</p>

                        <div className="footer-btn">
                          <Link className="btn btn-info btn-rounded pl-3 pr-3 mx-2" href={`/dashboard/doctors/${item.appointment_id.doctor.user.id}/prescription?appId=${item.appointment_id.id}`}><i className="icon-eye pr-1"></i> View </Link>
                          <Link className={docId === null ? 'd-none' : 'btn btn-info btn-rounded pl-3 pr-3 mx-2'} href={`/dashboard/doctors/${docId}/prescription/edit/${item.id}?appId=${item.appointment_id.id}`}><i className="icon-pencil pr-1"></i> Edit </Link>
                          <button className={docId === null ? 'd-none' : 'btn btn-rounded btn-danger'} onClick={() => handleDeletePopup(data.id)}><i className="icon-trash pr-1"></i> Delete</button>
                        </div>
                      </>
                    )
                  }) : <p className='text-center text-muted'>Prescription not added</p>
                }
              </div>
            </div>
          </div>
        </div>

        <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page={docId === null ? "appointments" : "/dashboard/doctors/" + docId + "/appointment"} url="app/deleteAppointment" />
      </div>
    </div>
  )
}

export default AppointmentDetails