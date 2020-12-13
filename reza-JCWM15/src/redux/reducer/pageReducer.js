const INITIAL_STATE ={
    categories:[],
    job : [],
    users: [],
    loading: false,
}

export const pageReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories:action.payload
            }
        case "FETCH_JOB":
            return{
                ...state,
                job: action.payload
            };
        
        case "FETCH_USERS":
            return{
                ...state,
                users:action.payload
            }
        case "FETCH_DATA_USERS":
            return{
                ...state,
                users:action.payload
            }
            default:
                return state;
    }
}