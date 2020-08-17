import * as TYPES from '../types'

const initialState = {
  pictures: [],
}

export default function (state = initialState, action) {

	const { type, payload } = action;

	switch(action.type){

		case TYPES.FAVORITE_PICTURES:
			return {
				...state,
				auth: payload
			}

		default:
			return state
		}
}