'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import BlogList from './BlogList';

const Blog = () => {
  const [dataLength, setDataLength] = useState(0);

  const handleDataChange = (data) => {
    setDataLength(data.length);
  };

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>All Blogs  ({dataLength})</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/blog">Blog</Link></li>
            <li className="breadcrumb-item active"><Link href="#">All Blogs</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Blogs Details Lists</h4>
              <div className="add-new text-right">
                <Link href="/dashboard/blog/add" className="btn btn-outline-primary btn-lg btn-rounded mt-1 pl-5 pr-5 add-new">Add New</Link>
              </div>
            </div>

            <div className='card-body'>
              <BlogList onDataChange={handleDataChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog