import React, { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface DraggableDivProps {
  children: React.ReactNode;
  centralize: number;
  zoom: number;
}

export const DraggableDiv: React.FC<DraggableDivProps> = ({
  children,
  centralize,
  zoom,
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const centerTree = () => {
    const treeElement = document.getElementById("tree");
    if (treeElement) {
      const treeWidth = treeElement.clientWidth;
      const treeHeight = treeElement.clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const posX = (windowWidth - treeWidth) / 2;
      const posY = (windowHeight - treeHeight) / 2;
      setPosition({ x: posX, y: posY });
    }
  };

  useEffect(() => {
    centerTree();
  }, []);

  useEffect(() => {
    centerTree();
  }, [centralize]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const startX = event.pageX - position.x;
    const startY = event.pageY - position.y;

    const handleMouseMove = (event: MouseEvent) => {
      const newPosX = event.pageX - startX;
      const newPosY = Math.max(event.pageY - startY, 90); // Set minimum value of 90 for position.y
      setPosition({ x: newPosX, y: newPosY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      id="tree"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: "move",
        scale: `${zoom}%`,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};
