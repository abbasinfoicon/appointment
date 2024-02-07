"use client"
import FetchData from '@/app/components/FetchData';
import Loading from '@/app/loading';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

const Prescription = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['access_token']);
  const token = cookies.access_token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData({ url: "app/prescriptions", method: "GET", authorization: `Bearer ${token}`, contentType: "application/json" });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await res.json();

        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchData();

  }, [token]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="dashboard_content">
      <div className="banner_class">
        <img src="/assets/images/main-slider/slide7.jpg" alt="" className="img-fluid" />
      </div>

      <div className="headingWithButton">
        <h5>Prescription History</h5>
      </div>

      <div className="appointment_history">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="sn">
                  #ID
                </th>
                <th className="name">
                  Doctor
                </th>

                <th className="date">
                  Date/Time
                </th>

                <th className="chamber">
                  Description
                </th>

                <th className="status">
                  Prescription
                </th>

                <th className="edit">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {
                data.length ? (
                  data.slice().reverse().map((item) => (
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
                        <button>take parasitimole</button>
                      </td>

                      <td className="edit">
                        <a href="#">delete</a>
                      </td>
                    </tr>
                  ))) : <tr><td colSpan={6}>Prescription not Added!!!</td></tr>
              }
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

export default Prescription