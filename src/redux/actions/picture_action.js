import {nasa_api_instance, backend_api_instance} from "../../utility/axios"

const { REACT_APP_API_KEY } = process.env;

export const getRemotePicture = (request_body) => async dispatch => {
    return nasa_api_instance.get('/pictures')
}

export const getPictures = (request_body) => async dispatch => {
    return backend_api_instance.get('/pictures')
}