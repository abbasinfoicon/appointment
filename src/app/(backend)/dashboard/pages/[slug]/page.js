"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData';
import DeleteModal from '@/app/(backend)/components/DeleteModal';

const PageDetails = () => {
    const params = useParams();
    const slug = params.slug
    const [data, setData] = useState(null);
    const [deleteContent, setDeleteContent] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const handleDeletePopup = (delId) => {
        setDeleteContent(!deleteContent);
        setDeleteId(delId);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/get/${slug}`, method: "GET" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const newData = await res.json();

                setData(newData.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (slug) {
            fetchData();
        }
    }, [slug]);

    // Function to format the date string
    const formatDateString = (dateString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container-fluid">
            <div className="row page-titles mx-0">
                <div className="col-sm-6 p-md-0">
                    <div className="blog_id_heading">
                        <div className="blog_id">
                            {data.service_id}
                        </div>
                        <div className="welcome-text">
                            <h4>{data.title}</h4>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard/pages">Pages</Link></li>
                        <li className="breadcrumb-item active"><Link href="#">{data.service_name}</Link></li>
                    </ol>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="profile">
                        <div className="profile-head">
                            <div className="photo-content">
                                <div className="cover-photo" style={{ backgroundImage: `url(${process.env.BASE_URL + data.image})` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="profile-tab">
                                <div className="profile-about-me">
                                    <div className="pt-4 border-bottom-1 pb-4">
                                        <h4>{data.title}</h4>
                                        <p><strong>{data.subtitle}</strong></p>

                                        <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
                                    </div>
                                </div>

                                <div className="profile-personal-info">
                                    <h4 className="text-primary mb-4">More Information</h4>
                                    <div className="row mb-4">
                                        <div className="col-3">
                                            <h5 className="f-w-500">Page Id. <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9"><span>{data.service_id}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3">
                                            <h5 className="f-w-500">Page Name. <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9"><span>{data.service_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-3">
                                            <h5 className="f-w-500">Create Time <span className="pull-right">:</span></h5>
                                        </div>
                                        <div className="col-9">
                                            <span>{formatDateString(data.updated_at)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/dashboard/pages" className='btn rounded btn-primary'><i className="icon-list"></i> All Lists</Link>
                                <Link href={`/dashboard/pages/edit/${data.service_name}`} className='btn rounded btn-info mx-1'><i className="icon-pencil"></i> Edit</Link>
                                <button className='btn rounded btn-danger' onClick={() => handleDeletePopup(data.service_id)}><i className="icon-trash"></i> Delete</button>
                                <Link href="/dashboard/pages/add" className='btn rounded btn-primary mx-1'><i className="icon-plus"></i> Add New</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="pages" url="app/delete" />
        </div >
    )
}

export default PageDetails