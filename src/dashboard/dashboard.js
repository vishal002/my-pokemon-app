import React from 'react';
import fetch from 'isomorphic-fetch';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            pokemonList: [],
            loading: false
        };
    }

    componentDidMount(){
        this.setState({loading: true});
        fetch('https://pokeapi.co/api/v2/pokemon/ditto/')
            .then(response => response.json())
            .then(json => json.map(pokemon => pokemon.game_indices))
            .then(pokemonList => this.setState({pokemonList, loading:false}));
    }

    render(){
        const {pokemonList, loading} = this.state;
        return (loading)?
            <div>Loading Pokemons...</div>:
            (!pokemonList.length) ?
                <div>No Pokemon Found</div>:
                <select>
                    {pokemonList.map(
                        (x,i) => <option key={i}>{x}</option>
                    )}
                </select>
    }
}

export default Dashboard;