module.exports = function checkProperty(product) {
    return !!(product._id && product.name && product.price && product.available);
};