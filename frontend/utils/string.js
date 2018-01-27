export const formatPrice = price=>{
    const str = price.toString().split(".");
    const wholePart = str[0];
    let decimalPart = str[1] || "00";
    while(decimalPart.length < 2){
        decimalPart += "0";
    }
    return `$${wholePart}.${decimalPart}`;
};