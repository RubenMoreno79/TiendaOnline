function sumar(num1, num2) {

    return num1 + num2;
}


describe('Test de pruebas', () => {

    it('que la funcion sumar devuelva un resultado', () => {
        const resultado = sumar(5, 3);
        expect(resultado).toBe(8);
        expect(sumar(7, 2)).toBe(9);
    });

});