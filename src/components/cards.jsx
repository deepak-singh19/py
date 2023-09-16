import React from 'react'

const Cards = ({e}) => {
  console.log(e);
  return (
    <div className='flex flex-row w-[300px] h-[300px] shadow-lg rounded-lg'>
      <div className='flex w-3/5'>
        <img src={e.img} alt="img" />
      </div>
      <div className='flex flex-col w-2/5'>
        <div className='flex flex-col'>
          <p>{e.name}</p>
          <p>{e.desc}</p>
        </div>
        <div className='flex flex-col'>
          {
            e.qty>5?<>
            <p className='px-4 py-2 rounded-full border text-white bg-orange-600'>Only {e.qty} left</p>
            </>:<>
            <p className='px-4 py-2 rounded-full border text-white bg-green-600'>Available</p>
            </>
          }
          <div className='flex'>
            <p>{e.price}</p>

          </div>

        </div>


      </div>


    </div>
  )
}

export default Cards;