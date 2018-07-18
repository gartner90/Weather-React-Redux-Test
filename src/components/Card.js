import React, { Component } from 'react';
import { getDetail, defaultCountry } from '../services/api';
import { getCountry } from '../services/actionCreators';
import { connect} from 'react-redux';
import store from '../services/store';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: defaultCountry,
      iconSrc: '',
      detail: {},
    };

    getDetail(this.props.item.id).then(response => {
      this.setState({
        iconSrc: `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`, 
        detail: response.data,
      });
    });

    store.subscribe(() => {
      const id = parseInt(store.getState().id, 0);
      this.setState({id});
    });
  }

  render() {
    const { item, setItem } = this.props;
    const bgImage = `url(img/${item.id}.jpg)`;
    const { iconSrc, detail, id } = this.state;

    return (
      <div 
        className={`rd-card-content ${item.hide ? 'rd-card-hide' : ''}`}
      >
        <article
          className={`rd-card ${item.id === id ? 'active' : ''}`}
          onClick={() => setItem(item.id)}
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

const mapStateToProps = state => {
  return {
    id: state.id
  }
}

const mapdispatchToProps = (dispatch) => {
  return {
    setItem(id) {
      localStorage.setItem('rd-weather', id);
      dispatch(getCountry(id));
    }
  }
}

export default connect(mapStateToProps, mapdispatchToProps)(Post);
