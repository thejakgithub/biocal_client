import React from 'react'
import {Image} from 'react-bootstrap'
import '../styles/styles.components/Carousel.css'

export default function Carousel() {
    return (
        <div className="container-md mb-md-4 mb-3 carousel-wrapper">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3} aria-label="Slide 4" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <Image src="/img/carousel/pic1.jpg" className="img d-block w-100" alt="pic1"    />
                    </div>
                    <div className="carousel-item">
                        <Image src="/img/carousel/pic2.jpg" className="img d-block w-100" alt="pic2" />
                    </div>
                    <div className="carousel-item">
                        <Image src="/img/carousel/pic3.jpg" className="img d-block w-100" alt="pic3"  />
                    </div>
                    <div className="carousel-item">
                        <Image src="/img/carousel/pic4.jpg" className="img d-block w-100" alt="pic4"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
