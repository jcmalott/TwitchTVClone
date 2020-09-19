import streams from "../apis/streams";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: "SIGN_IN",
    payload: userId
  }
}

export const signOut = () => {
  return {
    type: "SIGN_OUT"
  }
}

//so we can access the database of streams
export const createStream = formValues => async (dispatch, getState) => {
  const {userId} = getState().auth;
  const response = await streams.post("/streams", {...formValues, userId});

  dispatch({type: "CREATE_STREAM", payload: response.data});
  history.push("/");
}

export const fetchStreams = () => async dispatch => {
  console.log("Fetch Streams");
  const response = await streams.get("/streams");

// console.log(response.data);
  dispatch({type: "FETCH_STREAMS", payload: response.data});
  // console.log("Fetched Items Called");
}

export const fetchStream = (id) => async dispatch => {
  console.log("Fetch Stream");
  const response = await streams.get(`/streams/${id}`);

  dispatch({type: "FETCH_STREAM", payload: response.data});
}

export const editStream = (id, formValues) => async dispatch => {
  //put replaces all params within object with those that are passed
  // const response = await streams.put(`/streams/${id}`, formValues);
  //patch will replace the values that are passed but not remove the ones in the object that were not
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({type: "EDIT_STREAM", payload: response.data});
  history.push("/");
}

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({type: "DELETE_STREAM", payload: id});
  history.push("/");
}
