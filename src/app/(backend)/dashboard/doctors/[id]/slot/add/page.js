'use client'
import FetchData from '@/app/components/FetchData'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Add = () => {
  const params = useParams();
  const id = params.id
  const router = useRouter();
  const [data, setData] = useState({ slot_date: "", slot_start_time: "", slot_end_time: "" });
  const [minDate, setMinDate] = useState('');
  const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { slot_date, slot_start_time, slot_end_time } = data;

    if (!slot_date || !slot_start_time || !slot_end_time) {
      toast.error("All (*) fields Required!!!");
    }

    try {
      const res = await FetchData({ url: `app/slot_c/${id}`, method: "POST", body: data, authorization: `Bearer ${token}`, contentType: "application/json" });

      const result = await res.json();

      if (res.status === 400 || res.status === 409 || res.status === 500 || res.status === 415 || res.status === 403) {
        toast.error(res.error);
      }

      if (res.status === 201 || res.ok || res.status === 200) {
        router.push(`/dashboard/doctors/${id}/slot`);
        setData({ slot_date: "", slot_start_time: "", slot_end_time: "" });
        toast.success("Slot added !!!");
      } else {
        toast.error(res.title[0]);
      }

    } catch (error) {
      console.error("Slot not added !!!", error);
      toast.error("Slot not added !!!");
    }
  }

  useEffect(() => {
    setMinDate(new Date().toISOString().split('T')[0]);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Add New Slot</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${id}/slot`}>Slot</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Add Slot</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <form className="blog-form" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-md-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="form-label">Slot Date</label>
                          <input type="date" name='slot_date' value={data.slot_date} onChange={handleChange} className="form-control" min={minDate} />
                        </div>
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="form-label">Start Time</label>
                        <input type="time" name='slot_start_time' value={data.slot_start_time} onChange={handleChange} className="form-control" />
                      </div>

                      <div className="col-md-6 form-group">
                        <label className="form-label">End Time</label>
                        <input type="time" name='slot_end_time' value={data.slot_end_time} onChange={handleChange} className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="slot_img">
                      <img src="/assets/images/slot.webp" alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>

                <div className="col-xs-12">
                  <button type='submit' className="btn btn-primary">Save</button>
                  <button type="reset" className="btn">Cancel</button>
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