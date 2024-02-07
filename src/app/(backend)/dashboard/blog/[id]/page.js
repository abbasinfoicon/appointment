"use client"
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FetchData from '@/app/components/FetchData';
import DeleteModal from '@/app/(backend)/components/DeleteModal';

const BlogDetail = () => {
  const params = useParams();
  const id = params.id
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
              {data.blog_id}
            </div>
            <div className="welcome-text">
              <h4>{data.title}</h4>
              <p className="mb-0">{data.subTitle}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/blog">Blog</Link></li>
            <li className="breadcrumb-item active"><Link href="#">{data.title}</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="profile">
            <div className="profile-head">
              <div className="photo-content">
                <div className="cover-photo" style={{ backgroundImage: `url(${process.env.BASE_URL + data.blog_image})` }}></div>
                <div className="profile-photo">
                  <img src={process.env.BASE_URL + data.blog_image} className="img-fluid rounded-circle" alt="" />
                </div>
              </div>
              <div className="profile-info">
                <div className="row justify-content-center">
                  <div className="col-xl-8">
                    <div className="row">
                      <div className="col-xl-4 col-sm-4 border-right-1 prf-col">
                        <div className="profile-name">
                          <h4 className="text-primary">{data.created_by.first_name} {data.created_by.last_name}</h4>
                          <p>{data.created_by.roles}</p>
                        </div>
                      </div>
                      <div className="col-xl-4 col-sm-4 border-right-1 prf-col">
                        <div className="profile-email">
                          <h4 className="text-muted">{data.created_by.email}</h4>
                          <p>Email</p>
                        </div>
                      </div>
                      <div className="col-xl-4 col-sm-4 prf-col">
                        <div className="profile-call">
                          <h4 className="text-muted">{data.created_by.id}</h4>
                          <p>User Id.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                    <p className="mb-0">{data.subTitle}</p>

                    <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
                  </div>
                </div>

                <div className="profile-personal-info">
                  <h4 className="text-primary mb-4">More Information</h4>
                  <div className="row mb-4">
                    <div className="col-3">
                      <h5 className="f-w-500">Availability <span className="pull-right">:</span></h5>
                    </div>
                    <div className="col-9"><span>{data.availablity ? 'True' : "False"}</span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-3">
                      <h5 className="f-w-500">Blog Id. <span className="pull-right">:</span></h5>
                    </div>
                    <div className="col-9"><span>{data.blog_id}</span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-3">
                      <h5 className="f-w-500">Status <span className="pull-right">:</span></h5>
                    </div>
                    <div className="col-9"><span>{data.approved}</span>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-3">
                      <h5 className="f-w-500">Create Time <span className="pull-right">:</span></h5>
                    </div>
                    <div className="col-9">
                      <span>{formatDateString(data.created_at)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/dashboard/blog" className='btn rounded btn-primary'><i className="icon-list"></i> All Blog Lists</Link>
                <Link href={`/dashboard/blog/edit/${data.blog_id}`} className='btn rounded btn-info mx-1'><i className="icon-pencil"></i> Edit</Link>
                <button className='btn rounded btn-danger' onClick={() => handleDeletePopup(data.blog_id)}><i className="icon-trash"></i> Delete</button>
                <Link href="/dashboard/blog/add" className='btn rounded btn-primary mx-1'><i className="icon-plus"></i> Add New Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal did={deleteId} dc={deleteContent} setdc={setDeleteContent} page="blog" url="app/delete_blog" />
    </div >
  )
}

export default BlogDetail