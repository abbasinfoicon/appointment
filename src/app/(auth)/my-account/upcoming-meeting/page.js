import React from 'react'

const UpcomingMeeting = () => {
    return (
        <div className="dashboard_content">
            <h5>Upcoming Meeting</h5>
            <div className="appointment_history">
                <div className="table-responsive">
                    <table className="table">
                        <tbody className="tf_dashboard__listing_body">
                            <tr>
                                <th className="um_sn">
                                    <p>SL</p>
                                </th>
                                <th className="um_name">
                                    <p>Doctor</p>
                                </th>

                                <th className="um_date">
                                    <p>Date</p>
                                </th>

                                <th className="um_duration">
                                    <p>Duration</p>
                                </th>

                                <th className="um_action">
                                    <p>Action</p>
                                </th>
                            </tr>
                            <tr className="tabile_row">
                                <td className="um_sn">
                                    <p>1</p>
                                </td>

                                <td className="um_name">
                                    <p>Dr. Samuel Bro</p>
                                </td>

                                <td className="um_date">
                                    <p>05 Jun 2023</p>
                                    <span className="date_time">4:30 PM</span>
                                </td>

                                <td className="um_duration">
                                    <p>30 Minutes</p>
                                </td>

                                <td className="um_action">
                                    <button className="confirm_btn">Confirm</button>
                                    <button className="cancel_btn">cancel</button>
                                </td>
                            </tr>
                            <tr className="tabile_row">
                                <td className="um_sn">
                                    <p>2</p>
                                </td>

                                <td className="um_name">
                                    <p>Dr. Samuel Bro</p>
                                </td>

                                <td className="um_date">
                                    <p>05 Jun 2023</p>
                                    <span className="date_time">4:30 PM</span>
                                </td>

                                <td className="um_duration">
                                    <p>30 Minutes</p>
                                </td>

                                <td className="um_action">
                                    <button className="confirm_btn">Confirm</button>
                                    <button className="cancel_btn">cancel</button>
                                </td>
                            </tr>
                            <tr className="tabile_row">
                                <td className="um_sn">
                                    <p>3</p>
                                </td>

                                <td className="um_name">
                                    <p>Dr. Samuel Bro</p>
                                </td>

                                <td className="um_date">
                                    <p>05 Jun 2023</p>
                                    <span className="date_time">4:30 PM</span>
                                </td>

                                <td className="um_duration">
                                    <p>30 Minutes</p>
                                </td>

                                <td className="um_action">
                                    <button className="confirm_btn">Confirm</button>
                                    <button className="cancel_btn">cancel</button>
                                </td>
                            </tr>
                            <tr className="tabile_row">
                                <td className="um_sn">
                                    <p>4</p>
                                </td>

                                <td className="um_name">
                                    <p>Dr. Samuel Bro</p>
                                </td>

                                <td className="um_date">
                                    <p>05 Jun 2023</p>
                                    <span className="date_time">4:30 PM</span>
                                </td>

                                <td className="um_duration">
                                    <p>30 Minutes</p>
                                </td>

                                <td className="um_action">
                                    <button className="confirm_btn">Confirm</button>
                                    <button className="cancel_btn">cancel</button>
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

export default UpcomingMeeting