export default function reducer(state, action) {
   switch (action.type) {
      case 'FETCH_DATA':
         return {...state, data: action.payload};
      case 'SEARCH':
         return {...state, searchQuery: action.payload};
      case 'FILTER':
         return {...state, filterBy: action.payload};
      case 'ADD_CART':
         return {...state, addToCart: [...state.addToCart, action.payload]};
      default:
         return state;
   }
}