import React,  { useState } from 'react';
import { Tree, Button } from 'antd';
import NODE_DATA from '../../utils/constant';
import { loop } from '../../utils/common';
import 'antd/dist/antd.css';
import '../../css/tree.css';

function NodeTree() {

  const [treeData, setTreeData] = useState(NODE_DATA);
  const [selectedNodeInfo, setSelectedNodeInfo] = useState(null);
  const [selectedCopyNode, setSelectedCopyNode] = useState([]);
  const [copyTreeNodeData, setCopyTreeNodeData ] = useState([]);

  const onSelect = (selectedKeys, info) => {
    setSelectedNodeInfo(info)
  };

  const handleDeleteNode = () => {
    const treeDataCopy =  treeData;
    const filterParentNodeData = treeDataCopy[0].children.filter((item) =>
      selectedNodeInfo.selectedNodes[0].isParent && item && selectedNodeInfo.selectedNodes[0].key !== item.key
    );
    treeDataCopy[0].children = [];
    treeDataCopy[0].children.push(filterParentNodeData[0]);
    setTreeData(treeDataCopy);
  };

  const handleCopyNode = () => {
    if (selectedNodeInfo && selectedNodeInfo.selectedNodes[0].isParent) {
      setSelectedCopyNode(selectedNodeInfo.selectedNodes);
    }
  };

  const handlePasteNode = () => {
    setCopyTreeNodeData(selectedCopyNode);
  };

  const onDragEnter = info => {
    console.log(info);
  };

  const onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const data = [...treeData];
    // Find dragObject
    let dragObj;

    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setTreeData(data);

  };

  return (
    <React.Fragment>
      <div className='container'>
        <div className='tree-content'>
          <Button type="primary" onClick={handleDeleteNode}>Delete Node</Button>
          <Button type="primary" onClick={handleCopyNode} style={{marginLeft: '20px'}}>Copy Node</Button>
          <p>Note: After deleting a node please reexpand the tree again</p>
          <Tree
            className='draggable-tree'
            onSelect={onSelect}
            treeData={treeData}
            draggable
            onDragEnter={onDragEnter}
            onDrop={onDrop}
          />
        </div>
        <div className='pasteBox'>
          <div className='pasteBoxHeader'>
            <h2>Paste Your Copied Node here</h2>
            <Button type="primary" onClick={handlePasteNode}>Paste Node</Button>
          </div>
          {copyTreeNodeData && copyTreeNodeData.length > 0 &&
            <Tree
              treeData={copyTreeNodeData}
            />
          }
        </div>
      </div>
    </React.Fragment>
  )
};

export default NodeTree;