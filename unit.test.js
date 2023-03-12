const conv=require('./converIntToRoman.js')
describe("test roman",()=>{
    it('should return a roman when arg beteen 1 et 100 ', function () {
        const arg=Math.floor(Math.random()*101)
        expect(conv.convertToRoman(arg)).not.toBe("Entrer un nbre entre 1 et 100")
    });
    it('should return the warning message', function () {
        expect(conv.convertToRoman(101)).toBe("Entrer un nbre entre 1 et 100")
    });
})