// containers
const resultDiv = document.querySelector(".results-div");
const wordExtraInfo = document.querySelector(".word-extra-info");
const errorPopUp = document.querySelector(".error-dialog");
const errorText = document.querySelector(".error-message");
const closeErrorPopUpBtn = document.querySelector("#close-error-dialog");
// other
const wordInput = document.querySelector(".word-input");
const searchWord = document.querySelector("#search-meaning");
const wordText = document.querySelector(".word-text");
const meaningText = document.querySelector(".meaning-of-word-text");
const audioIconButton = document.querySelector("#audio-button");
const synonymesText = document.querySelector(".synonymes-text");
const antonymsDiv = document.querySelector(".word-info-antonym-div");
const synonymesTextDiv = document.querySelector(".word-info-syn-div");
const antonymesText = document.querySelector(".Antonymes-text");


const getResponse = async (word) => {
    if (word === " ")   {
        errorText.innerText = "Error! Invalid Input provided";
        errorPopUp.showModal();
        return;
    }
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    return await fetch(URL).then(
        (response) =>  response.json()
    )
    .then(
        (result) => JSON.stringify(result)
    )
    .then(
        (data) => JSON.parse(data)     // return parsed Javasript Object
    );
};


searchWord.onclick = async () => {
    const result = await getResponse(wordInput.value);
    if (result["title"] === "No Definitions Found")  {
        errorText.innerText = `${result["message"]}`;
        errorPopUp.showModal();
        return;
    }

    const pronounciation = new Audio(`${result["0"]["phonetics"]["1"]["audio"]}`);   // audio file on server
    const antonyms = `${result["0"]["meanings"]["0"]["antonyms"]}`;
    const synonyms = `${result["0"]["meanings"]["0"]["synonyms"]}`;

    console.log(antonyms);
    console.log(synonyms);
    wordText.innerText = `Meaning (${result["0"]["word"]})`;
    meaningText.innerText = `${result["0"]["meanings"]["0"]["definitions"]["3"]["definition"]}`;
    antonymsDiv.style.display = (antonyms === "") ? "none" : "block";
    resultDiv.style.display = "block";
    wordExtraInfo.style.display = "block";
    synonymesTextDiv.style.display = (synonyms === "" ) ? "none" : "block";
    antonymesText.innerText = `${antonyms}`;
    synonymesText.innerText = `${synonyms}`;

    audioIconButton.onclick = () => {
        audioIconButton.style.color = "rgb(43, 177, 255)";
        pronounciation.play();
    } 

}   


closeErrorPopUpBtn.onclick = () => {
    errorPopUp.close();
}


