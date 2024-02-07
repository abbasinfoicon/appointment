'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import DeleteModal from '../../components/DeleteModal';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [deleteContent, setDeleteContent] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', category: '' });
  const [visiblePosts, setVisiblePosts] = useState(8); // Number of posts initially visible
  const [postsIncrement, setPostsIncrement] = useState(4); // Number of posts to load at a time

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: "app/allGImages", method: "GET" });

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
  }, [deleteContent]);

  const filteredData = filters.search || filters.category
    ? data.filter(item => {
      // Check if the properties exist before calling toLowerCase()
      const headingMatch = item.heading && item.heading.toLowerCase().includes(filters.search.toLowerCase());
      const categoryMatch = item.category && item.category.toLowerCase().includes(filters.category.toLowerCase());

      // Return true only if at least one condition is met
      return headingMatch || categoryMatch;
      // Add more conditions for additional filters as needed
    })
    : data;

  const handleDeletePopup = (g_id) => {
    setDeleteContent(!deleteContent);
    setDeleteId(g_id);
  }

  const getTimeDifference = (timestamp) => {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);

    const timeDifference = currentDate - createdAtDate;
    const minutes = Math.floor(timeDifference / (1000 * 60));

    if (minutes < 60) {
      return `Last updated ${minutes} mins ago`;
    } else if (minutes < 24 * 60) {
      const hours = Math.floor(minutes / 60);
      return `Last updated ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(minutes / (24 * 60));
      return `Last updated ${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  const showMore = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + postsIncrement);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>All Images and Videos ({data.length})</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/gallery">Media</Link></li>
            <li className="breadcrumb-item active"><Link href="#">All Media</Link></li>
          </ol>
        </div>
      </div>

      <div className="row page-titles mx-0 justify-content-between">
        <div className="col-sm-3">
          <div className="form-search">
            <form onSubmit={(e) => { e.preventDefault(); }}>
              <input id="" className="form-control" placeholder="Search Image..." type="search" name=""
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
              <button className="search-btn"><i className="mdi mdi-magnify"></i></button></form>
          </div>
        </div>

        <div className="col-sm-2">
          <div className="add-new text-right">
            <Link className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new" href="/dashboard/gallery/add-img">Add Image</Link>
          </div>
        </div>
      </div>

      <div className="row">
        {
          filteredData.length > 0 ?
            filteredData.slice(0, visiblePosts).map((item, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <div className="card mb-3">
                    <div className="img-gallery">
                      <img className="card-img-top img-fluid" src={process.env.BASE_URL + item.image} alt={item.heading} />
                    </div>
                    <div className="card-header">
                      <h5 className="card-title">{item.heading}</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="inline-action">
                          <Link className="btn rounded btn-primary" href={`/dashboard/gallery/${item.g_id}`}><i className="icon-eye"></i></Link>
                          <Link className="btn rounded btn-info mx-1" href={`/dashboard/gallery/edit/${item.g_id}`}><i className="icon-pencil"></i></Link>
                          <button className="btn rounded btn-danger" onClick={() => handleDeletePopup(item.g_id)}><i className="icon-trash"></i></button>
                        </div>
                        <p className="card-text text-dark text-right"><small>{getTimeDifference(item.updated_at)}</small></p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : <p>No matching media found</p>
        }
      </div>

      {visiblePosts < filteredData.length && (
        <div className="row justify-content-center my-3">
          <div className="load-more">
            <button className='btn btn-more btn-primary mx-auto' onClick={showMore}>Load More</button>
          </div>
        </div>
      )}

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="gallery" url="app/deleteGImage" />
    </div>
  )
}

export default Gallery