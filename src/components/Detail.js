import React, { Component } from 'react';
import Moment from 'moment';
import store from '../services/store';
import { getCountry } from '../services/actionCreators';
import { getForecast, separateDays, defaultCountry } from '../services/api';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {city: { id: defaultCountry}},
      days: [],
    };

    const storageID = localStorage.getItem('rd-weather');

    if (storageID) {
      this.getForecastObj(storageID);
      store.dispatch(getCountry(storageID));
    }

    store.subscribe(() => {
      const id = store.getState().id;
      this.getForecastObj(id)
    });

    this.getForecastObj(defaultCountry);
  }

  getForecastObj(id) {
    getForecast(id).then(response => {
      this.setState({
        item: response.data,
        days: separateDays(response.data.list),
      });
    });
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
