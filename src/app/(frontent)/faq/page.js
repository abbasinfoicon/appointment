'use client'
import React, { useEffect, useState } from 'react'
import Banner from '@/app/components/Banner';
import Link from 'next/link';
import FetchData from '@/app/components/FetchData';

const Faq = () => {
    const [data, setData] = useState([]);
    const [activePanel, setActivePanel] = useState(null);
    const [loading, setLoading] = useState(true);

    const togglePanel = (panel) => {
        setActivePanel((prevPanel) => (prevPanel === panel ? null : panel));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "FAQ/view", method: "GET" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await res.json();

                // Update the state with result.data
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Banner title="FAQ's" img="bnr1.jpg" />

            <div className="section-full  bg-white">
                <section className="content-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="m-b30">
                                    <h2 className="m-b10">General Questions</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>

                                    <div className="accordion space faq-bx">
                                        {
                                            data.map((item, i) => (
                                                <div className={item.show_visibility ? 'panel' : 'd-none'} key={i}>
                                                    <div className="acod-head">
                                                        <h6 className="acod-title">
                                                            <p className={activePanel === i + 1 + i * 100 ? '' : 'collapsed'} onClick={() => togglePanel(i + 1 + i * 100)}>
                                                                <i className="fa fa-question-circle"></i> {item.question}
                                                            </p>
                                                        </h6>
                                                    </div>
                                                    <div id={`collapse${i + 1}${i}`} className={`acod-body collapse ${activePanel === i + 1 + i * 100 ? 'show' : ''}`}>
                                                        <div className="acod-content" dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="faqside m-b30">
                                    <div className="candidates-are-sys m-b30">
                                        <div className="candidates-bx">
                                            <div className="testimonial-pic radius"><img src="/assets/images/testimonials/pic3.jpg" alt="" width="100" height="100" /></div>
                                            <div className="testimonial-text">
                                                <p>I just got a job that I applied for via careerfy! I used the site all the time during my job hunt.</p>
                                            </div>
                                            <div className="testimonial-detail"> <strong className="testimonial-name">Richard Anderson</strong> <span className="testimonial-position">Nevada, USA</span> </div>
                                        </div>
                                    </div>
                                    <div className="quote-bx">
                                        <div className="quote-info">
                                            <h4>Be healthy now is so simple!</h4>
                                            <p>Your resume in minutes with JobBoard resume assistant is ready!</p>
                                            <Link href="#" className="site-button">Create an Account</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Faq