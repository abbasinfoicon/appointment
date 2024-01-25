'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Search from './Search';
import FetchData from '@/app/components/FetchData';

const Sidebar = () => {
    const [posts, setPosts] = useState([]);
    const reversedArray = posts.slice().reverse();

    const fetchData = async () => {
        try {
            const res = await FetchData({ url: "app/blogs", method: "GET" });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await res.json();

            setPosts(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <aside className="side-bar">
            <div className="widget d-none">
                <h4 className="widget-title">Search</h4>
                <Search />
            </div>

            <div className="widget recent-posts-entry">
                <h4 className="widget-title">Recent Posts</h4>
                <div className="widget-post-bx">
                    {
                        posts && posts.length ?
                            reversedArray.slice(0, 4).map((item) => {
                                return (
                                    <div className="widget-post clearfix" key={item.blog_id}>
                                        <div className="dez-post-media"> <img src={process.env.BASE_URL + item.blog_image} width="200" height="143" alt="" /> </div>
                                        <div className="dez-post-info">
                                            <div className="dez-post-header">
                                                <h6 className="post-title"><Link href={`/blog/${item.blog_id}`}>{item.title}</Link></h6>
                                            </div>
                                            <div className="dez-post-meta">
                                                <ul>
                                                    <li className="post-author">By <a href="#">{item.created_by.first_name} {item.created_by.last_name}</a></li>
                                                    <li className="post-comment"><i className="fa fa-comments"></i> {item.blog_id}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <p>No data available!!!</p>
                    }
                </div>
            </div>

            <div className="widget widget_categories">
                <h4 className="widget-title">Categories List</h4>
                <ul>
                    <li><a href="/specialities/emegency-care">Emegency Care</a> (1)</li>
                    <li><a href="/specialities/operation-theater">Operation Theater</a> (1)</li>
                    <li><a href="/specialities/medical-checkup">Medical Checkup</a> (1)</li>
                    <li><a href="/specialities/ddiagnostic-center">Ddiagnostic Center</a> (1)</li>
                    <li><a href="/specialities/outdoor-checkup">Outdoor Checkup</a> (1)</li>
                    <li><a href="/specialities/pharmacy-servicea">Pharmacy Servicea</a> (1)</li>
                </ul>
            </div>

            <div className="widget widget_gallery">
                <h5 className="widget-title">Our services</h5>
                <ul>
                    {
                        posts && posts.length ?
                            reversedArray.slice(0, 9).map((item) => {
                                return (
                                    <li key={item.blog_id}><a href={`/blog/${item.blog_id}`}><div className="dez-post-thum dez-img-overlay1 dez-img-effect zoom-slow">
                                        <img src={process.env.BASE_URL + item.blog_image} alt="" /></div></a>
                                    </li>
                                )
                            })
                            : <p>Loading...</p>
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar