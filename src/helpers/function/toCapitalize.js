export function toCapitalize(param) {

    let split = param.split('')

    let upFirst = split[0].toUpperCase()
    
    split.splice(0,1,upFirst)

    return split

}