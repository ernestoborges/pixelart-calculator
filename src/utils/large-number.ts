export function largeNumberCheck(number: number) {

    let isLarge = false

    if (number < 1 && number > -1 && number !== 0) {
        let trunk = Math.abs(number).toString().split(".")[1]
        let zero = false
        let i = 0
        while (i < 8 && !zero) {
            if (trunk[i] !== "0") {
                zero = true
            }
            i++
        }
        if (i >= 8) {
            isLarge = true
        }
    } else {

        let trunk = Math.trunc(number)
        let string = trunk.toString()
        let size = string.length

        if (trunk !== number) {
            size++
        }

        if(size > 8){
            isLarge = true
        }

    }
    return isLarge
}