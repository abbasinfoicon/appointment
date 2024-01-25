"use client"
import Link from 'next/link';
import React from 'react'
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false, });
import { useGetAllBlogQuery } from '@/redux/slices/serviceApi';
import Loading from '@/app/loading';

const options2 = {
    loop: true,
    margin: 30,
    autoplaySpeed: 2000,
    autoplay: 3000,
    nav: true,
    dots: false,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
        0: { items: 1 },
        480: { items: 2 },
        991: { items: 2 },
        1000: { items: 3 }
    }
}

const Post = () => {
    const { data = [], isLoading, isFetching, isError } = useGetAllBlogQuery();
    const post = data.data;

    if (isError) return <p>An error has occurred!</p>
    if (isLoading) return <Loading />
    if (isFetching) return <p>Fetching...</p>

    return (
        <div className="section-full content-inner-1 bg-gray">
            <div className="container">
                <div className="section-head text-center">
                    <h3 className="h3 text-uppercase">Latest blog  <span className="text-primary">post</span></h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
                </div>

                <div className="section-content ">
                    {
                        post.length ?
                            <OwlCarousel className="testimonial-one blog-carousel owl-btn-1 primary owl-btn-center-lr" {...options2}>
                                {
                                    post.map((item) => {
                                        return (
                                            <div className="item" key={item.blog_id}>
                                                <div className="dez-box xob-zed">
                                                    <div className="dez-media">
                                                        <Link href={`/blog/${item.blog_id}`}><img src={process.env.BASE_URL + item.blog_image} alt={item.title} /></Link>
                                                    </div>

                                                    <div className="dez-info p-t20">
                                                        <div className="dez-post-meta">
                                                            <ul>
                                                                <li className="post-date">
                                                                    <i className="fa fa-calendar"></i>
                                                                    <strong>{new Date(item.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</strong>
                                                                    <span> {new Date(item.created_at).getFullYear()}</span>
                                                                </li>
                                                                <li className="post-author"><i className="fa fa-user"></i>By <Link href="#">{item.created_by.first_name} {item.created_by.last_name}</Link> </li>
                                                                <li className="post-comment"><i className="fa fa-comments"></i> <Link href="#">{item.blog_id} Comments</Link> </li>
                                                            </ul>
                                                        </div>

                                                        <h4 className="dez-title m-t15 mh-44"><Link href={`/blog/${item.blog_id}`}>{item.title}</Link></h4>
                                                        <Link href={`/blog/${item.blog_id}`} className="site-button">Read More</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </OwlCarousel>
                            : <p className="text-center">No items found in the blogs.</p>
                    }
                </div>

                <div className="text-center mt-5">
                    <Link className="site-button white border" href="/blog">View All Posts</Link>
                </div>
            </div >
        </div >
    )
}

export default Post