export const getMenuState = () => {
    const state = localStorage.getItem("MENU_IS_OPEN");
    if(state === null || state === undefined) {
        localStorage.setItem("MENU_IS_OPEN", 'true')
        return true;
    } else {
        return state === 'true';
    }
}

export const setMenuState = () => {
    const state = (localStorage.getItem("MENU_IS_OPEN") === 'true');
    localStorage.setItem('MENU_IS_OPEN', !state);
};

