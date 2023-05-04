const uuid = () =>{
    const returnId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return returnId;
}

module.exports = uuid;