import React, { Component } from 'react';
import { getForecast } from '../services/api';
import Moment from 'moment';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {city:{id:0}},
      days: [],
    };
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  getData() {
    if (this.props.id !== this.state.item.city.id) {
      getForecast(this.props.id).then(response => {
        let datesInjected = [];
        let forecast = [];

        response.data.list.forEach((obj) => {
          const date = obj.dt_txt.split(' ')[0];

          if (datesInjected.indexOf(date) < 0) {
            forecast.push(obj);
            datesInjected.push(date);
          }
        });

        this.setState({
          item: response.data,
          days: forecast,
        });
      });
    }
  }

  render() {
    const { item, days } = this.state;
    const daysRender = days.map((item, i) => (
      <div
        className="rd-days-item"
        key={i}
      >
        <h4>{Moment(item.dt_txt).format('dddd Do')}</h4>
        <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="icon" className="rd-days-icon"/>
        <div className="rd-days-temp">
          Min: {Math.trunc(item.main.temp_min)}º - Max: {Math.trunc(item.main.temp_max)}º
        </div>
      </div>
    ));

    return (
      <article>
        {item.city &&
          <div>
            <h2>{item.city.name}</h2>
            <div className="rd-days-content">
              {daysRender}
            </div>
          </div>
        }
      </article>
    );
  }
}

export default Detail;
