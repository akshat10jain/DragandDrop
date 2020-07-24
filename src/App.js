import React from 'react';
import NodeTree from './components/tree';
import './css/main.css';

function App() {
    return (
       <React.Fragment>
         <h1 className="header">Node Tree Drag and Drop</h1>
         <NodeTree />
       </React.Fragment>
    );
}

export default App;
