import { useState, useRef } from "react";
import useClickOutside from "./hooks/useClickOutside";

interface ButtonProps {
  centralize: (params: any) => any;
  setZoom: (params: number) => any;
}

const zoomLevels = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];

const Header = ({ centralize, setZoom }: ButtonProps) => {
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const zoomRef = useRef();
  useClickOutside(zoomRef, () => {
    setIsZoomActive(false);
  });

  const increaseZoom = () => {
    const zoom = zoomLevels.indexOf(zoomLevel);
    if (zoom < 10) {
      setZoom(zoomLevels[zoom + 1]);
      setZoomLevel(zoomLevels[zoom + 1]);
    } else {
      return;
    }
  };

  const decreaseZoom = () => {
    const zoom = zoomLevels.indexOf(zoomLevel);
    if (zoom > 0) {
      setZoom(zoomLevels[zoom - 1]);
      setZoomLevel(zoomLevels[zoom - 1]);
    } else {
      return;
    }
  };

  return (
    <div className="header">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <h3>Services</h3>
          <div className="service-number">0</div>
        </div>

        <div className="flex gap-1">
          <button className="btn bg-primary text-white">List View</button>
          <button onClick={centralize}>
            <i className="fa-solid fa-location-arrow"></i>
          </button>
          <div>
            <div style={{ padding: 0 }} className="flex zoom">
              <button onClick={decreaseZoom}>-</button>
              <button
                onClick={() => {
                  !isZoomActive && setIsZoomActive(true);
                }}
              >
                {zoomLevel}%
              </button>
              <button onClick={increaseZoom}>+</button>
            </div>
            {isZoomActive && (
              //@ts-ignore
              <div ref={zoomRef} className="zoomDropdown">
                {zoomLevels.map((level) => (
                  <div
                    onClick={() => {
                      setZoomLevel(level);
                      setZoom(level);
                      setIsZoomActive(false);
                    }}
                  >
                    {level}%
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
