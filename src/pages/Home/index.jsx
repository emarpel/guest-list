import React, { useState, useEffect } from "react";
import './styles.css'
import { Card } from '../../components/Card'

export function Home() {
    const [guestName, setGuestName] = useState("");
    const [guests, setGuests] = useState([]);
    const [user, setUser] = useState({name: '', avatar: ''});
  
    function addGuests() {
      const newGuest = {
        name: guestName,
        time: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      setGuests((prevState) => [...prevState, newGuest]);
    }

    useEffect(() => {
      //OPÇÃO UTILIZANDO UMA FUNÇÃO ASSINCRONA DENTRO DO USE_EFFECT
      async function fetchData() {
        const response = await fetch('https://api.github.com/users/emarpel');
        const data = await response.json();

        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      }
      fetchData();

      //OPÇÃO SEM UTILIZAR FUNÇÃO ASSINCRONA
      /* fetch('https://api.github.com/users/emarpel')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      }) */
    }, []);
  
    return (
      <div className="container">
        <header>
          <h1>Lista de Convidados</h1>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="Foto de Perfil" />
          </div>
        </header>
        <input
          type="text"
          placeholder="Nome do Convidado"
          onChange={(e) => setGuestName(e.target.value)}
        />
        <button type="button" onClick={addGuests}>
          Confirmar
        </button>
  
        {
            guests.map(
                (guest) => (
                  <Card
                    key={guest.time}//UTILIZAR UMA KEY UNICA EX: UUID, RANDON OU HASH
                    name={guest.name} 
                    time={guest.time} 
                  />
                  )
            )
        }
      </div>
    );
}