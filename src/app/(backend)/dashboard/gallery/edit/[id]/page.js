'use client'
import FetchData from '@/app/components/FetchData'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const EditImg = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id
  const [data, setData] = useState({ heading: "", image: "" });
  const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: `app/gImage/${id}`, method: "POST" });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const imgData = await res.json();

        setData(imgData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const newData = { ...data };
    const newFormData = new FormData();

    if (e.target.id === 'image' && e.target.files?.[0]) {
      newFormData.append('image', e.target.files[0]);
      newData.image = e.target.files[0]; // Update the local state with the new image file
    } else {
      newData[e.target.name] = e.target.value;
    }

    setData(newData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('heading', data.heading);

    if (data.image instanceof File) {
      formData.append('image', data.image);
    }

    try {
      const res = await FetchData({ url: `app/updateGImage/${id}`, method: "PATCH", formdata: formData, authorization: `Bearer ${token}` });

      if (!res.ok) {
        throw new Error('Failed to update image');
      }

      toast.success("image updated successfully!");
      router.push('/dashboard/gallery');
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image");
    }
  }

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Edit Image</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/gallery">Gallery</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Edit Image</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-xxl-12 col-sm-12">
          <div className="card">
            <form className="blog-form" onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Gallery ID</label>
                  <input type="text" name='heading' value={data.g_id} onChange={handleChange} className="form-control" placeholder="Enter Heading" readOnly />
                </div>

                <div className="form-group">
                  <label className="form-label">Heading</label>
                  <input type="text" name='heading' value={data.heading} onChange={handleChange} className="form-control" placeholder="Enter Heading" />
                </div>

                <img src={process.env.BASE_URL + data.image} alt="" className="img-fluid mb-3" />

                <div className="form-group">
                  <label className="form-label" >Upload Image</label>
                  <input type="file" id="image" onChange={handleChange} className="form-control" name='image' accept="image/gif, image/jpeg, image/png" />
                </div>

                <div className="col-xs-12">
                  <button type='submit' className="btn btn-primary">Update</button>
                  <Link className="btn" href='/dashboard/gallery/'>Cancel</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditImg