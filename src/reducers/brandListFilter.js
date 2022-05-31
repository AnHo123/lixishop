function brandListFilter(state=[], action) {
    switch (action.type) {
        case 'ADD_BRAND':
            let brandList = [...state]
            if (!brandList.includes(action.payload.value) && action.payload.checked) {
                brandList.push(action.payload.value)
            } else {
                brandList = brandList.filter(brand => brand != action.payload.value)
            }
            console.log(brandList);
            return brandList;
        case 'RESET':
            return [];
        default:
            return state
    }
}

export default brandListFilter