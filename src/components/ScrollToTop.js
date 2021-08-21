import React, { useEffect, useState } from "react";
import '../styles/styles.components/ScrollToTop.css'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [fetched, setFetched] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    Promise.all([
      window.addEventListener("scroll", toggleVisibility)
    ]).then(() => setFetched(true))
      .catch(ex => console.error(ex));

    return () => ac.abort();
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && fetched && (
        <div onClick={ scrollToTop}>
          <i className="fas fa-arrow-circle-up fs-1  mx-4 mb-2 text-dark"></i>
        </div>
      )}
    </div>
  );
}
