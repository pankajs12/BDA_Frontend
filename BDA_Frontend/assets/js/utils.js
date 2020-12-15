const utils = {
 convertToCurrency(value){
  return value
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    .replace(".00", "");
},
calculateDiscount(salesPrice, msrpPrice) {
  return salesPrice - msrpPrice;
}




};
export default utils;
