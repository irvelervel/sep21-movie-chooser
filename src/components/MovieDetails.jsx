import { Component } from "react";
import { Card } from 'react-bootstrap'

// MovieDetails is going to actually perform the fetch for the selected movie details
// so MovieDetails needs to know which one is the selected movie!
// I'm receiving here a prop called movieTitle with this.props.movieTitle

class MovieDetails extends Component {

    state = {
        movieDetails: null
    }

    componentDidMount = async () => {
        console.log('componentDidMount triggered!')
        try {
            let response = await fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle)
            // the initial fetch is supposed to be http://www.omdbapi.com/?apikey=24ad60e9&s=Batman%20Begins
            if (response.ok) {
                // successfull fetch!
                let data = await response.json()
                console.log(data.Search[0])
                this.setState({
                    movieDetails: data.Search[0]
                    // data.Search[0] is an object!
                })
            } else {
                // something went wrong... :(
                console.log('an error happened in the fetch process')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        // render gets fired again every time there's a change in the state or in the props
        // not having a state yet, the only reason is going to be a props change
        console.log(this.props.movieTitle)
        return (
            <>
                {
                    this.state.movieDetails ? (
                        <Card>
                            <Card.Img variant="top" src={this.state.movieDetails.Poster} />
                            <Card.Body className="text-dark">
                                <Card.Title>{this.state.movieDetails.Title}</Card.Title>
                                <Card.Text>
                                    {this.state.movieDetails.Year} - {this.state.movieDetails.imdbID}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ) : <p>LOADING...</p>
                }
            </>
        )
    }
}

export default MovieDetails