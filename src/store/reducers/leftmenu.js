import C from "../../constants";

const initialState = {
  menuState: false,
};

export default (state, action) => {
  switch (action.type) {
    case C.MENU_OPEN:
      return {
        menuState: true
      };
    default:
      return state || initialState;
  }
};