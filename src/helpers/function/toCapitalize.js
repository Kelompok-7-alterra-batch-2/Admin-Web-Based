export function toCapitalize(param) {
    let splitSpace = param.split(' ')

    let result = []

    for(let i = 0 ; i < splitSpace.length ; i++){

        let splitChar = splitSpace[i].split('')

        if(splitChar.length > 0 && typeof(splitChar[0]) === 'string') {
        let upFirst = splitChar[0].toUpperCase()
    
        splitChar.splice(0,1,upFirst)

        result.push(splitChar.join(''))

        }

    }

    return result.join(' ')

}
