import C from "../constants";
export const openMenu = (event) => (dispatch) => {
    alert('open menu')

    dispatch({ type: C.OPEN_MENU });
}