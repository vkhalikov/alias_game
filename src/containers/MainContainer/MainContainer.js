import React from 'react';
import './MainContainer.css';
import FillingLayout from '../../components/FillingLayout';
import SplitPanel from '../../components/SplitPanel';

const MainContainer = ({children}) => {
  const cards = [
    <img className="responsive-img" src="https://sun9-65.userapi.com/gQirypmYkpWFGelekpWXSxm3e3DuLA9NU8XVYw/yxZ22gQnIqE.jpg" alt=""/>,
    <img className="responsive-img" src="https://sun9-38.userapi.com/5HFQrJRKUF3WGHAbt_X9jtagaFl52n415FCl9w/YJfZTCC4ems.jpg" alt=""/>,
    <img className="responsive-img" src="https://sun9-52.userapi.com/-VvyrVaV9w9luVdoahMwMrLOit65Rl6H8QvpCw/72VIE4JnJcQ.jpg" alt=""/>,
    <img className="responsive-img" src="https://sun9-35.userapi.com/bkNdpspNGk9bPCo7-zLEIcSUrOJ4Pww9Nsb-zg/WqEDFQx_mRU.jpg" alt=""/>,
  ];

  return (
    <main className="MainContainer">
      <SplitPanel withDividers>
        {cards.map((item) => <FillingLayout component={item} />)}
      </SplitPanel>
    </main>
  );
}

export default MainContainer;
