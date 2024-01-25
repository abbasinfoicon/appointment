'use client'
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import Sidebar from '../Sidebar';
import { useParams } from 'next/navigation'
import FetchData from '@/app/components/FetchData';

const BlogDetails = () => {
    const params = useParams();
    const id = params.id
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: `app/blog/${id}`, method: "POST" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const postData = await res.json();
                setData(postData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!data) {
        return <p>Loading...</p>;
    }

    // Function to format the date string
    const formatDateString = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    const formattedDate = formatDateString(data.created_at);

    return (
        <>
            <Banner title={data.title} img="bnr1.jpg" parents="blog" />

            <div className="content-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mb-4">
                            <div className="blog-post blog-single">
                                <div className="dez-post-title ">
                                    <h3 className="post-title">{data.title}</h3>
                                </div>
                                <div className="dez-post-meta m-b20">
                                    <ul>
                                        <li className="post-date"> <i className="fa fa-calendar"></i><strong>{formattedDate}</strong></li>
                                        <li className="post-author"><i className="fa fa-user"></i>By <a href="#">
                                            {data.created_by && (
                                                <span>{`${data.created_by.first_name} ${data.created_by.last_name}`}</span>
                                            )}
                                        </a> </li>
                                        <li className="post-comment"><i className="fa fa-comments"></i> <a href="#">{data.blog_id} Comments</a> </li>
                                    </ul>
                                </div>
                                <div className="dez-post-media dez-img-effect zoom-slow"> <a href="#"><img src={process.env.BASE_URL + data.blog_image} alt="" /></a> </div>
                                <div className="dez-post-text" dangerouslySetInnerHTML={{ __html: data.description }}></div>
                            </div>

                            <div className="clear d-none" id="comment-list">
                                <div className="comments-area" id="comments">
                                    <div className="share-details-btn">
                                        <ul>
                                            <li><h5 className="m-a0">Share Post:</h5></li>
                                            <li>
                                                <button className="site-button facebook button-sm">
                                                    <i className="fa fa-facebook"></i> Facebook
                                                </button>
                                            </li>
                                            <li>
                                                <button className="site-button twitter button-sm">
                                                    <i className="fa fa-twitter"></i> Twitter
                                                </button>
                                            </li>
                                            <li>
                                                <button className="site-button instagram button-sm">
                                                    <i className="fa fa-instagram"></i> Instagram
                                                </button>
                                            </li>
                                            <li>
                                                <button className="site-button whatsapp button-sm">
                                                    <i className="fa fa-whatsapp"></i> Whatsapp
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default BlogDetails