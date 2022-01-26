import './App.css';
import {useEffect, useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import React from 'react';
function App() {
  const[pokemon,setPokemon]=useState({});
  const countRef= useRef(true);
  const[valor, setValor] = useState(1);
  const [name, setname] = useState("");

  const customStyles = {
    content: {
      background: 'rgba(0, 0, 0, 0.9)',
      color: '#fff',
     position: 'fixed',
      transition: 'all .5s',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
   
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  if (pokemon.id>0){
    countRef.current=false
  }
const fetchPokemon =(valor)=>{
  fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`)
.then((response)=>response.json())
.then((data)=> setPokemon(data));
};
useEffect(()=>{
  console.log({pokemon})
  console.log("dato"+countRef.current)
},[pokemon]);


const getRandomInt =(min =1,max=600)=>{
 setValor(Math.floor(Math.random()*(max-min)+min));
 
fetchPokemon(valor)
};

const next =()=>{ if((pokemon.id===600) || (isNaN(pokemon.id))){
  alert("El maximo es 600" );
  console.log(countRef.current)
  return pokemon.id=1
  
}else{
  return pokemon.id+1

} 
};
const back =()=>{if(pokemon.id===1 || (isNaN(pokemon.id))){
  alert("El minimo es 1" );
  return pokemon.id = 600;
}else{
  return pokemon.id - 1
} };
const Typename = ( event) => {
  setname(event.target.value);
};

const Search = () => {
  if (name !== "" && name  >=601 ) {
  alert("Pokemon no encontrado! ingrese otro Nombre o ID" );
  return fetchPokemon("1");
}else{

  return fetchPokemon(name)
} }; 
  return (
    <div className='color'>
    <div className="App">
      <header className="App-header">
        <div className='flex-container'>  
        <div className="search">
        <input type="text" onChange={Typename} value={name} placeholder='Buscar por nombre o ID'/>

        <button className="searchbutton" onClick={Search}> <FontAwesomeIcon className='icono' icon={faSearch}/></button>
        </div>
        
        <img src={pokemon?.sprites?.back_default ?? "https://cdn.streamloots.com/uploads/5e8e4245ecb3f00038dfdfc9/0266678b-a53e-4b74-8e23-06c3bb1cccf2.png"} alt="logo" className="poke-image"  />
        <img src={pokemon?.sprites?.front_default??"https://cdn.streamloots.com/uploads/5e553c848b251c002d741498/edf10688-62e5-4a36-b4a0-e78360df107e.png"} alt="logo" className="poke-image"   />
    
        </div>
        <div>
        <button className="button" hidden={countRef.current}  onClick={openModal}>Abilities</button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        ariaHideApp={false}
    >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{pokemon.name}</h2>
        <h3 ref={(_subtitle) => (subtitle = _subtitle)}>{'N°'+pokemon.id}</h3>
        <h4>Abilities:  </h4>
        <p>{pokemon.abilities?.map((ability) => <li>{ability.ability?.name}</li>)??"no hay datos"}</p>
          <button className="button" onClick={closeModal}>close</button>
      </Modal>
    </div>
        <p>{pokemon.name ??"No pokemon selected"}</p>
        <p>{pokemon.id ??"No pokemon selected"}</p>
        <div className='flex-container'>
          <button className="button"onClick={()=>fetchPokemon (back())}>Back</button>
          <button className="button"onClick={()=>getRandomInt()}>Random</button>
          <button className="button"onClick={()=>fetchPokemon (next())}>Next</button>
        </div>
        <a
          className="App-link"
          href="https://github.com/joce1112/POKEDEX_PWA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repository
        </a>
      </header>
    </div>
    </div>
  );
}

export default App;