export const formatPrice = function (price) {
   return new Intl.NumberFormat().format(price);
};
// export const formatPrice = function (price) {
//    return new Intl.NumberFormat('en-EN', {
//       style: 'currency',
//       currency: 'EUR',
//    }).format(price);
// };
