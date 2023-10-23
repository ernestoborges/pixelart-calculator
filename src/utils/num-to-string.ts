export function numberToDisplayString(number: number) {

    let answer = []
    let noDotAnswer = []
    let string = Math.abs(number).toString().split("")
    let noDotString = string.filter(s => s !== '.')

    let i = 0
    while (i <= noDotString.length && noDotAnswer.length < 8) {
        answer.push(string[i])
        if (string[i] !== ".") {
            noDotAnswer.push(string[i])
        }
        i++
    }

    return answer
}

export function displayLargeNumber(number: number) {


    let exp = Math.abs(number).toExponential().split("+").join("")

    let string = exp
    if (exp.length > 9) {
        let [valueL, valueR] = exp.split("e")
        let valueSlice = valueL.slice(0, 8 - valueR.length)
        string = valueSlice + "e" + valueR
    }

    return string
}