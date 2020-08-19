import {nasa_api_instance, backend_api_instance} from "../../utility/axios"
import * as TYPE from "../types"
import store from "../store"

import moment from 'moment'

const { REACT_APP_NASA_API_KEY } = process.env;

const getRemotePicture = async (date) => {
    
    const nasa_api_response = await nasa_api_instance.get(`/planetary/apod?api_key=${REACT_APP_NASA_API_KEY}&date=${date}`)
    
    if(nasa_api_response.data.length != 0){
        await save(nasa_api_response.data)
    }
    else {
        store.dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: {title: "fkdjfkdfj"}})
    }
}

async function save (record) {
    record['favorite'] = false
    const backend_api_response = await backend_api_instance.post(`/pictures`, record)
    if(backend_api_response.data.length != 0){
        store.dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: record})
    }
}


const findOrCreate = async (date) => {

    const backend_api_response = await backend_api_instance.get(`/pictures?date=${date}`);
    
    if(backend_api_response.data.length != 0){
        store.dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: backend_api_response.data[0]})
    }
    else {
        getRemotePicture(date)
    }




    // .then(response => {
    //     if(response.data.length != 0){
    
    //     }
    //     else {
    //         getRemotePicture(date)
    //     }
    // })
}

export const loadDatabase = () => async dispatch => {

    const current_date = moment("2020-08-12").format("YYYY-MM-DD")

    const backend_api_response = await backend_api_instance.get(`/pictures`);
    
    if(backend_api_response.data.length != 0){
        const records = backend_api_response.data;

        records.map((record, index) => {
            if(record.favorite === true){
                dispatch({type: TYPE.UPDATE_LIKES, payload: record})
            }
        })

        const todays_record =  records.find(record => record.date === current_date)
        
        if(todays_record){
            dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: todays_record})
        }
        else {
            await getRemotePicture(current_date)
        }
    }
    else {
        await getRemotePicture(current_date)
    }
}

export const getPicture = (date) => async dispatch => {

    const backend_api_response = await backend_api_instance.get('/pictures?date=' + date);
    
    if(backend_api_response.data.length != 0){
        console.log(backend_api_response.data)    
    }
    else {
        
        const nasa_api_response = await nasa_api_instance.get(`/planetary/apod?api_key=${REACT_APP_NASA_API_KEY}&date=${date}`)
    
        if(nasa_api_response.data.length != 0){
            await save(nasa_api_response.data)
        }
        else {
            
        }
    }
    
}

export const getPictures = (request_body) => async dispatch => {
    return backend_api_instance.get('/pictures')
}

export const likePicture = (request_body) => async dispatch => {
    const record = request_body
    record['favorite'] = true
    backend_api_instance.patch('/pictures/' + record.id, record)
    .then(response => {
        dispatch({type: TYPE.UPDATE_LIKES, payload: response.data})
        console.log(response.data, "fkvdfj")
    })
}

export const disPicture = (request_body) => async dispatch => {
    const record = request_body
    record['favorite'] = false
    backend_api_instance.patch('/pictures/' + record.id, record)
    .then(response => {
        console.log(response.data)
        dispatch({type: TYPE.UPDATE_LIKES, payload: response.data})
    })
}

export const getNextDate = (date) => async dispatch => {
    const new_date = moment(date).add(1, 'day').format("YYYY-MM-DD")
    findOrCreate(new_date)
}

export const getPrevDate = (date) => async dispatch => {
    const new_date = moment(date).subtract(1, 'day').format("YYYY-MM-DD")
    findOrCreate(new_date)
}

