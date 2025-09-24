import { useEffect } from 'react';
import './App.scss';
// import InquireButton from './InquireButton';
// import BibleLinkButton from './BibleLinkButton';
import React from 'react';


function InquireButton() {
   const [data, setData] = React.useState(null);
   const [link, setLink] = React.useState("https://www.bible.com/bible/111/GEN.1.NIV");
  
   async function GetBook() {
      const data = await fetch('http://localhost:3001/passage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "scripturetype": "chapter" 
          })
      });
      const jsonOut = await data.json();
      setData(jsonOut.book);
      setLink(jsonOut.link);
    }

    function OpenLink() {
      window.open(link, '_blank');
    }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={GetBook}>Inquire</button>
          <p>{ data }</p>
          <button onClick={OpenLink}>Bible Link</button>
        </div>
      </header>
    </div>
  );
}

function App() {
  

  return (
    <div>
      <div id="title">Inquire</div>
      <div id="generator-container" className="flex-container">
        <InquireButton /*kind='inquire'*/></InquireButton>
      </div>
    </div>
  );
}


export default App
