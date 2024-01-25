"use client"
import FetchData from '@/app/components/FetchData';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import ChangePassword from './ChangePassword';

const Profile = () => {
    const router = useRouter();
    const [data, setData] = useState({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "" });
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

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await FetchData({ url: `user/update_user/${data.id}`, body: data, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 201 || res.ok) {
                setData({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "" });
                toast.success(result.Message);
                router.push('/my-account');
            }

        } catch (error) {
            console.error("Profile not added !!!", error)
        }
    }

    if (!data) {
        return <Loading />;
    }

    return (
        <div className="dashboard_content dashboard_profile">
            <h5>Edit Profile info</h5>
            <form className="mb-5" onSubmit={handleSubmit}>
                <Link href="/my-account">Cancel</Link>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="dashboard_profile_form">
                            <label>Fast Name</label>
                            <input type="text" name="first_name" className='form-control' value={data.first_name} onChange={handleChange} placeholder="Addition" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="dashboard_profile_form">
                            <label>Last Name</label>
                            <input type="text" name="last_name" className='form-control' value={data.last_name} onChange={handleChange} placeholder="Smith" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="dashboard_profile_form">
                            <label>Gender</label>
                            <select className="form-control" name='gender' value={data.gender} onChange={handleChange}>
                                <option>--select--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="dashboard_profile_form">
                            <label>Phone</label>
                            <input type="tel" name="phone_no" className='form-control' value={data.phone_no} onChange={handleChange} placeholder="+880-161568-59689 " />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="dashboard_profile_form">
                            <label>Email</label>
                            <input type="email" name="email" className='form-control' value={data.email} onChange={handleChange} placeholder="Company@gmail.com" readOnly />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="dashboard_profile_form">
                            <label>Address</label>
                            <input type="text" name="address" className='form-control' value={data.address} onChange={handleChange} placeholder="E-32, Sector 8 Noida" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="dashboard_profile_form">
                            <label>City</label>
                            <input type="text" name="city" className='form-control' value={data.city} onChange={handleChange} placeholder="Noida" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="dashboard_profile_form">
                            <label>State</label>
                            <input type="text" name="state" className='form-control' value={data.state} onChange={handleChange} placeholder="Delhi" />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <button type="submit" className="common_btn">Save Change</button>
                    </div>
                </div>
            </form>

            <h5>Change password</h5>
            <ChangePassword userId={data?.id} />
        </div>
    )
}

export default Profile