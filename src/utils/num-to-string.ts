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