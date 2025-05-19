const lib = require('../lib')

describe('absolute',()=>{
    it('should return a positive number if input is positive', () => {
        const result=lib.absolute(1)
        expect(result).toBe(1)
    })
    
    it('should return a positive number if input is negative', () => {
        const result=lib.absolute(-1)
        expect(result).toBe(1)
    })
    
    it('should return 0 if input is 0', () => {
        const result=lib.absolute(0)
        expect(result).toBe(0)
    })
})

describe('greet',()=>{
    it('should return a greeting message', () => {
        const result=lib.greet('Haroon')
        // expect(result).toBe("Hello Haroon")
        expect(result).toMatch(/Haroon/)
    })
}) 

describe('getCurrencies',()=>{
    it('should return supported currencies', () => {
        const result=lib.getCurrencies()
         
        // To general
        expect(result).toBeDefined()
        expect(result).not.toBeNull()
        
        // To Specific
        expect(result[0]).toBe('USD')
        expect(result[1]).toBe('AUD')
        expect(result[2]).toBe("EUR")
        expect(result.length).toBe(3)

        // Proper way
        expect(result).toContain('AUD')
        expect(result).toContain("EUR")
        expect(result).toContain('USD')

        // Ideal Way
        expect(result).toEqual(expect.arrayContaining(['USD','AUD','EUR']))
    })
})

 