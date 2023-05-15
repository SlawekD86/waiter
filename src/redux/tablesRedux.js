import { API_URL } from "../config";

// Selectors
export const getTables = (state) => state.tables;
export const getTableById = (state, id) => state.tables.find((table) => table.id === id);

// Action names
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

// Action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });

// Fetch tables from the server
export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
  };
};

// Update table on the server
export const updateTableOnServer = (table) => {
  return (dispatch) => {
    fetch(`${API_URL}/tables/${table.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(table),
    })
      .then((res) => res.json())
      .then((updatedTable) => dispatch(editTable(updatedTable)));
  };
};

// Reducer
const tablesReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return state.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    default:
      return state;
  }
};

export default tablesReducer;
