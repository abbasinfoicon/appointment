"use client"
import React, { useEffect, useState } from 'react'
import VisitorActivityChart from '../components/VisitorActivityChart'
import SimpleUserChart from '../components/SimpleUserChart'
import PharmacyOrderChart from '../components/PharmacyOrderChart'
import { useGetAllDoctorQuery, useGetAllUserQuery, useGetAppointmentQuery, useGetRatingQuery } from '@/redux/slices/serviceApi'
import { useCookies } from 'react-cookie'
import Link from 'next/link'
import FetchData from '@/app/components/FetchData'

const Dashboard = () => {
    const [cookies] = useCookies(['access_token']);
    const [patient, setPatient] = useState({});
    const [appointment, setAppointment] = useState([]);
    const token = cookies.access_token;
    const doctor = useGetAllDoctorQuery();
    const { data = [], isLoading, isFetching, isError } = useGetAllUserQuery(token);
    const appData = useGetAppointmentQuery(token);
    const rating = useGetRatingQuery(token);
    const user = data?.data;
    const docList = doctor?.data;
    const role = data?.data?.roles;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "user/all_patient", method: "POST", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                setPatient(result.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Patients */}
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="widget-stat card">
                        <div className="card-body">
                            <div className="media ai-icon">
                                <span className="mr-3">
                                    <i className='icon-people'></i>
                                </span>
                                <div className="media-body">
                                    <p className="mb-1">Patients</p>
                                    <h4 className="mb-0">{patient?.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctors */}
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="widget-stat card">
                        <div className="card-body">
                            <div className="media ai-icon">
                                <span className="mr-3">
                                    <i className="icon-user"></i>
                                </span>
                                <div className="media-body">
                                    <p className="mb-1">Doctors</p>
                                    <h4 className="mb-0">{docList?.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review */}
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="widget-stat card">
                        <div className="card-body">
                            <div className="media ai-icon">
                                <span className="mr-3">
                                    <i className="icon-bubbles"></i>
                                </span>
                                <div className="media-body">
                                    <p className="mb-1">Reviews</p>
                                    <h4 className="mb-0">{rating?.data?.data?.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointments */}
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="widget-stat card">
                        <div className="card-body">
                            <div className="media ai-icon">
                                <span className="mr-3">
                                    <i className='icon-layers'></i>
                                </span>
                                <div className="media-body">
                                    <p className="mb-1">Appointments</p>
                                    <h4 className="mb-0">{appData?.data?.data?.length}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile */}
                <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center">
                                <div className="profile-photo">
                                    {
                                        role === 'Admin' ? (
                                            <img
                                                src={user?.image ? user.image : '/assets/images/profile/admin.jpg'}
                                                width="100"
                                                className="img-fluid rounded-circle"
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                src={docList?.image ? docList.image : '/assets/images/profile/profile.png'}
                                                width="100"
                                                className="img-fluid rounded-circle"
                                                alt=""
                                            />
                                        )
                                    }
                                </div>
                                <h3 className="mt-4 mb-1">{user?.first_name} {user?.last_name}</h3>
                                <p className="text-muted">{role}</p>
                                <Link className="btn btn-outline-primary btn-rounded mt-3 pl-5 pr-5" href="/dashboard/profile/">Profile</Link>
                            </div>
                        </div>
                        <div className="card-footer pt-0 pb-0 text-center">
                            <div className="row">
                                <div className="col-4 pt-3 pb-3 border-right">
                                    <h3 className="mb-1">150</h3><span>Follower</span>
                                </div>
                                <div className="col-4 pt-3 pb-3 border-right">
                                    <h3 className="mb-1">140</h3><span>Place Stay</span>
                                </div>
                                <div className="col-4 pt-3 pb-3">
                                    <h3 className="mb-1">45</h3><span>Reviews</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visitor Activity */}
                <div className="col-xl-8 col-xxl-8 col-lg-8 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Visitor Activity</h4>
                        </div>

                        <div className="card-body">
                            <div className="tabContent">
                                <div className="tab-box">
                                    <VisitorActivityChart key="visitorActivityChart" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor List */}
                <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Doctor List</h4>
                        </div>

                        <div className="card-body">
                            <div className="px-0 widget-timeline">
                                <ul className="list-group list-group-flush">
                                    {
                                        docList && docList.map((item, i) => {
                                            return (
                                                <li className="list-group-item" key={i}>
                                                    <div className="timeline-panel text-muted d-flex align-items-center">
                                                        <img className="rounded-sm" alt="image" width="50" src={`${item.image ? item.image : "assets/images/avatar/1.jpg"}`} />
                                                        <div className="col pr-1">
                                                            <h5 className="mb-1">{item.user.first_name} {item.user.last_name}</h5>
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <small className="d-block">{item.specialization}</small>
                                                                <div className="rating-bar">
                                                                    <Link className="btn btn-primary btn-sm rounded" href={`dashboard/doctors/${item.user.id}`}>Show Detail</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patient Lists */}
                <div className="col-xl-8 col-xxl-8 col-lg-8 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Patient Lists</h4>
                        </div>
                        <div className="card-body">
                            <div className="widget-timeline">
                                <div className="table-responsive recentOrderTable">
                                    <table className="table verticle-middle table-responsive-md">
                                        <thead>
                                            <tr>
                                                <th scope="col">#id</th>
                                                <th scope="col">Patient Name</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">City</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                patient.length > 0 ?
                                                    patient.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{item.id}</td>
                                                                <td>{item.first_name} {item.last_name}</td>
                                                                <td>{item.gender}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.phone_no}</td>
                                                                <td>{item.city}</td>
                                                                <td>
                                                                    <div className="action">
                                                                        <Link className="btn btn-primary btn-sm rounded mr-1" href={`dashboard/patients/${item.id}`}>Details</Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    : <tr><td colSpan="7">No matching media found</td></tr>
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification */}
                <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Notification</h4>
                        </div>
                        <div className="card-body">
                            <div className="widget-timeline">
                                <ul className="timeline">
                                    <li>
                                        <div className="timeline-badge primary"></div>
                                        <Link className="timeline-panel text-muted" href="#">
                                            <span>10 minutes ago</span>
                                            <h6 className="m-t-5">Youtube, a video-sharing website, goes live.</h6>
                                        </Link>
                                    </li>

                                    <li>
                                        <div className="timeline-badge warning">
                                        </div>
                                        <Link className="timeline-panel text-muted" href="#">
                                            <span>20 minutes ago</span>
                                            <h6 className="m-t-5">Mashable, a news website and blog, goes live.</h6>
                                        </Link>
                                    </li>

                                    <li>
                                        <div className="timeline-badge danger">
                                        </div>
                                        <Link className="timeline-panel text-muted" href="#">
                                            <span>30 minutes ago</span>
                                            <h6 className="m-t-5">Google acquires Youtube.</h6>
                                        </Link>
                                    </li>

                                    <li>
                                        <div className="timeline-badge success">
                                        </div>
                                        <Link className="timeline-panel text-muted" href="#">
                                            <span>15 minutes ago</span>
                                            <h6 className="m-t-5">StumbleUpon is acquired by eBay. </h6>
                                        </Link>
                                    </li>

                                    <li>
                                        <div className="timeline-badge warning">
                                        </div>
                                        <Link className="timeline-panel text-muted" href="#">
                                            <span>20 minutes ago</span>
                                            <h6 className="m-t-5">Mashable, a news website and blog, goes live.</h6>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointments Lists */}
                <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-12 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Appointments Lists</h4>
                        </div>
                        <div className="chart-wrapper">
                            <div className="mt-0 pt-0">
                                <PharmacyOrderChart key="pharmacyOrderChart" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Users */}
                <div className="col-xl-4 col-xxl-4 col-lg-4 col-md-12 col-sm-12">
                    <div className="card active_users">
                        <div className="card-header">
                            <h4 className="card-title">Active Users</h4>
                            <span id="counter"></span>
                        </div>
                        <div className="card-body pt-5">
                            <SimpleUserChart key="simpleUserChart" />
                        </div>
                    </div>
                </div>
            </div>

            {/* social icon */}
            <div className="row">
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="card">
                        <div className="social-graph-wrapper widget-facebook">
                            <span className="s-icon"><i className="fa fa-facebook"></i></span>
                        </div>
                        <div className="row">
                            <div className="col-6 border-right">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">89</span> k</h4>
                                    <p className="m-0">Friends</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">119</span> k</h4>
                                    <p className="m-0">Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="card">
                        <div className="social-graph-wrapper widget-linkedin">
                            <span className="s-icon"><i className="fa fa-linkedin"></i></span>
                        </div>
                        <div className="row">
                            <div className="col-6 border-right">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">89</span> k</h4>
                                    <p className="m-0">Friends</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">119</span> k</h4>
                                    <p className="m-0">Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="card">
                        <div className="social-graph-wrapper widget-googleplus">
                            <span className="s-icon"><i className="fa fa-google-plus"></i></span>
                        </div>
                        <div className="row">
                            <div className="col-6 border-right">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">89</span> k</h4>
                                    <p className="m-0">Friends</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">119</span> k</h4>
                                    <p className="m-0">Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-xxl-3 col-lg-3 col-md-6 col-sm-6">
                    <div className="card">
                        <div className="social-graph-wrapper widget-twitter">
                            <span className="s-icon"><i className="fa fa-twitter"></i></span>
                        </div>
                        <div className="row">
                            <div className="col-6 border-right">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">89</span> k</h4>
                                    <p className="m-0">Friends</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pt-3 pb-3 pl-0 pr-0 text-center">
                                    <h4 className="m-1"><span className="counter">119</span> k</h4>
                                    <p className="m-0">Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard