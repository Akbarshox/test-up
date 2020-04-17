export default function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, data: action.payload };
    case 'SEARCH':
      return{ ...state, searchQuery: action.payload};
    default:
      return state;
  }
}