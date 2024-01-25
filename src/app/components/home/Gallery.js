"use client"
import Link from 'next/link';
import React from 'react'
import { SlideshowLightbox } from 'lightbox.js-react';
import Loading from '@/app/loading';
import { useGetAllGalleryQuery } from '@/redux/slices/serviceApi';

const Gallery = () => {
    const { data = [], isLoading, isFetching, isError } = useGetAllGalleryQuery();
    const gallery = data?.data;

    if (isError) return <p>An error has occurred!</p>
    if (isLoading) return <Loading />
    if (isFetching) return <p>Fetching...</p>

    return (
        <div className="section-full content-inner gallery-projects">
            <div className="section-head  text-center text-black">
                <h3 className="h3 text-uppercase">Our <span className="text-primary">Gallery</span></h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's standard dummy text ever since the been when an unknown printer.</p>
            </div>

            <div className="clearfix">
                {
                    gallery.length ?
                        <SlideshowLightbox className="slide__gallery">
                            {
                                gallery.slice(0, 8).map((item, i) => (
                                    <img
                                        className="lightbox_img"
                                        src={`${process.env.BASE_URL}/${item?.image || ''}`}
                                        alt={item?.heading || ''}
                                        key={i}
                                    />
                                ))
                            }
                        </SlideshowLightbox>
                        : <p className="text-center">No items found in the gallery.</p>

                }

            </div>

            <div className="text-center mt-5">
                <Link className="site-button" href="/gallery">View All Media</Link>
            </div>
        </div>
    )
}

export default Gallery