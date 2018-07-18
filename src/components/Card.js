import React, { Component } from 'react';
import { getDetail } from '../services/api'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconSrc: '',
      detail: {},
    };

    getDetail(this.props.item.id).then(response => {
      this.setState({
        iconSrc: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`, 
        detail: response.data,
      });
    });
  }

  render() {
    const { item, setItem, selected } = this.props;
    const bgImage = `url(img/${item.id}.jpg)`;
    const { iconSrc, detail } = this.state;

    return (
      <div 
        className={`rd-card-content ${item.hide ? 'rd-card-hide' : ''}`}
      >
        <article
          className={`rd-card ${selected === item.id ? 'active' : ''}`}
          onClick={(num) => setItem(item.id)}
        >
          <div className="rd-card-bg" style={{backgroundImage: bgImage}}/>
          <div className="rd-card-name">
            <div className="rd-card-temp">
              <span className="rd-card-temp-int">
                {detail.main ? Math.trunc(detail.main.temp) : null}º
              </span>
              <span className="rd-card-temp-icon">
                {iconSrc &&
                  <img src={iconSrc} alt="icon"/>
                }
              </span>
            </div>
            <h2>{item.city}</h2>
          </div>
        </article>
      </div>
    );
  }
}

export default Post;
