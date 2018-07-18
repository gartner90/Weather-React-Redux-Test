import { createStore } from 'redux';

const reducer = (state, action) => {
	
	if (action.type === 'SELECT_CITY') {
		state.id = action.id;
	}

	return state;
};

export default createStore(reducer, {id: 0});
