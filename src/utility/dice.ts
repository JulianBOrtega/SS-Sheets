export const getSuccessLevel = (diceResult: string) => {
    const result = +(diceResult.split('= ')[1]);

    if(result <= 9) return 'Fallo'
    else if (result < 16) return 'Exito parcial'
    else return 'Exito!'
}

export const getSuccessColor = (diceResult: string) => {
    const r = getSuccessLevel(diceResult);

    if(r == 'Fallo') return 'red'
    else if (r == 'Exito parcial') return 'white'
    else return 'green'
}