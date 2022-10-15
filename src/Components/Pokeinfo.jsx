import React from "react";

const Pokeinfo = ({ data }) => {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
        <div className="card-info">

          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
            alt=""
          />
          <h1>{data.id}#</h1>
          <h1>{data.name}</h1>
          <div className="type">
            {data.types.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>Tipo</h2>
                    <div>
                      <h3>{poke.type.name}</h3>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <br></br>
          <h2>Peso</h2>
          <div>
            <h3>{data.weight} Kg</h3>
          </div>
          <br></br>
          <h2>Sprites</h2>
          <div className="group-spice">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`}
              alt=""
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png`}
              alt=""
            />
          </div>

          <div className="abilities">
            {data.abilities.map((poke) => {
              return (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              );
            })}
          </div>
          </div>
        </>
      )}
    </>
  );
};
export default Pokeinfo;
