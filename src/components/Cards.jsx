import React, { useEffect, useRef, useState } from 'react'
// import img1 from '../images/img2.jpg'
import { useDispatcherCart, useCart } from './ContextReduser';

const Cards = (props) => {
    let dispatch = useDispatcherCart();
    let data = useCart(); 
    let options = props.options;
    const priceRef = useRef();
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddeCard = async () => {
        let food = [];
        for (const item of data) {
          if (item.id === props.foodItem._id) {
            food = item;
            break;
          }
        }
        
        if (food && Object.keys(food).length > 0) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
          }
        }
        
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price:finalPrice,
            qty: qty,
            size: size
        });
        console.log(data);
    };

    let finalPrice =qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div>
            <div className="card mt-3 " style={{ "width": "20rem", "maxHeight": "390px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "220px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text"></p>
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                         ₹{finalPrice}/-

                        </div>
                        <hr />
                        <button className={`btn btn-success justify-center ms-2 rounded`} onClick={handleAddeCard}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;
