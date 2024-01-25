'use client'
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData'
import Loading from '@/app/loading'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import JEditor from '@/app/(backend)/components/JEditor'

const Edit = () => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const id = params.id
    const [data, setData] = useState({ name: '', email: '', phone_no: '', subject: '', description: '' });
    const [content, setContent] = useState('');
    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    const fetchData = async () => {
        try {
            const res = await FetchData({ url: `app/request/${id}`, method: "POST", authorization: `Bearer ${token}` });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await res.json();
            setData(result.data);
            setContent(result.data.description)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setLoading(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            data.description = content;
            const res = await FetchData({ url: `app/updateRequest/${id}`, body: data, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ name: '', email: '', phone_no: '', subject: '', description: '' });
                toast.success("Request Updated Successfull!!");
                router.push('/dashboard/request');
            }

        } catch (error) {
            console.error("Request not Updated !!!", error)
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Edit Request</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/request">Request</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Edit Request</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="reg-form" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label">Name </label>
                                            <input name="name" value={data.name} onChange={handleChange} type="text" className="form-control" placeholder="Your Name" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label">Email </label>
                                            <input name="email" value={data.email} onChange={handleChange} type="email" className="form-control" placeholder="Your Email Id" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="form-label">Phone </label>
                                            <input name="phone_no" value={data.phone_no} onChange={handleChange} type="tel" className="form-control" placeholder="Your Phone numer" readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Subject</label>
                                            <input name="subject" value={data.subject} onChange={handleChange} type="text" className="form-control" placeholder="Enter Subject" required />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label">Description </label>
                                            <JEditor content={content} setContent={setContent} />
                                            {/* <textarea name="description" value={data.description} onChange={handleChange} rows="4" className="form-control" placeholder="Your Message..." required></textarea> */}
                                        </div>
                                    </div>

                                    <div className="col-xs-12">
                                        <button type='submit' className="btn btn-primary">Update</button>
                                        <Link className="btn" href='/dashboard/request/'>Cancel</Link>
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

export default Edit