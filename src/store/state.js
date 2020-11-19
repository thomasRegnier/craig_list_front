let state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    categories: [],
    favorites: JSON.parse(localStorage.getItem('favoris')) ||[],
    hidens: JSON.parse(localStorage.getItem('hidens')) ||[]

}
export default state