const initialState = {
	searchQuery: '',
	filterBy: 'all'
}
const reducer = (state = initialState, action) => {
	switch(action.type){
		case 'SET_QUERY':
			return {
				...state,
				searchQuery: action.payload,
			};
		case 'SET_FILTER':
			return{
				...state,
				filterBy: action.payload
			}	
	}
		return state;
} 
export default reducer;