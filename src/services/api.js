import axios from 'axios';

const urlBase = 'https://api.openweathermap.org/data/2.5/';
const tokenParam = '&units=imperial&appid=480a3df3acbebf88f3edbf0663e5d40b';

const defaultCountry = 5128581;

const getDetail = (id) =>  {
	return axios.get(urlBase + 'weather?id=' + id + tokenParam);
}

const getForecast = (id) =>  {
	return axios.get(urlBase + 'forecast?id=' + id + tokenParam);
}

const separateDays  = (array) =>  {
	let datesInjected = [];
  let forecast = [];

	array.forEach((obj) => {
    const date = obj.dt_txt.split(' ')[0];

    if (datesInjected.indexOf(date) < 0) {
      forecast.push(obj);
      datesInjected.push(date);
    }
  });

  return forecast;
}

export { getDetail, getForecast, separateDays, defaultCountry };
