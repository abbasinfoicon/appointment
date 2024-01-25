import React from 'react'

const Chat = () => {
    return (
        <div className="dashboard_content">
            <h5>Message</h5>
            <div className="row">
                <div className="col-xl-4">
                    <div className="message_list">
                        <form className="massager_searchbox">
                            <input type="text" className='form-control' placeholder="Search" />
                            <button type="submit"><i className="fa fa-search"></i></button>
                        </form>
                        <div className="nav flex-column nav-pills massager_option" id="v-pills-tab"
                            role="tablist" aria-orientation="vertical">
                            <div className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#v-pills-home" role="tab" aria-controls="v-pills-home"
                                aria-selected="true">

                                <div className="single_massage d-flex">
                                    <div className="single_massage_img">
                                        <img src="/assets/images/chat/massage-1.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="single_massage_text">
                                        <h4>Charlene Reed</h4>
                                        <p>Lorem ipsum dolor si..</p>
                                        <span className="massage_time">30 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="nav-link" id="v-pills-messages-tab1" data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages1" role="tab"
                                aria-controls="v-pills-messages1" aria-selected="false">
                                <div className="single_massage d-flex">
                                    <div className="single_massage_img">
                                        <img src="/assets/images/chat/massage-2.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="single_massage_text">
                                        <h4>Sohan Islam</h4>
                                        <p>Lorem ipsum dolor si..</p>
                                        <span className="massage_time">20 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="nav-link" id="v-pills-messages-tab2" data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages2" role="tab"
                                aria-controls="v-pills-messages2" aria-selected="false">
                                <div className="single_massage d-flex">
                                    <div className="single_massage_img">
                                        <img src="/assets/images/chat/massage-3.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="single_massage_text">
                                        <h4>Asad Islam</h4>
                                        <p>Lorem ipsum dolor si..</p>
                                        <span className="massage_time">10 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="nav-link" id="v-pills-messages-tab3" data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages3" role="tab"
                                aria-controls="v-pills-messages3" aria-selected="false">
                                <div className="single_massage d-flex">
                                    <div className="single_massage_img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="single_massage_text">
                                        <h4>Jannatul Jeo </h4>
                                        <p>Lorem ipsum dolor si..</p>
                                        <span className="massage_time">30 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="nav-link" id="v-pills-messages-tab4" data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages4" role="tab"
                                aria-controls="v-pills-messages4" aria-selected="false">
                                <div className="single_massage d-flex">
                                    <div className="single_massage_img">
                                        <img src="/assets/images/chat/massage-5.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="single_massage_text">
                                        <h4>Charlene Reed</h4>
                                        <p>Lorem ipsum dolor si..</p>
                                        <span className="massage_time">27 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="nav-link" id="v-pills-messages-tab5" data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages5" role="tab"
                                aria-controls="v-pills-messages5" aria-selected="false">
                                <div className="single_massage d-flex">
                                    <div className="single_massage_img">
                                        <img src="/assets/images/chat/massage-6.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="single_massage_text">
                                        <h4>Happy Heya</h4>
                                        <p>Lorem ipsum dolor si..</p>
                                        <span className="massage_time">18 min</span>
                                    </div>
                                </div>
                            </div>

                            <div className="nav-link" id="v-pills-messages-tab6" data-bs-toggle="pill"
                                data-bs-target="#v-pills-messages6" role="tab"
                                aria-controls="v-pills-messages6" aria-selected="false">
                                <div className="single_massage d-flex">
                                    <div className="single_massage_img">
                                        <img src="/assets/images/chat/massage-7.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="single_massage_text">
                                        <h4>Charlene Reed</h4>
                                        <p>Lorem ipsum dolor si..</p>
                                        <span className="massage_time">9 min</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                            aria-labelledby="v-pills-home-tab" tabindex="0">
                            <div className="_single_chat">
                                <div className="single_chat_top">
                                    <div className="img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="text">
                                        <h4>Charlene Reed</h4>
                                        <p>active</p>
                                        <a href="#">Delete Chat</a>
                                    </div>
                                </div>

                                <div className="single_chat_body">
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>eum errem is any one aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Mundi admodum menandri, eum errem is any one aperiri at. Ut
                                                quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                </div>
                                <form className="single_chat_bottom">
                                    <label htmlFor="select_file"><i className="fa fa-file-text"></i></label>
                                    <input id="select_file" type="file" hidden />
                                    <input type="text" className='form-control' placeholder="Type a message..." />
                                    <button className="massage_btn"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-pills-messages1" role="tabpanel"
                            aria-labelledby="v-pills-messages-tab1" tabindex="0">
                            <div className="_single_chat">
                                <div className="single_chat_top">
                                    <div className="img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="text">
                                        <h4>Charlene Reed</h4>
                                        <p>active</p>
                                        <a href="#">Delete Chat</a>
                                    </div>
                                </div>

                                <div className="single_chat_body">
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>eum errem is any one aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Mundi admodum menandri, eum errem is any one aperiri at. Ut
                                                quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                </div>
                                <form className="single_chat_bottom">
                                    <label htmlFor="select_file_1"><i className="fa fa-file-text"></i></label>
                                    <input id="select_file_1" type="file" hidden />
                                    <input type="text" className='form-control' placeholder="Type a message..." />
                                    <button className="massage_btn"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="v-pills-messages2" role="tabpanel"
                            aria-labelledby="v-pills-messages-tab2" tabindex="0">
                            <div className="_single_chat">
                                <div className="single_chat_top">
                                    <div className="img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="text">
                                        <h4>Charlene Reed</h4>
                                        <p>active</p>
                                        <a href="#">Delete Chat</a>
                                    </div>
                                </div>

                                <div className="single_chat_body">
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>eum errem is any one aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Mundi admodum menandri, eum errem is any one aperiri at. Ut
                                                quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                </div>
                                <form className="single_chat_bottom">
                                    <label htmlFor="select_file_7"><i className="fa fa-file-text"></i></label>
                                    <input id="select_file_7" type="file" hidden />
                                    <input type="text" className='form-control' placeholder="Type a message..." />
                                    <button className="massage_btn"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="v-pills-messages3" role="tabpanel"
                            aria-labelledby="v-pills-messages-tab3" tabindex="0">
                            <div className="_single_chat">
                                <div className="single_chat_top">
                                    <div className="img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="text">
                                        <h4>Charlene Reed</h4>
                                        <p>active</p>
                                        <a href="#">Delete Chat</a>
                                    </div>
                                </div>

                                <div className="single_chat_body">
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>eum errem is any one aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Mundi admodum menandri, eum errem is any one aperiri at. Ut
                                                quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                </div>
                                <form className="single_chat_bottom">
                                    <label htmlFor="select_file_2"><i className="fa fa-file-text"></i></label>
                                    <input id="select_file_2" type="file" hidden />
                                    <input type="text" className='form-control' placeholder="Type a message..." />
                                    <button className="massage_btn"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="v-pills-messages4" role="tabpanel"
                            aria-labelledby="v-pills-messages-tab4" tabindex="0">
                            <div className="_single_chat">
                                <div className="single_chat_top">
                                    <div className="img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="text">
                                        <h4>Charlene Reed</h4>
                                        <p>active</p>
                                        <a href="#">Delete Chat</a>
                                    </div>
                                </div>

                                <div className="single_chat_body">
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>eum errem is any one aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Mundi admodum menandri, eum errem is any one aperiri at. Ut
                                                quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                </div>
                                <form className="single_chat_bottom">
                                    <label htmlFor="select_file_3"><i className="fa fa-file-text"></i></label>
                                    <input id="select_file_3" type="file" hidden />
                                    <input type="text" className='form-control' placeholder="Type a message..." />
                                    <button className="massage_btn"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="v-pills-messages5" role="tabpanel"
                            aria-labelledby="v-pills-messages-tab5" tabindex="0">
                            <div className="_single_chat">
                                <div className="single_chat_top">
                                    <div className="img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="text">
                                        <h4>Charlene Reed</h4>
                                        <p>active</p>
                                        <a href="#">Delete Chat</a>
                                    </div>
                                </div>

                                <div className="single_chat_body">
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>eum errem is any one aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Mundi admodum menandri, eum errem is any one aperiri at. Ut
                                                quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                </div>
                                <form className="single_chat_bottom">
                                    <label htmlFor="select_file_4"><i className="fa fa-file-text"></i></label>
                                    <input id="select_file_4" type="file" hidden />
                                    <input type="text" className='form-control' placeholder="Type a message..." />
                                    <button className="massage_btn"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="v-pills-messages6" role="tabpanel"
                            aria-labelledby="v-pills-messages-tab6" tabindex="0">
                            <div className="_single_chat">
                                <div className="single_chat_top">
                                    <div className="img">
                                        <img src="/assets/images/chat/massage-4.png" alt="person"
                                            className="img-fluid w-100" />
                                    </div>
                                    <div className="text">
                                        <h4>Charlene Reed</h4>
                                        <p>active</p>
                                        <a href="#">Delete Chat</a>
                                    </div>
                                </div>

                                <div className="single_chat_body">
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>eum errem is any one aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Mundi admodum menandri, eum errem is any one aperiri at. Ut
                                                quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                    <div className="chating">
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-4.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                        <div className="chating_text">
                                            <p>Cum id mundi admodum menandri, eum errem is any one
                                                aperiri at. Ut quas facilis qui</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                    </div>
                                    <div className="chating tf_chat_right">
                                        <div className="chating_text">
                                            <p>Please check your mail and come on meeting</p>
                                            <span>15 Jun, 2023, 05:26 AM</span>
                                        </div>
                                        <div className="chating_img">
                                            <img src="/assets/images/chat/massage-8.png" alt="person"
                                                className="img-fluid w-100" />
                                        </div>
                                    </div>
                                </div>
                                <form className="single_chat_bottom">
                                    <label htmlFor="select_file_5"><i className="fa fa-file-text"></i></label>
                                    <input id="select_file_5" type="file" hidden />
                                    <input type="text" className='form-control' placeholder="Type a message..." />
                                    <button className="massage_btn"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat