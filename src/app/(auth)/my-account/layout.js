'use client'
import Banner from "@/app/components/Banner";
import FetchData from "@/app/components/FetchData";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';

export default function DashboardLayout({ children }) {
    const [data, setData] = useState({});
    const [cookies, , removeCookie] = useCookies(['access_token', 'refresh_token', 'role', 'user_id']);
    const token = cookies.access_token;
    const pathname = usePathname();
    const router = useRouter();
    const dashboardSlug = pathname.replace(/^\/my-account\//, '');

    const removeCookies = () => {
        removeCookie('access_token');
        removeCookie('refresh_token');
        removeCookie('role');
        removeCookie('user_id');

        router.push("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "user/details", method: "GET", authorization: `Bearer ${token}` });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [token]);

    return (
        <>
            <Banner title={dashboardSlug == '/my-account' ? 'My Account' : dashboardSlug} img="bnr1.jpg" />

            <section className="dashboard content-inner">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4">
                            <div className="user_profile">
                                <div className="user_profile_img">
                                    {
                                        data.gender === 'Female' ? <img src="/assets/images/user_img-2.png" alt="user" className=" img-fluid w-100" /> : <img src="/assets/images/user_img.png" alt="user" className=" img-fluid w-100" />
                                    }
                                </div>
                                <h4>{data.first_name} {data.last_name}</h4>
                                <p>Patient Id : {data.id}</p>
                            </div>
                            <ul className="dashboard_menu">
                                <li><Link className={pathname === '/my-account' || pathname === '/my-account/profile' ? 'active' : ''} href="/my-account">My Profile</Link></li>
                                <li><Link className={pathname === '/my-account/appointment' ? 'active' : ''} href="/my-account/appointment">Appointment</Link></li>
                                <li><Link className={pathname === '/my-account/prescription' ? 'active' : ''} href="/my-account/prescription">Prescriptions</Link></li>
                                <li><Link className={pathname === '/my-account/transaction-history' ? 'active' : ''} href="/my-account/transaction-history">Transaction History</Link></li>
                                <li><Link className={pathname === '/my-account/meeting-history' ? 'active' : ''} href="/my-account/meeting-history">Meeting History</Link></li>
                                <li><Link className={pathname === '/my-account/upcoming-meeting' ? 'active' : ''} href="/my-account/upcoming-meeting">Upcoming Meeting</Link></li>
                                <li><Link className={pathname === '/my-account/testimonial' ? 'active' : ''} href="/my-account/testimonial">Testimonial</Link></li>
                                <li><Link className={pathname === '/my-account/chat' ? 'active' : ''} href="/my-account/chat">Chat</Link></li>
                                <li><button onClick={removeCookies}>Logout</button></li>
                            </ul>
                        </div>

                        <div className="col-xl-9 col-lg-8">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}