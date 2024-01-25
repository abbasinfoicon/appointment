import Link from 'next/link'
import React from 'react'

const Appointment = () => {
    return (
        <div className="dashboard_content">
            <div className="banner_class">
                <img src="/assets/images/main-slider/slide7.jpg" alt="" className="img-fluid" />
            </div>

            <div className="headingWithButton">
                <h5>Appointment History</h5>
                <Link href="/doctor" className='btn btn-primary rounded'>Add Appointment</Link>
            </div>

            <div className="appointment_history">
                <div className="table-responsive">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="sn">
                                    SN
                                </th>
                                <th className="name">
                                    Doctor
                                </th>

                                <th className="date">
                                    Date
                                </th>

                                <th className="chamber">
                                    Description
                                </th>

                                <th className="status">
                                    Status
                                </th>

                                <th className="edit">
                                    Action
                                </th>
                            </tr>
                            <tr className="tabile_row">
                                <td className="sn">
                                    <p>1</p>
                                </td>

                                <td className="name">
                                    <p>Dr. Samuel Bro</p>
                                    <span>Dental</span>
                                </td>

                                <td className="date">
                                    <p>05 Jun 2023</p>
                                    <span className="date_time">4:30 PM</span>
                                </td>

                                <td className="chamber">
                                    <p>12/3 Mirpur Dhaka Bangladesh</p>
                                </td>

                                <td className="status">
                                    <button>Complete</button>
                                </td>

                                <td className="edit">
                                    <a href="#">Edit</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="row mt_60">
                <div className="col-12">
                    <div id="pagination">
                        <nav aria-label="...">
                            <ul className="pagination justify-content-center">
                                <li className="page-item"><a className="page-link" href="#"><i
                                    className="fa fa-angle-double-left"></i></a></li>
                                <li className="page-item"><a className="page-link active" href="#">01</a></li>
                                <li className="page-item"><a className="page-link" href="#">02</a></li>
                                <li className="page-item"><a className="page-link" href="#">03</a></li>
                                <li className="page-item"><a className="page-link" href="#"><i
                                    className="fa fa-angle-double-right"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment