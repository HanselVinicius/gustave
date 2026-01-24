const getJson = {}


const result = getJson.data.map((item) => {
    console.log('id == ', item.id)
    return {
        songId: item.id
    }
});

console.log(JSON.stringify(result));