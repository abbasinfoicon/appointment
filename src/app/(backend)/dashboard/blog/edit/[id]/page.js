"use client"
import React, { useEffect, useState } from 'react'
import JEditor from '@/app/(backend)/components/JEditor';
import FetchData from '@/app/components/FetchData'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Edit = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id
    const [data, setData] = useState({ title: "", subTitle: "", blog_image: "", approved: "", availablity: "", description: "" });
    const [content, setContent] = useState('');
    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/blog/${id}`, method: "POST" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const postData = await res.json();

                setData(postData.data);
                setContent(postData.data.description);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const newData = { ...data };
        const newFormData = new FormData();

        if (e.target.id === 'image' && e.target.files?.[0]) {
            newFormData.append('blog_image', e.target.files[0]);
            newData.blog_image = e.target.files[0]; // Update the local state with the new image file
        } else {
            newData[e.target.name] = e.target.value;
        }

        setData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', data.title);
        formData.set('subTitle', data.subTitle);
        formData.set('approved', data.approved);
        formData.set('availablity', data.availablity);
        formData.set('description', content);

        if (data.blog_image instanceof File) {
            formData.append('blog_image', data.blog_image);
        }

        try {
            const res = await FetchData({ url: `app/update_blog/${id}`, method: "PATCH", formdata: formData, authorization: `Bearer ${token}` });

            if (!res.ok) {
                throw new Error('Failed to update blog');
            }

            toast.success("Blog updated successfully!");
            router.push('/dashboard/blog');
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Failed to update blog");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Edit Blog</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/blog">Blog</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Edit Blog</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="blog-form" onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2 form-group">
                                        <label className="form-label">Blog Id</label>
                                        <input type="text" name='blog_id' value={data.blog_id} onChange={handleInputChange} className="form-control" readOnly />
                                    </div>
                                    <div className="col-md-2 form-group">
                                        <label className="form-label">Created by user id</label>
                                        <input type="text" name='created_by' value={data.created_by?.id} onChange={handleInputChange} className="form-control" readOnly />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input type="text" name='title' value={data.title} onChange={handleInputChange} className="form-control" placeholder="Enter Title" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Sub Title</label>
                                    <input type="text" name='subTitle' value={data.subTitle} onChange={handleInputChange} className="form-control" placeholder="Enter Sub Title" />
                                </div>
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="form-group">
                                            <label className="form-label">Status</label>
                                            <select name="approved" className="form-control" value={data.approved} onChange={handleInputChange}>
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Unapproved">Unapproved</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Availability</label>
                                            <select name="availablity" className="form-control" value={data.availablity} onChange={handleInputChange}>
                                                <option value="false">Hide</option>
                                                {
                                                    data.approved === 'Approved' ? <option value="true">Show</option> : null
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" >Blog Image</label>
                                            <input type="file" id="image" className="form-control" name='blog_image' onChange={handleInputChange} accept="image/gif, image/jpeg, image/png" />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <img src={process.env.BASE_URL + data.blog_image} alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="form-label">Brief</label>
                                    <JEditor content={content} setContent={setContent} />

                                    {/* <textarea className="form-control" cols="5" name="description" value={data.description} </textarea> */}
                                    <small className="text-muted">Enter any size of text description here</small>
                                </div>

                                <div className="col-xs-12">
                                    <button type='submit' className="btn btn-primary">Update</button>
                                    <Link className="btn" href='/dashboard/blog/'>Cancel</Link>
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