import {
	COLLEGE_GET_PROFILE,
	COLLEGE_PROFILE_ERROR,
	COLLEGE_CLEAR_PROFILE,
	COLLEGE_GET_PROFILES,
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case COLLEGE_GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case COLLEGE_GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			};
		case COLLEGE_PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null
			};
		case COLLEGE_CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false
			};

		default:
			return state;
	}
}
