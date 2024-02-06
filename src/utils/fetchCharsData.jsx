import axios from "axios";

export const loadData = async (setdataFetched) => {
    const arrayOfCharacters = []
    //TODO: for i=1 to 74
    for (let i = 1; i < 5; i++) {
        const response = await axios.get(`https://narutodb.xyz/api/character?page=${i}`)
        const data = await response.data.characters;
        arrayOfCharacters.push(data);
    }
    arrayOfCharactersFlatered = arrayOfCharacters.flat();
    setdataFetched(arrayOfCharactersFlatered);
}
