"use client"
import { useGetAllUserQuery } from '@/redux/slices/serviceApi';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import FetchData from './FetchData';
import { toast } from 'react-toastify';

const Appointment = () => {
    const [detail, setDetail] = useState({});
    const [data, setData] = useState({ name: '', email: '', phone_no: '', subject: '', description: '' });

    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const patientExit = useGetAllUserQuery(token);

    useEffect(() => {
        setDetail(patientExit?.data?.data);
        {
            token ? setData({
                name: patientExit.data?.data?.first_name || '',
                email: patientExit.data?.data?.email || '',
                phone_no: patientExit.data?.data?.phone_no || '',
                subject: '',
                description: ''
            }) : null
        }

    }, [token, patientExit])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone_no, subject, description } = data;

        try {
            if (!name || !email || !phone_no || !description) {
                toast.error("All (*) fields Required!!!");
                return;
            }

            if (phone_no.length > 14) {
                toast.error("Ensure this field has no more than 13 characters.");
            }

            const res = await FetchData({ url: "app/createRequest", body: data, method: "POST", contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ name: '', email: '', phone_no: '', subject: '', description: '' });
                toast.success("Request Submit Successfull");
            }

        } catch (error) {
            console.error("Appointment not added !!!", error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <input name="name" value={data.name} onChange={handleChange} type="text" className="form-control" placeholder="Your Name" required />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <input name="email" value={data.email} onChange={handleChange} type="email" className="form-control" placeholder="Your Email Id" required />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <input name="phone_no" value={data.phone_no} onChange={handleChange} type="tel" className="form-control" placeholder="Your Phone numer" required />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div className="input-group">
                            <input name="subject" value={data.subject} onChange={handleChange} type="text" className="form-control" placeholder="Enter Subject" required />
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <div className="input-group">
                            <textarea name="description" value={data.description} onChange={handleChange} rows="4" className="form-control" placeholder="Your Message..." required></textarea>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <button type="submit" className="site-button white outline"> <span>Make An Appointment</span> </button>
                </div>
            </div>
        </form>
    )
}

export default Appointment