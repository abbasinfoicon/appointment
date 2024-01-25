'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Add = () => {
    const router = useRouter();
    const [data, setData] = useState({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "", password: "", roles: "Patient" });
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { first_name, last_name, gender, phone_no, address, city, state, email, password } = data;

        try {
            if (!first_name || !last_name || !email || !password || !phone_no) {
                toast.error("All (*) fields Required!!!");
            }

            const res = await FetchData({ url: "user/registration_by_admin", body: data, method: "POST", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (password.length < 8) {
                toast.error(result.Error);
            }

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "", password: "", roles: "" });
                toast.success(result.Message);
                router.push('/dashboard/patients');
            }

        } catch (error) {
            console.error("Patient not added !!!", error)
        }
    }


    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Add New Patient</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/patients">Patient</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Add Patient</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="reg-form" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label className="form-label">First Name *</label>
                                        <input type="text" name='first_name' value={data.first_name} onChange={handleChange} className="form-control" placeholder="Enter First Name" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Last Name *</label>
                                        <input type="text" name='last_name' value={data.last_name} onChange={handleChange} className="form-control" placeholder="Enter Last Name" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Gender</label>
                                        <select className="form-control" name='gender' value={data.gender} onChange={handleChange}>
                                            <option>--select--</option>
                                            <option defaultValue="male">Male</option>
                                            <option defaultValue="female">Female</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Phone *</label>
                                        <input type="number" name='phone_no' value={data.phone_no} onChange={handleChange} className="form-control" placeholder="(+91) 123 456 7890" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Email *</label>
                                        <input type="email" name='email' value={data.email} onChange={handleChange} className="form-control" placeholder="Enter Email ID" />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Password *</label>
                                        <input type="password" name="password" value={data.password} onChange={handleChange} className="form-control" />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label className="form-label">Address</label>
                                        <input type="text" name='address' value={data.address} onChange={handleChange} className="form-control" placeholder="Enter Address" />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label className="form-label">City</label>
                                        <input type="text" name='city' value={data.city} onChange={handleChange} className="form-control" placeholder="Enter City" />
                                    </div>

                                    <div className="col-md-4 form-group">
                                        <label className="form-label">State</label>
                                        <input type="text" name='state' value={data.state} onChange={handleChange} className="form-control" placeholder="Enter State" />
                                    </div>

                                    <div className="col-xs-12">
                                        <button type='submit' className="btn btn-primary">Save</button>
                                        <button type="reset" className="btn">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add