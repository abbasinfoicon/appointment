import Link from 'next/link'
import React from 'react'

const AddPayment = () => {
  return (
    <div className="container-fluid">
      <div className="row page-titles mx-0">
        <div className="col-sm-6">
          <div className="welcome-text">
            <h4>Add Payment</h4>
          </div>
        </div>
        <div className="col-sm-6 justify-content-sm-end mt-2 mt-sm-0 d-flex">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/dashboard/payment">Payment</Link></li>
            <li className="breadcrumb-item active"><Link href="#">Add Payment</Link></li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Create Payment details</h4>
            </div>

            <div className='card-body'>
              <p>Comming soon......!!!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPayment