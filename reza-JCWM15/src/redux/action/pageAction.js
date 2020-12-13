import Axios from 'axios'
import { api_url } from '../../helpers/api_url'

export const fetchJobAction = (data) => {
    return (dispatch) => {
        Axios.post(`${api_url}/job`, {data})
        .then((res) => {
            dispatch(
                fetchJobList()
            )
        })
        .catch((err) => {
        })
    }
}

export const fetchJobList = () => {
    return(dispatch) => {
        Axios.get(`${api_url}/job`)
        .then((res) => {
            dispatch({
                type: "FETCH_JOB",
                payload: res.data
            })
        })
        .catch((err) =>{})
    }
}

export const fetchAddData = (nama, usia, pekerjaan, categoryID) => {
    return (dispatch) => {
        Axios.post(`${api_url}/users`,{nama, usia, pekerjaan, categoryID})
        .then((res) => {
            dispatch(
                fetchDataUsers(),
                {
                type: "FETCH_USERS",
                payload:res.data
            })
        })
    }
}
 export const fetchDataUsers = () => {
     return (dispatch) =>{
         Axios.get(`${api_url}/users`)
         .then((res) => {
             dispatch({
                 type:"FETCH_DATA_USERS",
                 payload:res.data
             })
         })
     }
 }

 export const deleteAction = (id) => {
     return (dispatch) => {
         Axios.delete(`${api_url}/users/${id}`)
         .then((res) => {
             dispatch(fetchDataUsers())
         })
         .catch ((err) => {
             console.log(err)
         })
     }
 }

 export const deleteAllAction = () => {
     return (dispatch) => {
        Axios.get(`${api_url}/users`)
        .then((res) => {
            res.data.forEach((val)=> {
                Axios.delete(`${api_url}/users/${val.id}`)
                .then((res) => {
                    dispatch(fetchDataUsers())
                })
                .catch((err) => {
                    console.log(err)
                })       
            })
        })
        .catch ((err) => {
            console.log(err)
        })
     }
 }

 export const deleteJob = (id) => {
     return (dispatch) => {
         Axios.delete(`${api_url}/job/${id}`)
         .then((res) => {
             dispatch(fetchDataUsers())
         })
         .catch ((err) =>{
             console.log(err)
         })
     }
 }
 
 export const deleteAllJob = () => {
     return (dispatch) => {
         Axios.get(`${api_url}/job`)
         .then((res) => {
             res.data.forEach((val)=>{
                 Axios.delete(`${api_url}/job/${val.id}`)
                 .then((res) => {
                     dispatch(fetchDataUsers())
                 })
                 .catch((err) => {
                     console.log(err)
                 })
             })
         })
     }
 }

 export const filterCategories = () => {
     return (dispatch) => {
         Axios.get(`${api_url}/categories`)
         .then((res) => {
             dispatch({
                 type:"FETCH_CATEGORIES",
                 payload: res.data
             })
         })
         .catch((err) => console.log(err))
     }
 }

 export const fetchCategory = (id) => {
     return (dispatch) => {
         if (id === 0){
             dispatch(fetchDataUsers())
         } else {
             Axios.get(`${api_url}/products?categoryID=${id}`)
             .then((res)=> {
                 dispatch({
                     type:"FETCH_USERS",
                     payload:res.data
                 })
             })

         }
     }
 }


 export const editData = (id) => {
     return (dispatch) => {
         Axios.patch(`${api_url}/users/${id}`)
         .then((res) => {
             dispatch (fetchDataUsers())
         })
         .catch ((err) =>{
             console.log(err)
         }) 
     }
 }