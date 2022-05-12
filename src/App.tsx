import React from 'react';
import './App.css';

import { AutoComplete } from './components/AutoComplete/AutoComplete';

function App() {
  return (
      <>
        <h2>Auto Complete (functional component + typescript)</h2>

        <h3>Dummy Data</h3>
        <AutoComplete fetchDataType="dummy" />

        <h3>Live Data</h3>
        <AutoComplete fetchDataType="live" />
      </>
  );
}

// @ts-ignore
export default App;