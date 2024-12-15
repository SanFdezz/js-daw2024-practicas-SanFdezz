Array.prototype.calcularMedia = function() {
    if (this.length === 0) {
        return 'no se puede dividir entre 0';
    }
    for (let item of this) {
        if (typeof item !== 'number') {
            return 'solo se admiten números.'
        }
    }
    const suma = this.reduce((total, valorActual) => total + valorActual, 0);
    return suma / this.length;
};