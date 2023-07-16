import React, { useEffect, useRef, useState } from 'react'
import './Gigs.scss'
import { gigs } from '../../data'
import GigCard from '../../components/gigCard/GigCard'
import newRequest from '../../utils/newRequest'
import { useLocation } from 'react-router-dom'

const Gigs = () => {
  const [gigs, setGigs] = useState([])
  const [open, setOpen] = useState(false)
  const [openAvg, setOpenAvg] = useState(false)
  const [sort, setSort] = useState("price")
  const [sortAvg, setSortAvg] = useState(1) // 1: desc ; -1: asc
  const minRef = useRef()
  const maxRef = useRef()
  const [err, setErr] = useState(false)

  const { search } = useLocation()

  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }

  const reSortAvg = (type) => {
    setSortAvg(type)
    setOpenAvg(false)
  }

  const fetchGigs = async () => {
    try {
      const { data } = await newRequest.get(`/gigs${search ? search : '?'}${minRef.current.value && `&min=${minRef.current.value}`}${maxRef.current.value && `&max=${maxRef.current.value}`}${sort && `&sort=${sort}`}${sortAvg && `&sortAvg=${sortAvg}`}`)
      setErr(false)
      setGigs(data)
    } catch (err) {
      console.log('err: ', err)
      setGigs([])
      setErr(true)
    }
  }

  useEffect(() => {
    fetchGigs()
  }, [sort, sortAvg])

  console.log('gigs: ', gigs)

  return (
    <div className='gigs'>
      <div className="container">
        <span className='breadcrumbs'>FIVERR > GRAPHICS & DESIGN ></span>
        <h1>AI Artists</h1>
        <p>Explore the boundaries of art nd technology with Fiverr's AI Artists</p>

        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input type="text" placeholder='min' ref={minRef} />
            <input type="text" placeholder='max' ref={maxRef} />
            <button onClick={fetchGigs}>Apply</button>
          </div>

          <div className="right">
            <span className='sortBy'>SortBy</span>
            <span className='sortType'>{sort === 'price' ? 'Best Selling' : 'Newest'}</span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />

            {open && (
              <div className="rightMenu">
                {sort === 'price' ?
                  <span onClick={() => reSort('createdAt')}>Newest</span>
                  :
                  <span onClick={() => reSort('price')}>Best Selling</span>
                }
              </div>
            )}
          </div>

          <div className="right">
            <span className='sortBy'>Sắp xếp</span>
            <span className='sortType'>{sortAvg === 1 ? 'Tăng dần' : 'Giảm dần'}</span>
            <img src="./img/down.png" alt="" onClick={() => setOpenAvg(!openAvg)} />

            {openAvg && (
              <div className="rightMenu">
                {sortAvg === 1 ?
                  <span onClick={() => reSortAvg(-1)}>Giảm dần</span>
                  :
                  <span onClick={() => reSortAvg(1)}>Tăng dần</span>
                }
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {err ? "No items available" : gigs?.map(gig => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs

