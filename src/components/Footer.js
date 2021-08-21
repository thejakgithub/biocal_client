import React from 'react'
import ScrollToTop from './ScrollToTop'
import '../styles/styles.components/Footer.css'

export default function Footer() {

  return (
    <div className="bg-success py-3 ">
      <ScrollToTop />
      <div className="container-fluid px-md-5 text-white text-footer ">
        <div >มูลนิธิความหลากหลายทางชีวภาพ</div>
        <div >COPYRIGHT © 2018 Biodiversity, Culture and Local Wisdom Foundation (BIOCAL)</div>
      </div>
    </div>
  )
}
