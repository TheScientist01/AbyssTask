import { useState } from "react";
import "./App.css";
import { DraggableDiv } from "./components/DraggableDiv";
import Header from "./components/Header";
import HierarchyTree from "./components/HierarchyTree";

function App() {
  const [centralize, setCentralize] = useState(0);
  const [zoom, setZoom] = useState(100);

  return (
    <>
      <div className="main">
        <Header
          centralize={() => {
            setCentralize(centralize + 1);
          }}
          setZoom={(zoom) => {
            setZoom(zoom);
          }}
        />
        <DraggableDiv centralize={centralize} zoom={zoom}>
          <HierarchyTree />
        </DraggableDiv>
      </div>
    </>
  );
}

export default App;
