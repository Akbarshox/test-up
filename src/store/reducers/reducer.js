export default function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}