import * as TYPES from '../types'

const initialState = {
  pictures: [],
  picture: null,
  likes: [],
}

export default function (state = initialState, action) {

	const { type, payload } = action;

	switch(type){

		case TYPES.UPDATE_LIKES:

			let new_like = state.likes
			new_like.unshift(payload)

			return {
				...state,
				likes: new_like
			}

		case TYPES.SET_CURRENT_PICTURE:
			return {
				...state,
				picture: payload
			}

		default:
			return state
		}
}