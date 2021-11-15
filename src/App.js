import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Component } from 'react'

// we're going to create a movie chooser app
// it's going to hold a movie in a dropdown at the top
// and it's going to show its details in the bottom

// for remembering and keep track of the chosen movie
// we have to store the value of the <select> into the State of this component

// for getting a proper state object in a component, we should write it in the Class shape
// we need to convert App from being a functional component into a class-based one

class App extends Component {
  state = {
    movieTitle: 'Batman Begins',
  }

  render() {
    return (
      <div className="App pt-4">
        <Container>
          <Row>
            <Col>
              <h2>Choose a movie!</h2>
              <Form>
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={this.state.movieTitle}
                    onChange={(e) =>
                      this.setState({
                        movieTitle: e.target.value,
                      })
                    }
                  >
                    <option>Batman Begins</option>
                    <option>Wonder Woman</option>
                    <option>Man Of Steel</option>
                    <option>The Flash</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
