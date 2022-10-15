import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import { useState, useEffect } from "react";
import Searchbar from "./Searchbar";

export const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [pokeDatafil, setPokeDatafil] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  let pokeList = [];

  useEffect(() => {
    const pokeFun = async () => {
      setLoading(true);
      const res = await axios.get(url);

      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);
      setLoading(false);
    };
    const getPokemon = async (res) => {
      res.map(async (item) => {
        const result = await axios.get(item.url);
        pokeList = [...pokeList, result.data];
        pokeList.sort((a, b) => (a.id > b.id ? 1 : -1));
        setPokeData((state) => {
          state = pokeList;
          return state;
        });
        setPokeDatafil((state) => {
          state = pokeList;
          return state;
        });
      });
    };

    pokeFun();
  }, [url]);
  const onSearch = async (input) => {
    if (input) {
      await axios
        .get(url + `/` + input)
        .then((res) => {
          setPokeData((state) => {
            state = [res.data];
            return state;
          });
        })
        .catch((err) => {
          console.error("Pokemon no encontrado");
        });
    } else {
      setPokeData((state) => {
        state = [...pokeDatafil];
        return state;
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <h1>LISTADO DE POKEMON</h1>

        <div>
          <Searchbar onSearch={onSearch} />
        </div>
      </nav>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};
export default Main;
