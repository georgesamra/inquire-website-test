import './index.scss';


const getPassage = () => {
    
  console.log('Get Passage');
};

function BibleLinkButton() {
    return (
        <button onClick={getPassage}>Bible Link</button>
      );
  }

export default BibleLinkButton