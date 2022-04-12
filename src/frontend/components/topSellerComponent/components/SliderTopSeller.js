import {Container} from "react-bootstrap";
import {useLayoutEffect, useRef, useState} from "react";
import {useWindowSize} from "../../../shared/helpers";
import {BsCheckLg} from "react-icons/bs";

export const SliderTopSeller = ({data}) => {
  const sellerItem = useRef(null);
  const sliderRef = useRef(null);
  const currentWindowWidth = useWindowSize();
  
  const CARD_PER_PAGE = currentWindowWidth < 768 ? 3 : currentWindowWidth <= 498 ? 2 : 5;
  
  const [sliderCurrentWidth, setSliderCurrentWidth] = useState(0);
  
  useLayoutEffect(() => {
    const updateSize = () => {
      setSliderCurrentWidth(sliderRef?.current?.offsetWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <Container className="slider-container" fluid>
      <div ref={sliderRef} className="slider-inner" style={{overflow: "scroll"}}>
        <div className="slider-track" style={{
          width: `(${sellerItem.current?.offsetWidth * data.length})px`,
        }}>>
          {
            data.map((val, index) => (
              <div ref={sellerItem} key={index}
                   style={{width: `calc(${sliderCurrentWidth}px / ${CARD_PER_PAGE})`}}>
                <div className="top-seller__item-container">
                  <div className="seller-avt">
                    <img src={val.sellerAvt} alt=""/>
                    <div className={`seller-verify ${val.isVerify && "is-verify"}`}>
                      <BsCheckLg/>
                    </div>
                  </div>
                  <div className="seller-info">
                    <a href={val.sellerProfileUrl} className="seller-name">{val.sellerName}</a>
                    <p className="seller-total__price">{val.sellerPriceTotal}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  );
};