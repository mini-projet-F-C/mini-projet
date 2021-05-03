var parfum = /** @class */ (function () {
    function parfum (marque, volume, prix) {
        this.marque = marque;
        this.volume = volume;
        this.prix = prix;
        
    }
    return parfum;
}());
function detailsparfum(parfum) {
    return   parfum.marque+ ", vol:"+parfum.volume+ ", prix: " + parfum.prix;
}
var parfum_1 = new parfum("Thee One ", "100ml", " 80.00 $");
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('datails_parfum_1').innerHTML = detailsparfum(parfum_1);
});
