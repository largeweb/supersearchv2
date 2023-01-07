import { useState, useEffect } from 'react';
import './App.css';
import TravBubble from './images/trav-bubble.png';
import MarkZuck from './images/mark.png';
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
  const [response, setResponse] = useState('Hello, I am Kanye West. Ask me a question.');
  const [background, setBackground] = useState('kanye west');
  const [fireColor, setFireColor] = useState('gray');
  const [fireDisabled, setFireDisabled] = useState(false);
  const [style, setStyle] = useState({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${MarkZuck})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"});
  const [resStyle, setResStyle] = useState({position:"fixed",left:"8%",top:"65%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"});

  const setArtist = (artist) => {
    console.log("setting artist to: " + artist)
    // KANYE WEST
    if(artist === 'Mark Zuck') { setBackground('mark zuck');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${MarkZuck})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("The metaverse has the potential to revolutionize the way we interact and experience the world. As someone who's passionate about connecting people, I'm excited to see where it takes us."); setResStyle({position:"fixed",left:"8%",top:"65%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"}) }
    // SNOOP DOGG
    else if(artist === 'Snoop') { setBackground('snoop dogg');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${SnoopDogg})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("Hey there, what's good? It's Snoop Dogg, and I'm here to bring the funk and the flow."); setResStyle({position:"fixed",left:"25%",top:"40%", fontSize:"10px",zIndex:"1",width:"40%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"}) }
    // TRAVIS SCOTT
    else if(artist === 'Travis') { setBackground('travis scott');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${TravBubble})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("Astroworld was my home, and it's where I fell in love with rap. That place will always have a special place in my heart."); setResStyle({position:"fixed",left:"8%",top:"58%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"}) }
    // NICKI MINAJ
    else if(artist === 'Nicki') { setBackground('nicki minaj');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${NickiMinaj})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("You're the king of the jungle now, and I'm your loyal subject. I'm Nicki Minaj, and I'll do everything in my power to make your stay here a royal one."); setResStyle({position:"fixed",left:"8%",top:"65%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"})}
    // STEVE FROM MINECRAFT
    else if(artist === 'Steve') { setBackground('steve from minecraft');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Steve})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("I can't wait to show off my new redstone contraption! It's going to revolutionize the world of Minecraft, you'll see."); setResStyle({position:"fixed",left:"8%",top:"48%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"})}
    // MARIO
    else if(artist === 'Mario') { setBackground('mario');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Mario})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("Mamma mia, those mushrooms are delizioso! I could eat them all day."); setResStyle({position:"fixed",left:"8%",top:"50%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"})}
    // GREEN GUY
    else if(artist === 'Green') { setBackground('green guy');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Green})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("Greetings! I'm the green guy, and I'm the caretaker of this spooky swamp. It may be a bit daunting to some, but it's a place of beauty and wonder to me."); setResStyle({position:"fixed",left:"8%",top:"55%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"})}
    // SHADOW PEOPLE
    else if(artist === 'Shadow') { setBackground('shadow people');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Shadow})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("Welcome to Shadow Man's Search Engine! How can I assist you in finding what you're looking for?") ; setResStyle({position:"fixed",left:"8%",top:"60%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"})}
    // GOD
    else if(artist === 'God') { setBackground('god');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${God})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse("I am the creator of all things, and I have a plan for your life. Trust in me, and I will guide you down the path that is best for you."); setResStyle({position:"fixed",left:"8%",top:"28%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"})}
    // FORTUNE TELLER
    else if(artist === 'Fortune') { setBackground('fortune teller');setStyle({left:"0",right:"0",top:"0",bottom:"0",position:"fixed",backgroundSize:"cover",backgroundImage:`url(${Fortune})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",zIndex:"-1"}); setResponse('I have the ability to see into the future and uncover hidden truths. Allow me to use my skills to help you navigate your path through life.'); setResStyle({position:"fixed",left:"8%",top:"55%", fontSize:"10px",zIndex:"1",width:"70%",background:"white",border:"5px solid gray",borderRadius:"10%",padding:"15px"})}
  }

  const ask = async() => {
    setFireDisabled(true)
    setFireColor('red')
    setResponse('Thinking...')
    console.log("ask pressed")
    console.log(search)
    let response = await fetch('http://170.187.159.180:5001/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: search, artist: background })
    })
    let data = await response.json();
    console.log(data.choices[0].text)
    setResponse(data.choices[0].text)
    setFireColor('gray')
    setFireDisabled(false)
  }

  return (
    <div className="App">
      <button style={{top:"20%",left:"5%",opacity:"0.8",backgroundColor:"cyan",borderRadius:"10%",fontSize:"150%",height:"10%",width:"20%"}} onClick={(e) => setArtist('Mark Zuck')}>Mark</button>
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
      <input style={{opacity:"0.7",position:"fixed",top:"80%",width:"60%",left:"5%",height:"6%",fontSize:"12px",borderRadius:"2%",border:"10px solid lightgray",backgroundColor:"lightblue",zIndex:"3"}} type="text" value={search} placeholder={`Ask ${background} Anything...`} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={ask} style={{position:"fixed",top:"79%",textAlign:"center",width:"20%",left:"72%",fontSize:"30px",height:"8%",border:"10px solid lightgray",backgroundColor:`${fireColor}`,opacity:"0.7",zIndex:"3"}}>🔥</button>
      <button onClick={(e) => setSearch('')} style={{position:"fixed",textAlign:"center",top:"87%",width:"17%",left:"72%",fontSize:"20px",height:"6%",border:"10px solid lightgray",backgroundColor:"white",opacity:"0.7",zIndex:"3"}}>🔁</button>
      <div style={resStyle}>{response}</div>
    </div>
  );
}

export default App;
