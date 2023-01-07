import { useState, useEffect } from 'react';
import './App.css';
import TravBubble from './images/trav-bubble.png';
import KanyeWest from './images/kanye-west.png';
import SnoopDogg from './images/snoop-dogg.png';
import NickiMinaj from './images/nicki-minaj.png';
import Steve from './images/steve.png';
import Mario from './images/mario.png';
import Green from './images/green.png';
import Shadow from './images/shadow.png';
import God from './images/god.png';
import Fortune from './images/fortune.png';

function App() {

  const [search, setSearch] = useState('');
  const [response, setResponse] = useState('');
  const [background, setBackground] = useState('kanye_west');
  const [style, setStyle] = useState({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${KanyeWest})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"});

  const setArtist = (artist) => {
    console.log("setting artist to: " + artist)
    if(artist === 'Kanye') { setBackground('kanye_west');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${KanyeWest})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am Kanye West. Ask me a question.')}
    else if(artist === 'Snoop') { setBackground('snoope_dogg');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${SnoopDogg})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am Snoop Doggy Dogg, wuz poppin cuz') }
    else if(artist === 'Travis') { setBackground('travis_scott');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${TravBubble})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am Travis Scott. Ask me a question.') }
    else if(artist === 'Nicki') { setBackground('nicki_minaj');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${NickiMinaj})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am Nicki Minaj. Ask me a question.') }
    else if(artist === 'Steve') { setBackground('steve_from_minecraft');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Steve})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am Steve from Minecraft. Ask me a question.') }
    else if(artist === 'Mario') { setBackground('mario');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Mario})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am Mario. Ask me a question.') }
    else if(artist === 'Green') { setBackground('green_guy');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Green})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am the Green Guy. Ask me a question.') }
    else if(artist === 'Shadow') { setBackground('shadow');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Shadow})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am Shadow. Ask me a question.')  }
    else if(artist === 'God') { setBackground('god');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${God})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am God. Ask me a question.') }
    else if(artist === 'Fortune') { setBackground('fortune_teller');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Fortune})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('Hello, I am the Fortune Teller. Ask me a question.') }
  }

  const ask = async() => {
    console.log("ask pressed")
    console.log(search)
    let response = await fetch('http://localhost:5001/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: search, artist: background })
    })
    let data = await response.json();
    console.log(data.choices[0].text)
    setResponse(data.choices[0].text)
  }

  return (
    <div className="App">
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Kanye')}>Kanye</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Snoop')}>Snoop</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Travis')}>Travis</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Nicki')}>Nicki</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Steve')}>Steve</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Mario')}>Mario</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Green')}>Green</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Shadow')}>Shadow</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('God')}>God</button>
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Fortune')}>Fortune</button>
      <div style={style}></div>
      <input style={{opacity:"0.7",position:"fixed",top:"80%",width:"60%",left:"5%",height:"10%",fontSize:"10px",borderRadius:"2%",border:"10px solid lightgray",backgroundColor:"lightblue"}} type="text" value={search} placeholder={`Ask ${background} Anything...`} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={ask} style={{position:"fixed",top:"81%",width:"24%",left:"72%",fontSize:"40px",height:"10%",border:"10px solid lightgray"}}>🔥</button>
      <div style={{position:"fixed",left:"5%",top:"25%",height:"50%", fontSize:"25px",zIndex:"99",width:"40%"}}>{response}</div>
    </div>
  );
}

export default App;
