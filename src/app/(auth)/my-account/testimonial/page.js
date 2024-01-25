'use client'
import FetchData from '@/app/components/FetchData'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import Loading from '@/app/loading';
import JEditor from '@/app/(backend)/components/JEditor'

const Testimonial = () => {
    const router = useRouter();
    const [data, setData] = useState({ star: "", comment: "" });
    const [testimonial, setTestimonial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');

    const [cookies, setCookie, removeCookies] = useCookies(['access_token']);
    const token = cookies.access_token;
    const user_id = cookies.user_id;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { star } = data;

        try {
            if (!star || !content) {
                toast.error("All (*) fields Required!!!");
            }
            data.comment = content;
            const res = await FetchData({ url: "app/createRating", body: data, method: "POST", authorization: `Bearer ${token}`, contentType: "application/json" });
            const result = await res.json();

            if (result.status === 400 || result.status === 409 || result.status === 500 || result.status === 415) {
                toast.error(result.Error);
            }

            if (result.status === 201 || res.ok) {
                setData({ star: "" });
                setContent("")
                router.push('/my-account/testimonial');
                toast.success(result.Message);
            }

        } catch (error) {
            console.error("Testimonial not added !!!", error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await FetchData({ url: "app/ratings" });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const postData = await res.json();
                const fltdata = postData.data.filter(item => item.user.id === user_id);
                setTestimonial(fltdata[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(true);
            }
        };

        fetchData();
    }, [user_id, data]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="dashboard_content dashboard_profile">
            <div className="banner_class">
                <img src="/assets/images/main-slider/slide7.jpg" alt="" className="img-fluid" />
            </div>

            {
                testimonial ? <div className="review-patient mb-5">
                    <h5>Your Comment</h5>

                    <div className="rating-bar">
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <i key={index} className={`fa fa-star ${index < testimonial?.star ? 'text-warning' : ''}`}></i>
                            ))
                        }
                    </div>

                    <p dangerouslySetInnerHTML={{ __html: testimonial?.comment }}></p>
                    <p className='text-right'>- <span><em>{testimonial?.user?.first_name} {testimonial?.user?.last_name}</em></span></p>

                </div> : <>
                    <h5>Add Testimonial for hospital</h5>

                    <form className="reg-form" onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2 form-group">
                                    <label className="form-label">Rating</label>
                                    <select className="form-control" name='star' value={data.star} onChange={handleChange}>
                                        <option>--select--</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="form-label">Comment</label>
                                        <JEditor content={content} setContent={setContent} />
                                        {/* <textarea className="form-control" cols="5" name="comment" value={data.comment} onChange={handleChange}></textarea> */}
                                        <small className="text-muted">Enter any size of text Comment here</small>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <button type='submit' className="btn rounded btn-primary">Save</button>
                                    <button type="reset" className="btn rounded">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            }
        </div>
    )
}

export default Testimonial