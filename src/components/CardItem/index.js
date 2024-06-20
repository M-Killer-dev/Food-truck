import React from 'react'
import "./CardItem.css"

const header = "BBQ CHICKEN";

export default function index() {
  return (
    <div>
      <div className='container p-2'>
        <div className='d-flex flex-column'>
          <div className='header-title d-flex justify-content-center'>
            <span className='title1'>
              {header.split(" ")[0]}</span>
            <span className='title2'>
              {header.split(" ")[1]}</span>
          </div>
          <div className='subtitle-container'>
            <div className='subtitle d-flex justify-content-center'>
              (Served as a chicken only or dinner w/choice of 2 sides)
            </div>
          </div>

          <div className='category-item-list d-flex justify-content-center'>
            <div className='category-item'>
              <p>
                QUARTER WHITE CHICKEN
              </p>
              <span>$9/$13</span>
            </div>
            <div className='category-item'>
              <p>
                QUARTER WHITE CHICKEN
              </p>
              <span>$9/$13</span>
            </div>
            <div className='category-item'>
              <p>
                QUARTER WHITE CHICKEN
              </p>
              <span>$9/$13</span>
            </div>
            <div className='category-item'>
              <p>
                QUARTER WHITE CHICKEN
              </p>
              <span>$9/$13</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
