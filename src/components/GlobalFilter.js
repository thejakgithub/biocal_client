import React from 'react'

export default function GlobalFilter({filter,setFilter}) {
    return (
        <span>
              <input className="form-control search my-2 " type="search" placeholder="ค้นหา" aria-label="Search" 
              value={filter || ''}  onChange={e => setFilter(e.target.value)} />
        </span>
    )
}
