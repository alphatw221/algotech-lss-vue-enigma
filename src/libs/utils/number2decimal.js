

export function number2decimal(number, decimal_places){
    
    return (Math.floor((parseFloat(number) +0.0000001) * (10 ** decimal_places)) / 10 ** decimal_places)
}

