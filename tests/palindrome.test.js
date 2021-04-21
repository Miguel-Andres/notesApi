const {palindrome} = require("../utils/for_testing")


test("palindrome of MiguelAndres",()=>{
    const result = palindrome("carro")

    expect(result).toBe("orrac")
})

test( "palindrome Fof empty string", ()=>{
    const result =palindrome("")

    expect(result).toBe("")
})

test( "palindrome of undefined", () =>{
    const result = palindrome(undefined)

    expect(result).toBeUndefined()
})