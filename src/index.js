import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TreeStructure from './TreeStructure';
const data = [
  {
    Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
    Desktop: ["Screenshot1.jpg", "videopal.mp4"],
  },
  {
    Downloads: [
      {
        Drivers: ["Printerdriver.dmg", "cameradriver.dmg"],
        Applications: [
          "Webstorm.dmg",
          "Pycharm.dmg",
          "FileZila.dmg",
          "Mattermost.dmg",
        ],
      },
      "chromedriver.dmg",
    ],
  }
];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TreeStructure data={data}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
