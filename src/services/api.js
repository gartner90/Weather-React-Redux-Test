import axios from 'axios';

const urlBase = 'https://api.openweathermap.org/data/2.5/';
const tokenParam = '&units=imperial&appid=480a3df3acbebf88f3edbf0663e5d40b';

const getDetail = (id) =>  {
	return axios.get(urlBase + 'weather?id=' + id + tokenParam);
}

const getForecast = (id) =>  {
	return axios.get(urlBase + 'forecast?id=' + id + tokenParam);
}

export { getDetail, getForecast };
