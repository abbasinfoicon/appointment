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
    const slug = params.slug
    const [content, setContent] = useState('');

    const [data, setData] = useState({ title: "", subtitle: "", image: "" });
    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/get/${slug}`, method: "GET" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const newData = await res.json();

                setData(newData.data[0]);
                setContent(newData.data[0].description);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    const handleInputChange = (e) => {
        const newData = { ...data };
        const newFormData = new FormData();

        if (e.target.id === 'image' && e.target.files?.[0]) {
            newFormData.append('image', e.target.files[0]);
            newData.image = e.target.files[0]; // Update the local state with the new image file
        } else {
            newData[e.target.name] = e.target.value;
        }

        setData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', data.title);
        formData.set('subtitle', data.subtitle);
        formData.set('description', content);

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        const maxLength = 99;
        const { title, subtitle } = data;
        if (title.length > maxLength || subtitle.length > maxLength) {
            toast.error("Title is too long!");
            return;
        }

        try {
            const res = await FetchData({ url: `app/update/${data.service_id}`, method: "PATCH", formdata: formData, authorization: `Bearer ${token}` });

            if (!res.ok) {
                throw new Error('Failed to update');
            }

            toast.success("updated successfully!");
            router.push('/dashboard/pages');
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
                        <h4>Edit Pages</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/pages">Pages</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Edit Pages</Link></li>
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
                                        <label className="form-label">Pages Id</label>
                                        <input
                                            type="text"
                                            name='service_id'
                                            value={data.service_id || ''}
                                            onChange={handleInputChange}
                                            className="form-control"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input type="text" name='title' value={data.title} onChange={handleInputChange} className="form-control" placeholder="Enter Title" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Sub Title</label>
                                    <input type="text" name='subtitle' value={data.subtitle} onChange={handleInputChange} className="form-control" placeholder="Enter Sub Title" />
                                </div>

                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="form-group">
                                            <label className="form-label" >Image</label>
                                            <input type="file" id="image" className="form-control" name='image' onChange={handleInputChange} accept="image/gif, image/jpeg, image/png" />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <img src={process.env.BASE_URL + data.image} alt="" className="img-fluid" />
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
                                    <Link className="btn" href='/dashboard/pages/'>Cancel</Link>
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
