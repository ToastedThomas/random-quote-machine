import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  //declaring state variable to manage component
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentText, setCurrentText] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [randInt, setRandomInt] = useState(0); 
  const [randColorInt, setRandColor] = useState(0);
  const [tweetURL, setTweetURL] = useState("");
  const colors = [
    "#57a8a8",
    "#57a862",
    "#a89557",
    "#a85a57",
    "#5f57a8",
    "#a857a1",
    "#998a98",
    "#1168ef",
    "#dd2828",
    "#dd4b28",
    "#ddb828",
    "#8ddd28",
    "#53dd28",
    "#28dd7a",
    "#28ddac",
    "#2888dd",
    "#8028dd",
    "#dd28a4",
    "#dd283f"
  ]

  //function to set random integer and update the quote
  const newInteger = () => {
    if (data && data.length > 0) {
      setRandomInt(Math.floor(Math.random() * data.length));
      setRandColor(Math.floor(Math.random() * colors.length));
    }
  }

  //effect to update quote based on random index
  useEffect(() => {
    if (data && data.length > 0 && randInt !== null) {
      setCurrentText(data[randInt].text);
      setCurrentAuthor(data[randInt].author);
    }
  }, [randInt, data]);

  //effect for logging and updating tweetURL
  useEffect(() => {
    console.log(randInt, currentText, currentAuthor)
    setTweetURL(() => {
      const tweetText = encodeURIComponent(`"${currentText}" - ${currentAuthor}`);
      return `https://twitter.com/intent/tweet?text=${tweetText}`
    })
  }, [currentText]);

  //effect for calling newInteger after data has loaded
  useEffect(() => {
    if (!loading && data.length > 0) {
      newInteger(); // call new quote after data is loaded
    }
  }, [loading, data]);

  //useEffect hook to fetch data when the component mounts
  useEffect(() => {
    //defining an async function to fetch the data
    const fetchData = async () => {
      try {
        const res = await fetch("https://programming-quotes-api.azurewebsites.net/api/quotes?page=1&quotesPerPage=100" , { cache: "force-cache" });

        const result = await res.json();
        setData(result); //storing the fetched data in the state
        console.log(result);
      } catch (err) {
         console.log("Error retrieving data: ", err)
      } finally {
        setLoading(false);
      }
    };

    fetchData(); //call the fetchData
  }, []); //an empty dependency array ensures this runs only once after component mounts

  if (loading) return <div className="loading">Loading quotes...</div>;

  return (
    <div>
      <h2 className="title">Programming Quote Machine</h2>
      <div className="quoteBox">
        <i className="fa-solid fa-quote-left" style={{color:colors[randColorInt]}} />
        <span style={{color:colors[randColorInt]}}>{currentText}</span>
        <i className="fa-solid fa-quote-right" style={{color:colors[randColorInt]}} />
        <p className="author" style={{color:colors[randColorInt]}} >- {currentAuthor}</p>
        <button className="quoteBtn" onClick={newInteger} style={{backgroundColor:colors[randColorInt]}}>New Quote</button>
        <a href={tweetURL} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-x-twitter" style={{color:colors[randColorInt]}} />
        </a>
      </div>
    </div>
  );
}

export default App;
