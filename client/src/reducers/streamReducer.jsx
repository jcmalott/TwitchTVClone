import _ from "lodash";

export default (state = {}, action) => {
  // console.log(action.type);
  // console.log(action.payload);
  // console.log([action.payload.id]);

  switch(action.type){
    case "FETCH_STREAM":
      console.log("Fetch Stream reducer");
    // [ ] means that we don't know the name of the key yet
      return {...state, [action.payload.id]: action.payload}
    case "CREATE_STREAM":
      return {...state, [action.payload.id]: action.payload}
    case "EDIT_STREAM":
      return {...state, [action.payload.id]: action.payload}
    case "DELETE_STREAM":
      //Delete stream only returns a id
      return _.omit(state, action.payload);
    case "FETCH_STREAMS":
      console.log("Fetch streams reducer");
    //mayKeys takes an array and turns it into a object
    //id argument means take id from array and make it the key for each object
    //-the value is the rest of the data withn that single index of the array
      return {...state, ..._.mapKeys(action.payload, "id")}
    default:
     return state;
  }
}
