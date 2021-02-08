import React from 'react';
import './App.css';
import Information from './Components/Information';
import { stringToArray, extractData, countUniqueIps, countTopThreeUrls, countTopThreeIps } from './Utils/Helpers'

// eslint-disable-next-line import/no-webpack-loader-syntax
import log from "!!raw-loader!./Data/programming-task-example-data.log";

function App() {

  const reformatString = stringToArray(log)
  const extractValues = extractData(reformatString)

  const uniqueIps = countUniqueIps(extractValues)
  const topUrls = countTopThreeUrls(extractValues)
  const topIps = countTopThreeIps(extractValues)

  return (
    <div className="Outer-Container">
      <h1>
        Log Task
      </h1>
      <Information uniqueIps={uniqueIps} topUrls={topUrls} topIps={topIps} />
    </div>
  );
}

export default App;
