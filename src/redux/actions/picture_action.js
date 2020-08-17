import {nasa_api_instance, backend_api_instance} from "../../utility/axios"

const { REACT_APP_NASA_API_KEY } = process.env;

export const getRemotePicture = (date) => async dispatch => {
    return nasa_api_instance.get(`/planetary/apod?api_key=${REACT_APP_NASA_API_KEY}&date=${date}`)
}

export const getPictures = (request_body) => async dispatch => {
    return backend_api_instance.get('/pictures')
}