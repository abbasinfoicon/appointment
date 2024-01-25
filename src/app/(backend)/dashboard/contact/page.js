"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ContactData from './ContactData'

const Contact = () => {
  const [dataContact, setDataContact] = useState([]);
  const [dataSocial, setDataSocial] = useState([]);

  useEffect(() => {
    setDataContact(ContactData.contact);
    setDataSocial(ContactData.social);
  }, [])

  const handleAvailabilityChange = (id) => {
    setDataSocial(prevDataSocial =>
      prevDataSocial.map(item =>
        item.id === id ? { ...item, visibility: !item.visibility } : item
      )
    );
  };

  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Quick Contact</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/contact">Contact</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Quick Contact</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Quick Contact</h4>
            </div>

            <div className="card-body">
              <div className="row">
                {
                  dataContact.map(item => (
                    <div className="col-md-3" key={item.id}>
                      <div className="card">
                        <div className="card-body text-center ai-icon">
                          <i className={`big_icon icon-${item.icon}`}></i>
                          <h4 className="my-2">{item.name}</h4>
                          <p>{item.content} <br /> {item.content1}</p>

                          <div className="inline_block">
                            <Link href="#" className="btn my-2 btn-primary btn-lg px-4 mr-1"><i className="fa fa-pencil"></i> Edit</Link>
                            <Link href="#" className="btn my-2 btn-danger btn-lg px-4"><i className="fa fa-trash"></i> Delete</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Social Icons</h4>
              <Link href="#" className='btn btn-primary'>Add New</Link>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-responsive-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Link</th>
                      <th>Visibility</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataSocial.map(item => (
                        <tr key={item.id}>
                          <th>{item.id}</th>
                          <td><i className={`fa fa-${item.icon}`}></i> {item.name}</td>
                          <td><Link href={item.link} target='_blank'>{item.link}</Link></td>
                          <td>
                            <div className="custom_checkbox">
                              <input id={item.id} type="checkbox" className="switch" checked={item.visibility}
                                onChange={() => handleAvailabilityChange(item.id)} />
                            </div>
                          </td>
                          <td>
                            <span>
                              <Link href="#" className="mr-4" title="Edit"><i className="fa fa-pencil color-muted"></i> </Link>
                              <Link href="#" title="Close"><i className="fa fa-close color-danger"></i></Link>
                            </span>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact