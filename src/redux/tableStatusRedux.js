import { API_URL } from "../config";

// Selectors
export const getStatusList = (state) => state.tableStatus;

// Action names
const createActionName = (actionName) => `app/status/${actionName}`;
const UPDATE_STATUS = createActionName('UPDATE_STATUS');

// Action creators
export const updateStatus = (payload) => ({ type: UPDATE_STATUS, payload });

// Fetch status from the server
export const fetchStatus = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tableStatus`)
      .then((res) => res.json())
      .then((tableStatus) => dispatch(updateStatus(tableStatus)))
      .catch((error) => {
        // Handle error
        console.error('Error fetching status:', error);
      });
  };
};

// Reducer
const tableStatusReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return [...action.payload];
    default:
      return state;
  }
};

export default tableStatusReducer;
