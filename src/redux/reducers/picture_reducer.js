import * as TYPES from '../types'

const initialState = {
	likes: [],
	pictures: [],
	loading: false,
	picture: null,
	no_record: false,
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

		case TYPES.LOADING:
			return {
				...state,
				loading: payload
			}

		case TYPES.UPDATE_PICTURES:
			return {
				...state,
				pictures: payload
			}

		default:
			return state
		}
}