export const formattedDataFromFirebase = (data) => {
    const list = []
    for (const key in data) {
        const obj = data[key].data; 
        list.push(obj)
    }

    return list;
}

export const guidGenerator = () => {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}