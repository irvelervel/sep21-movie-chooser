import { Component } from "react";
import { Card } from 'react-bootstrap'

// MovieDetails is going to actually perform the fetch for the selected movie details
// so MovieDetails needs to know which one is the selected movie!
// I'm receiving here a prop called movieTitle with this.props.movieTitle

class MovieDetails extends Component {

    state = {
        movieDetails: null
    }

    getMovieData = async () => {
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

    componentDidMount = async () => {
        // 1) it's actually happening AFTER the initial render()
        // 2) we're guaranteed it's happening just ONCE for every component mounting
        // that's great because a fetch() is an EXPENSIVE operation
        // we want to execute it just the times we actually need it!
        console.log('componentDidMount triggered!')
        this.getMovieData()
    }

    // componentDidUpdate is a lifecycle method automatically triggered by React
    // over and over again every time there's a change in the state or in the props
    // of this component
    componentDidUpdate = (previousProps, previousState) => {
        // we're going to fall here every time there's a change in the STATE or in the PROPS
        // the solution is: calling getMovieData() not when we fall here because of a STATE change,
        // but only when there's a PROPS change

        // we can use previousProps and compare it to this.props
        // for detecting a prop change!
        if (previousProps.movieTitle !== this.props.movieTitle) {
            // it means the movieTitle changed!
            // it means that I selected a new option in the dropdown in App
            this.getMovieData() // <-- this will set the state!
            // if your componentDidUpdate doesn't have an if statement,
            // ...probably something's off
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