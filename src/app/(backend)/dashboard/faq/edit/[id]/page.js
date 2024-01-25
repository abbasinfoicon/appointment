"use client"
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import JEditor from '@/app/(backend)/components/JEditor'

const Edit = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id
    const [data, setData] = useState({ question: "", answer: "", show_visibility: "" });
    const [content, setContent] = useState('');
    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `FAQ/admin/${id}`, method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const postData = await res.json();

                setData(postData);
                setContent(postData.answer);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [token, id]);

    const handleInputChange = (e) => {
        const newData = { ...data };
        newData[e.target.name] = e.target.value;

        setData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('question', data.question);
        formData.set('show_visibility', data.show_visibility);
        formData.set('answer', content);

        try {
            const res = await FetchData({ url: `FAQ/admin/${id}`, method: "PATCH", formdata: formData, authorization: `Bearer ${token}` });

            if (!res.ok) {
                throw new Error('Failed to update');
            }

            toast.success("updated successfully!");
            router.push('/dashboard/faq');
        } catch (error) {
            console.error("Error updating:", error);
            toast.error("Failed to update");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Edit FAQ's</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/faq">FAQ's</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Edit FAQ's</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="blog-form" onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2 form-group">
                                        <label className="form-label">FAQ's Id</label>
                                        <input type="text" name='id' value={data.id} onChange={handleInputChange} className="form-control" readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Question</label>
                                    <input type="text" name='question' value={data.question} onChange={handleInputChange} className="form-control" placeholder="Enter Question" />
                                </div>

                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="form-group">
                                            <label className="form-label">Availability</label>
                                            <select name="show_visibility" className="form-control" value={data.show_visibility} onChange={handleInputChange}>
                                                <option value="false">Hide</option>
                                                <option value="true">Show</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="form-label">answer</label>
                                    <JEditor content={content} setContent={setContent} />

                                    {/* <textarea className="form-control" cols="5" name="description" value={data.description} </textarea> */}
                                    <small className="text-muted">Enter any size of text description here</small>
                                </div>

                                <div className="col-xs-12">
                                    <button type='submit' className="btn btn-primary">Update</button>
                                    <Link className="btn" href='/dashboard/faq/'>Cancel</Link>
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