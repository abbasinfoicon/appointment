'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import FetchData from '@/app/components/FetchData';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading';

const Edit = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const id = params.id;
  const slug = params.editId;
  const [data, setData] = useState({ slot_date: "", slot_start_time: "", slot_end_time: "" });
  const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `app/slot_v/${slug}`, method: "GET" });

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
  }, [slug]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await FetchData({ url: `app/slot_u/${slug}`, body: data, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
      const result = await res.json();

      if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
        toast.error(result.Error);
      }

      if (result.status === 201 || res.ok) {
        setData({ slot_date: "", slot_start_time: "", slot_end_time: "" });
        toast.success("Data Update successfull!!");
        router.push(`/dashboard/doctors/${id}/slot`);
      }

    } catch (error) {
      console.error("Edit not Updated !!!", error)
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Edit Slot</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href={`/dashboard/doctors/${id}/slot`}>Slot</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Edit Slot</Link></li>
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
                          <input type="date" name='slot_date' value={data.slot_date} onChange={handleChange} className="form-control" />
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

export default Edit