import React, { useEffect } from 'react'
import { useContext, useState} from 'react'
import {ShopContext} from "../context/ShopContext"
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'



function Collection() {
  
  const {products} = useContext(ShopContext)
  const [showFilter,setShowFilter] = useState(true);
  const [filteredProducts,setFilteredProducts] = useState([])
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('relevant')

  
  
  const toggleCategory = (e)=>{
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item=> item!==e.target.value))
    }
    else {
      setCategory(prev=> [...prev,e.target.value])
    }
  }
  const toggleSubcategory = (e)=>{
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item=> item!==e.target.value))
    }
    else {
      setSubCategory(prev=> [...prev,e.target.value])
    }
  }

  
  const applyFilter  = ()=>{
    let productCopy = products.slice();
    if (category.length > 0) {
      productCopy = productCopy.filter(item=>category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilteredProducts(productCopy)
  }

  
  
  const sortProduct = ()=> {
    let fpCopy  =filteredProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
        break
      default:
        applyFilter()
    }
  }

  useEffect(()=>{
    applyFilter()
  },[category,subCategory])
 
  useEffect(()=>{
    sortProduct()
  },[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* {filter options} */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className=' my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`-z-10 h-3 sm:hidden ${showFilter?'rotate-90':""}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* {cATEGORY FILTER} */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?"":'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleCategory} value={'Men'} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleCategory} value={'Women'} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleCategory} value={'Kids'} />Kids
            </p>
          </div>
        </div>
        {/* {Sub-category Filter} */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter?"":'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleSubcategory} value={'Topwear'} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleSubcategory} value={'Bottomwear'} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" onChange={toggleSubcategory} value={'Winterwear'} /> Winterwear
            </p>
          </div>
        </div>
      </div>
    {/* {Right Side} */}
    <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4 '>
        <Title text1={'ALL'} text2 = {"COLLECTIONS"}/>
        {/* {Product Sort} */}
        <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
      </div>

      {/* {Map all Products} */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filteredProducts.map((item,index)=>(
            <ProductItem key={index} name={item.name} image={item.image} id={item._id} price = {item.price}/>
          ))
        }
      </div>

    </div>
    </div>
  )
}

export default Collection