'use client'
import DeleteModal from '@/app/(backend)/components/DeleteModal';
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const GalleryDetail = () => {
  const params = useParams();
  const id = params.name
  const [data, setData] = useState([]);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(true);

  const handleDeletePopup = (delId) => {
    setDeleteContent(!deleteContent);
    setDeleteId(delId);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `app/gImage/${id}`, method: "POST" });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  // Function to calculate the time difference
  const getTimeDifference = (timestamp) => {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);

    const timeDifference = currentDate - createdAtDate;
    const minutes = Math.floor(timeDifference / (1000 * 60));

    return `Last updated ${minutes} mins ago`;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Media Details</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/gallery">Media</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Media Details</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-3">
            <div className="img-full-gallery">
              <img className="card-img-top img-fluid" src={process.env.BASE_URL + data.image} alt={data.heading} />
            </div>

            <div className="card-header">
              <h5 className="card-title">{data.g_id}-{data.heading}</h5>
            </div>

            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div className="inline-action">
                  <Link className="btn rounded btn-primary mr-1" href="/dashboard/gallery/add-img"><i className="icon-plus"></i></Link>
                  <Link className="btn rounded btn-primary" href="/dashboard/gallery"><i className="icon-list"></i></Link>
                  <Link className="btn rounded btn-info mx-1" href={`/dashboard/gallery/edit/${data.g_id}`}><i className="icon-pencil"></i></Link>
                  <button className='btn rounded btn-danger' onClick={() => handleDeletePopup(data.g_id)}><i className="icon-trash"></i> Delete</button>
                </div>
                <p className="card-text text-dark text-right"><small>{getTimeDifference(data.created_at)}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="gallery" url="app/deleteGImage" />
    </div>
  )
}

export default GalleryDetail