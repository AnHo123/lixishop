function priceListFilter(state = [], action) {
  switch (action.type) {
    case "ADD_PRICE":
      let priceListItem = {};
      let priceList = [...state];
    //   console.log(action.payload.checked);
      switch (action.payload.value) {
        case "0-$5":
          priceListItem = { start: 0, end: 5 };
          break;
        case "$5-$10":
          priceListItem = { start: 5, end: 10 };
          break;
        case "$10-$20":
          priceListItem = { start: 10, end: 20 };
          break;
        case "Trên $20":
          priceListItem = { start: 20, end: 100 };
          break;
      }
      if (!priceList.includes(priceListItem) && action.payload.checked) {
        priceList.push(priceListItem);
      } else {
        // console.log("filter");
        priceList = priceList.filter(
          (price) =>
            price.start != priceListItem.start && price.end != priceListItem.end
        );
      }
      // console.log(priceList);
      return priceList;
  
    case "RESET":
      let newState = [];
      return newState;
    default:
      return state;
  }
}

export default priceListFilter;
