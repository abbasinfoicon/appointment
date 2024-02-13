'use client'
import FetchData from '@/app/components/FetchData'
import Loading from '@/app/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Edit = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", roles: "" });
  const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `user/details`, method: "GET", authorization: `Bearer ${token}` });

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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await FetchData({ url: `user/update_user/${data.id}`, body: data, method: "PATCH", authorization: `Bearer ${token}`, contentType: "application/json" });
      const result = await res.json();

      if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
        toast.error(result.Error);
      }

      if (result.status === 201 || res.ok) {
        setData({ first_name: "", last_name: "", gender: "", phone_no: "", address: "", city: "", state: "", email: "", roles: "" });
        toast.success(result.Message);
        router.push('/dashboard/profile');
      }

    } catch (error) {
      console.error("Profile not Updated !!!", error)
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
            <h4>Edit Profile</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/profile">Profile</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Edit Profile</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <form className="reg-form" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3 form-group">
                    <label className="form-label">Id</label>
                    <input type="text" name='id' value={data.id} onChange={handleChange} className="form-control" disabled readOnly />
                  </div>

                  <div className="col-md-3 form-group">
                    <label className="form-label">Email</label>
                    <input type="email" name='email' value={data.email} className="form-control" placeholder="Enter Email ID" disabled readOnly />
                  </div>

                  <div className="col-md-3 form-group">
                    <label className="form-label">Role</label>
                    <input type="text" name='roles' value={data.roles} className="form-control" placeholder="Enter Email ID" disabled readOnly />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 form-group">
                    <label className="form-label">First Name *</label>
                    <input type="text" name='first_name' value={data.first_name} onChange={handleChange} className="form-control" placeholder="Enter First Name" />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label">Last Name *</label>
                    <input type="text" name='last_name' value={data.last_name} onChange={handleChange} className="form-control" placeholder="Enter Last Name" />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-control" name='gender' value={data.gender} onChange={handleChange}>
                      <option value="">--select--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label">Phone</label>
                    <input type="number" name='phone_no' value={data.phone_no} onChange={handleChange} className="form-control" placeholder="(+91) 123 456 7890" />
                  </div>

                  <div className="col-md-12 form-group">
                    <label className="form-label">Address</label>
                    <input type="text" name='address' value={data.address} onChange={handleChange} className="form-control" placeholder="Enter Address" />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label">City</label>
                    <input type="text" name='city' value={data.city} onChange={handleChange} className="form-control" placeholder="Enter City" />
                  </div>

                  <div className="col-md-6 form-group">
                    <label className="form-label">State</label>
                    <input type="text" name='state' value={data.state} onChange={handleChange} className="form-control" placeholder="Enter State" />
                  </div>

                  <div className="col-xs-12">
                    <button type='submit' className="btn btn-primary">Update</button>
                    <Link className="btn" href='/dashboard/profile/'>Cancel</Link>
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

export default Edit