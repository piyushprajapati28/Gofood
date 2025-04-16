import React, { useEffect, useState } from 'react'
import Navebar from '../components/Navebar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import img1 from '../images/img1.webp'
import img2 from '../images/img2.webp'
import img3 from '../images/img3.webp'


const Home = () => {

   const [search,setSearch] = useState('')
   const [foodCat, setFoodCat] = useState([])
   const [foodItem, setFoodItem] = useState([])


   const loadData = async () => {
      let response = await fetch("https://jitway-server.onrender.com/api/foodData", {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         }
      });

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
      // console.log(response[0],response[1]);
   }

   useEffect(() => {
      loadData()
   }, [])




   return (
      <div>
         <div><Navebar /></div>
         <div><div id="carouselExampleFade" className="carousel slide carousel-fade my-2" data-bs-ride="carousel" style=   {{objectFit:"contain"}} >
                         <div className="carousel-inner" id='carousel' >
                             <div className="carousel-caption" style={{zIndex:"5"}}>
                                 <div className="d-flex justify-content-center">
                                     <input className="form-control me-2 bg-dark text-light" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                     {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                                 </div>
         
                             </div>
                             <div className="carousel-item active">
                                 <img src={img1} className="d-block w-100 " style={{objectFit:"contain",filter:"brightness(30%)",  height: "100vh"}} alt="..." />
                             </div>
                             <div className="carousel-item">
                                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLcJS-RxfDdynJKv7wC8J6B_JZvSD75_toA&s" className="d-block w-100" style={{filter:"brightness(30%)", objectFit:"contain", height: "100vh"}} alt="..." />
                             </div>
                             <div className="carousel-item">
                                 <img src={img3} className="d-block w-100" style={{filter:"brightness(30%)",objectFit:"contain", height: "100vh"}} alt="..." />
                             </div>
                         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                             <span className="visually-hidden">Previous</span>
                         </button>
                         <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                             <span className="carousel-control-next-icon" aria-hidden="true"></span>
                             <span className="visually-hidden">Next</span>
                         </button>
                         </div>
                     </div></div>
         <div className='container'>
         {foodCat.length > 0 ? (
  foodCat.map((data) => (
    <div key={data._id} className="row mb-3">
      <div className="fs-3 m-3 text-light">
        {data.CategoryName}
      </div>
      <hr style={{ borderColor: 'white' }} />

      {foodItem.length > 0 ? (
        foodItem
          .filter((item) => (item.CategoryName === data.CategoryName&& (item.name.toLowerCase().includes(search.toLocaleLowerCase())))) 
          .map((filterItems) => (
            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
              <Cards foodItem = {filterItems}
              options={filterItems.options[0]}
              

              />
            </div>
          ))
      ) : (
        <div>No such data found</div>
      )}
    </div>
  ))
) : (
  <div>
    <h1>No Categories Available</h1>
  </div>
)}



            



         </div>


         <div><Footer /></div>

      </div>
   )
}

export default Home