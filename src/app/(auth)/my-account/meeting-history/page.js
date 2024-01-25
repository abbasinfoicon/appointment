import React from 'react'

const MeetingHistory = () => {
    return (
        <div className="dashboard_content">
            <h5>Meeting History</h5>
            <div className="appointment_history">
                <div className="table-responsive">
                    <table className="table">
                        <tbody className="tf_dashboard__listing_body">
                            <tr>
                                <th className="sl">
                                    <p>SL</p>
                                </th>
                                <th className="patient">
                                    <p>Patient</p>
                                </th>

                                <th className="time">
                                    <p>Time</p>
                                </th>

                                <th className="transection_id">
                                    <p>Transection ID</p>
                                </th>

                                <th className="mh_payment_method">
                                    <p>Payment Method</p>
                                </th>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>1</p>
                                </td>

                                <td className="patient">
                                    <p>Andrea Lomarco</p>
                                </td>

                                <td className="time">
                                    <p>05 Jun 2023, 03:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF51568</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Paypal</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>2</p>
                                </td>

                                <td className="patient">
                                    <p>Lucas Swing</p>
                                </td>

                                <td className="time">
                                    <p>02 Feb 2023, 05:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF5156889</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Brac bank</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>3</p>
                                </td>

                                <td className="patient">
                                    <p>Marc Twain</p>
                                </td>

                                <td className="time">
                                    <p>25 Jun 2023, 02:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF515</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Hand Cash</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>4</p>
                                </td>

                                <td className="patient">
                                    <p>Andrea Lomarco</p>
                                </td>

                                <td className="time">
                                    <p>05 Jun 2023, 03:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF51568</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Paypal</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>5</p>
                                </td>

                                <td className="patient">
                                    <p>Lucas Swing</p>
                                </td>

                                <td className="time">
                                    <p>02 Feb 2023, 05:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF5156889</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Brac bank</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>6</p>
                                </td>

                                <td className="patient">
                                    <p>Marc Twain</p>
                                </td>

                                <td className="time">
                                    <p>25 Jun 2023, 02:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF515</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Hand Cash</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>7</p>
                                </td>

                                <td className="patient">
                                    <p>Andrea Lomarco</p>
                                </td>

                                <td className="time">
                                    <p>05 Jun 2023, 03:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF51568</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Paypal</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>8</p>
                                </td>

                                <td className="patient">
                                    <p>Marc Twain</p>
                                </td>

                                <td className="time">
                                    <p>25 Jun 2023, 02:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF515</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Hand Cash</p>
                                </td>
                            </tr>
                            <tr className="tabile_row transection_history">
                                <td className="sl">
                                    <p>9</p>
                                </td>

                                <td className="patient">
                                    <p>Andrea Lomarco</p>
                                </td>

                                <td className="time">
                                    <p>05 Jun 2023, 03:50 AM</p>
                                </td>

                                <td className="transection_id">
                                    <p>#FB1234124OPF51568</p>
                                </td>

                                <td className="mh_payment_method">
                                    <p>Paypal</p>
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

export default MeetingHistory