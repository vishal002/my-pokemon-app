import React from 'react';
import fetch from 'isomorphic-fetch';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pokemonList: [],
            loading: false,
            currentPage: 1
        };
        this.getData = this.getData.bind(this);
        this.handleIncrementChange = this.handleIncrementChange.bind(this);
        this.handleDecrementChange = this.handleDecrementChange.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        this.setState({loading: true});
        fetch('https://pokeapi.co/api/v2/pokemon/'+ this.state.currentPage)
            .then(response => response.json())
            .then(
                function (data) {
                    let pokemonList = {};
                    pokemonList.pokeID = data.id;
                    pokemonList.pokeName = data.name;
                    pokemonList.pokeFrontImg = data.sprites.front_default;
                    return pokemonList;
                }
            )
            .then(pokemonList => this.setState({pokemonList, loading:false}));
    }

    render(){
        const {pokemonList, loading} = this.state;
        return (loading)?
            <div>Loading Pokemons...</div>:
            (Object.keys(pokemonList)> 0) ?
                <div>No Pokemon Found</div>:
                <div className="container">
                    <div className="card">
                        <img src={pokemonList.pokeFrontImg} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{pokemonList.pokeName}</h5>
                            <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-secondary"
                                        disabled={this.state.currentPage === 1}
                                        onClick={this.handleDecrementChange} >Previous</button>
                                <button type="button" className="btn btn-secondary"
                                        onClick={this.handleIncrementChange}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
    }

    handleIncrementChange(){
        this.setState({currentPage : this.state.currentPage+1});
        this.getData();
    }

    handleDecrementChange(){
        this.setState({currentPage : this.state.currentPage-1});
        this.getData();
    }
}

export default Dashboard;