'use client'
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';

const MyAccount = () => {
    const [data, setData] = useState({});
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "user/details", method: "GET", authorization: `Bearer ${token}`, contentType: "application/json" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [token]);

    if (!data) {
        return <Loading />; // Add a loading indicator while data is being fetched
    }

    return (
        <div className="dashboard_content">
            <h5>overview</h5>

            <div className="row">
                <div className="col-xl-4 col-md-6 wow fadeInUp" data-wow-duration="1s">
                    <div className="dashboard_overview">
                        <div className="icon"><i className="fa fa-check-circle" aria-hidden="true"></i></div>
                        <div className="text">
                            <p>Patient ID</p>
                            <h3>{data.id}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 wow fadeInUp" data-wow-duration="1s">
                    <div className="dashboard_overview">
                        <div className="icon"><i className="fa fa-check-circle" aria-hidden="true"></i></div>
                        <div className="text">
                            <p>Done Appointment</p>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 wow fadeInUp" data-wow-duration="1s">
                    <div className="dashboard_overview">
                        <div className="icon"><i className="fa fa-file-text-o" aria-hidden="true"></i></div>
                        <div className="text">
                            <p>Pending Appointment</p>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 wow fadeInUp" data-wow-duration="1s">
                    <div className="dashboard_overview">
                        <div className="icon"><i className="fa fa-usd" aria-hidden="true"></i></div>
                        <div className="text">
                            <p>Total Payment</p>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 wow fadeInUp" data-wow-duration="1s">
                    <div className="dashboard_overview">
                        <div className="icon"><i className="fa fa-star" aria-hidden="true"></i></div>
                        <div className="text">
                            <p>Total Review</p>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6 wow fadeInUp" data-wow-duration="1s">
                    <div className="dashboard_overview">
                        <div className="icon"><i className="fa fa-snowflake-o" aria-hidden="true"></i></div>
                        <div className="text">
                            <p>Any One</p>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard_profile">
                <h5>Profile information</h5>
                <Link href="/my-account/profile">edit</Link>
                <ul>
                    <li><span>ID:</span> {data.id}</li>
                    <li><span>Name:</span> {data.first_name} {data.last_name}</li>
                    <li><span>Phone:</span> {data.phone_no} </li>
                    <li><span>Email:</span> {data.email}</li>
                    <li><span>Gender:</span> {data.gender}</li>
                    <li><span>Adress:</span> {data.address}</li>
                    <li><span>City:</span> {data.city}</li>
                    <li><span>State:</span> {data.state}</li>
                    <li><span>Age:</span> </li>
                    <li><span>Blood Group:</span> </li>
                </ul>
            </div>
        </div>
    )
}

export default MyAccount