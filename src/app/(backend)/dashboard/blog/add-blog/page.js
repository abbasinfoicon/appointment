'use client'
import React, { useState, useRef } from 'react'
import FetchData from '@/app/components/FetchData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import JEditor from '@/app/(backend)/components/JEditor';

const AddBlog = () => {
    const router = useRouter();
    const [data, setData] = useState({ title: "", subTitle: "", blog_image: "" });
    const [content, setContent] = useState('');

    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const imageInputRef = useRef(null);

    const handleChange = (e) => {
        if (e.target.id === 'image') {
            setData({ ...data, [e.target.name]: e.target.files?.[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('title', data.title);
        formData.set('subTitle', data.subTitle);
        // Use append to add the file to FormData
        formData.append('blog_image', data.blog_image);
        formData.set('description', content);

        const { title, subTitle } = data;

        const maxLength = 99; // Adjust this value based on your database schema

        if (title.length > maxLength || subTitle.length > maxLength) {
            toast.error("Title or Sub Title is too long!");
            return; // Stop the submission process
        }

        if (!title || !content) {
            toast.error("All (*) fields Required!!!");
        }

        try {
            const res = await FetchData({ url: "app/createBlog", method: "POST", formdata: formData, authorization: `Bearer ${token}` });

            const result = await res.json();

            if (res.status === 400 || res.status === 409 || res.status === 500 || res.status === 415) {
                toast.error(res.error);
            }

            if (res.status === 201 || res.ok || res.status === 200) {
                router.push('/dashboard/blog');
                setData({ title: "", subTitle: "", blog_image: null });
                imageInputRef.current.value = '';
                toast.success("Blog data added !!!");
            } else {
                toast.error(res.title[0]);
            }

        } catch (error) {
            console.error("Blog not added !!!", error);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6">
                    <div className="welcome-text">
                        <h4>Add New Blog</h4>
                    </div>
                </div>
                <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/blog">Blog</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">Add Blog</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-xxl-12 col-sm-12">
                    <div className="card">
                        <form className="blog-form" onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="card-body">
                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input type="text" name='title' value={data.title} onChange={handleChange} className="form-control" placeholder="Enter Title" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Sub Title</label>
                                    <input type="text" name='subTitle' value={data.subTitle} onChange={handleChange} className="form-control" placeholder="Enter Sub Title" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" >Blog Image</label>
                                    <input type="file" id="image" ref={imageInputRef} onChange={handleChange} className="form-control" name='blog_image' accept="image/gif, image/jpeg, image/png" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Brief</label>
                                    <JEditor content={content} setContent={setContent} />
                                    {/* <textarea className="form-control" cols="5" name="description" value={data.description} onChange={handleChange}></textarea> */}
                                    <small className="text-muted">Enter any size of text description here</small>
                                </div>

                                <div className="col-xs-12">
                                    <button type='submit' className="btn btn-primary">Save</button>
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

export default AddBlog