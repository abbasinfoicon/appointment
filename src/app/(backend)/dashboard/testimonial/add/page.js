'use client'
import React, { useState } from 'react'
import FetchData from '@/app/components/FetchData'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import JEditor from '@/app/(backend)/components/JEditor'

const Add = () => {
  const router = useRouter();
  const [data, setData] = useState({ star: "", comment: "" });
  const [content, setContent] = useState('');

  const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { star } = data;

    try {
      if (!star || !content) {
        toast.error("All (*) fields Required!!!");
      }
      data.comment = content;
      const res = await FetchData({ url: "app/createRating", body: data, method: "POST", authorization: `Bearer ${token}`, contentType: "application/json" });
      const result = await res.json();

      if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
        toast.error(result.Error);
      }

      if (result.status === 201 || res.ok) {
        setData({ star: "", comment: "" });
        router.push('/dashboard/testimonial');
        toast.success(result.Message);
      }

    } catch (error) {
      console.error("Tesitmonial not added !!!", error)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Add New Testimonial</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/testimonial">Testimonial</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Add Testimonial</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2 form-group">
                    <label className="form-label">Rating</label>
                    <select className="form-control" name='star' value={data.star} onChange={handleChange}>
                      <option>--select--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                </div>

                <div className='row'>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="form-label">Comment</label>
                      <JEditor content={content} setContent={setContent} />
                      {/* <textarea className="form-control" cols="5" name="comment" value={data.comment} onChange={handleChange}></textarea> */}
                      <small className="text-muted">Enter any size of text Comment here</small>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <button type='submit' className="btn btn-primary">Save</button>
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