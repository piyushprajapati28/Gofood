import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navebar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            console.log('No user email found in local storage.');
            return;
        }

        const response = await fetch("https://jitway-server.onrender.com/api/myorderData", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail })
        });

        const data = await response.json();
        if (data) {
            setOrderData(data);
        } else {
            console.error('No data found or error fetching data');
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="row">

                    {orderData.length > 0 ? orderData.map((data, index) => (
                        data.orderData && Array.isArray(data.orderData.order_data) ? (
                            data.orderData.order_data.slice(0).reverse().map((orderItem, idx) => (
                                <div key={idx} className="col-12 col-md-6 col-lg-3">
                                    {Array.isArray(orderItem) ? (
                                        orderItem.map((arrayData, i) => (
                                            <div key={i}>
                                                {arrayData.Order_date ? (
                                                    <div className="m-auto mt-5">
                                                        {arrayData.Order_date}
                                                        <hr />
                                                    </div>
                                                ) : (
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img
                                                            src={arrayData.img}
                                                            className="card-img-top"
                                                            alt="Order Item"
                                                            style={{ height: "120px", objectFit: "fill" }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                                <span className="m-1">{arrayData.qty}</span>
                                                                <span className="m-1">{arrayData.size}</span>
                                                                <span className="m-1">{data.orderData.Order_date}</span>
                                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            ))
                        ) : null
                    )) : <p>No orders found.</p>}
                </div>
            </div>

            <Footer />
        </div>
    );
}
