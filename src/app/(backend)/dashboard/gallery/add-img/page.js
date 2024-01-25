'use client'
import FetchData from '@/app/components/FetchData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const AddGallery = () => {
    const router = useRouter();
    const [data, setData] = useState({ heading: "", image: "" });
    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const imageInputRef = useRef(null);

    const handleChange = (e) => {
        if (e.target.id === 'image') {
            // Use append to add the file to FormData
            setData({ ...data, [e.target.name]: e.target.files?.[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('heading', data.heading);
        formData.append('image', data.image);

        const { heading, image } = data;

        if (!heading || !image) {
            toast.error("All (*) fields Required!!!");
        }

        try {
            const res = await FetchData({ url: "app/createGImage", method: "POST", formdata: formData, authorization: `Bearer ${token}` });

            const result = await res.json();

            if (res.status === 400 || res.status === 409 || res.status === 500 || res.status === 415) {
                toast.error(res.error);
            }

            if (res.status === 201 || res.ok || res.status === 200) {
                router.push('/dashboard/gallery');
                setData({ title: "", image: null });
                imageInputRef.current.value = '';
                toast.success("Image data added !!!");
            } else {
                toast.error(res.title[0]);
            }

        } catch (error) {
            console.error("Image not added !!!", error);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Add New Media</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/gallery">Gallery</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Add Gallery</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="blog-form" onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">Heading</label>
                                    <input type="text" name='heading' value={data.heading} onChange={handleChange} className="form-control" placeholder="Enter Heading" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" >Upload Image</label>
                                    <input type="file" ref={imageInputRef} id="image" onChange={handleChange} className="form-control" name='image' accept="image/gif, image/jpeg, image/png" />
                                </div>

                                <div className="col-xs-12">
                                    <button type='submit' className="btn btn-primary">Submit</button>
                                    <button type="reset" className="btn">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGallery