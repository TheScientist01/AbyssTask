import React, { useState, useRef } from "react";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  handleAdd: (parentId: string, newLabel: string) => void;
  handleRemove: (id: string) => void;
  handleUpdate: (id: string, label: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  handleAdd,
  handleRemove,
  handleUpdate,
}) => {
  const { id, label, children } = node;
  const hasChildren = children && children.length > 0;
  const classNames = `level${level} flex`;
  const [editing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemoveClick = () => {
    handleRemove(id);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    if (editedLabel.trim() !== "") {
      handleUpdate(id, editedLabel);
    }
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLabel(event.target.value);
  };

  const handleAddClick = () => {
    handleAdd(id, ""); // Pass an empty label for the new node
    // setEditing(true);
  };

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <li>
      <span>
        <div className="flex">
          {editing ? (
            <>
              <input
                ref={inputRef}
                type="text"
                style={{
                  height: "25px",
                  width: "120px",
                  zIndex: 2,
                  outline: "none",
                }}
                value={editedLabel}
                onChange={handleInputChange}
                autoFocus
              />
              <div className="control-buttons">
                <button
                  onClick={handleSaveClick}
                  style={{ background: "green" }}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>
                  x
                </button>
              </div>
            </>
          ) : node.label === "" ? (
            <form onSubmit={handleSaveClick} className="flex">
              <input
                ref={inputRef}
                type="text"
                style={{
                  height: "25px",
                  width: "120px",
                  zIndex: 2,
                  outline: "none",
                }}
                value={editedLabel}
                onChange={handleInputChange}
                autoFocus
              />
              <div className="control-buttons">
                <button
                  type="submit"
                  onClick={handleSaveClick}
                  style={{ background: "green" }}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
                <button className="cancel-button" onClick={handleRemoveClick}>
                  x
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className={classNames}>{label}</div>
              <div className="control-buttons">
                <button onClick={handleAddClick}>+</button>
                {level !== 1 && (
                  <>
                    <button onClick={handleEditClick}>
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="remove-button"
                      onClick={handleRemoveClick}
                    >
                      x
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </span>
      {hasChildren && (
        <ul>
          {children?.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              handleUpdate={handleUpdate}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const HierarchyTree = () => {
  const [tree, setTree] = useState([
    {
      id: "1",
      label: "Node 1",
      children: [],
    },
  ]);

  const handleRemove = (id: string) => {
    const updatedTree = removeNode(id, tree);
    //@ts-ignore
    setTree(updatedTree);
  };

  const handleUpdate = (id: string, label: string) => {
    const updatedTree = updateNode(id, label, tree);
    //@ts-ignore
    setTree(updatedTree);
  };

  const handleAdd = (parentId: string, newLabel: string) => {
    const updatedTree = addNode(parentId, newLabel, tree);
    //@ts-ignore
    setTree(updatedTree);
  };

  const removeNode = (id: string, nodes: TreeNode[]): TreeNode[] => {
    return nodes.filter((node) => {
      if (node.id === id) {
        return false;
      } else if (node.children) {
        node.children = removeNode(id, node.children);
      }
      return true;
    });
  };

  const updateNode = (
    id: string,
    label: string,
    nodes: TreeNode[]
  ): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, label };
      } else if (node.children) {
        node.children = updateNode(id, label, node.children);
      }
      return node;
    });
  };

  const addNode = (
    parentId: string,
    newLabel: string,
    nodes: TreeNode[]
  ): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        const newNode: TreeNode = {
          id: `${parentId}.${
            (node.children?.length && node.children?.length + 1) || 1
          }`,
          label: newLabel,
          children: [], // Add an empty children array for the new node
        };
        if (node.children) {
          node.children.push(newNode);
        } else {
          node.children = [newNode];
        }
      } else if (node.children) {
        node.children = addNode(parentId, newLabel, node.children);
      }
      return node;
    });
  };

  return (
    <ul className="tree">
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={1}
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
        />
      ))}
    </ul>
  );
};

export default HierarchyTree;
