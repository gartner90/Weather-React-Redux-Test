import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import List from './components/List';
import Detail from './components/Detail';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      selected: 5128581,
    }
  }

  componentDidMount() {
    if (localStorage.getItem('rd-weather')) {
      this.setState({selected: parseInt(localStorage.getItem('rd-weather'), 0)});
    }
  }

  setItem = (id) => {
    this.setState({
        selected: id,
    });

    localStorage.setItem('rd-weather', id);
  }
  
  render() {
    const { selected } = this.state;

    return (
      <div className="container-fluid">
        <Row>
          <Col sm={4} className="rd-side-left">
            <List
              setItem={this.setItem}
              selected={selected}
            />
          </Col>
          <Col sm={8}>
            { selected ? <Detail id={selected}  className="rd-item-content"/> : null }
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
