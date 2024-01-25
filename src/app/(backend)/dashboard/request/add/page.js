'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import JEditor from '@/app/(backend)/components/JEditor';

const Add = () => {
  const router = useRouter();
  const [data, setData] = useState({ name: '', email: '', phone_no: '', subject: '', description: '' });
  const [content, setContent] = useState('');
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone_no } = data;

    try {
      if (!name || !email || !phone_no || !content) {
        toast.error("All (*) fields Required!!!");
        return;
      }

      if (phone_no.length > 14) {
        toast.error("Ensure this field has no more than 13 characters.");
      }

      data.description = content;
      const res = await FetchData({ url: "app/createRequest", body: data, method: "POST", contentType: "application/json" });
      const result = await res.json();

      if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
        toast.error(result.Error);
      }

      if (result.status === 201 || res.ok) {
        setData({ name: '', email: '', phone_no: '', subject: '', description: '' });
        setContent("")
        toast.success("Request Submit Successfull");
        router.push('/dashboard/request');
      }

    } catch (error) {
      console.error("Request not added !!!", error)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Add New Request</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/request">Request</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Add Request</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input name="name" value={data.name} onChange={handleChange} type="text" className="form-control" placeholder="Your Name" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input name="email" value={data.email} onChange={handleChange} type="email" className="form-control" placeholder="Your Email Id" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Phone *</label>
                      <input name="phone_no" value={data.phone_no} onChange={handleChange} type="tel" className="form-control" placeholder="Your Phone numer" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input name="subject" value={data.subject} onChange={handleChange} type="text" className="form-control" placeholder="Enter Subject" required />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Description *</label>
                      <JEditor content={content} setContent={setContent} />
                      {/* <textarea name="description" value={data.description} onChange={handleChange} rows="4" className="form-control" placeholder="Your Message..." required></textarea> */}
                    </div>
                  </div>

                  <div className="col-xs-12">
                    <button type='submit' className="btn btn-primary">Make An Appointment</button>
                    <button type="reset" className="btn">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add