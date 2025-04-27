const calcEaseFactor = (EF , Q) => {
    const newEF =  EF + (0.1 - (5 - Q) * (0.08 + (5 - Q) * 0.02))
    return newEF > 1.3 ? newEF : 1.3
}

const calcInterval = (I , EF , Q) => {
    return Q >= 3 ? Math.ceil(I * EF) : 1
}

export  {calcEaseFactor , calcInterval}
