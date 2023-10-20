
export function calcOperation(slot1: number, slot2: number, operation: string | null) {
    let result
    switch (operation) {
        case "sum": result = slot1 + slot2; break;
        case "dif": result = slot1 - slot2; break;
        case "prod": result = slot1 * slot2; break;
        case "div": result = slot1 / slot2; break;
        default: result = 0; break;
    }

    return (result)
}