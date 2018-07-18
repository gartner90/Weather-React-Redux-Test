import React, { Component } from 'react';
import Card from '../components/Card';
import cities from '../services/cities.json'

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: cities,
    };
  }

  filterList(event) {
    let updatedList = cities;

    updatedList = updatedList.filter((item) => {
      return item.city.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });

    this.setState({cities: updatedList});
  }

  render() {
    const { setItem, selected } = this.props;
    const { cities } = this.state

    const Cities = cities.map((item, i) => (
      <Card
        item={item}
        setItem={setItem}
        selected={selected}
        key={i}
      />
    ));

    return (
      <section className="sidebar-container">
        <input type="text" className="form-control form-control-lg rd-city-filter" placeholder="City" onChange={(event) => this.filterList(event)}/>
        <div className="rd-posts-content">
          {Cities}
        </div>
      </section>
    );
  }
}

export default List;
