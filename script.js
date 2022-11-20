const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disbale / Enable button

function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to voiceRss api
function tellMe(joke) {
  console.log("tell me", joke);
  VoiceRSS.speech({
    key: "3f711481b40e4eb3897b4b4261aa1165",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from api

async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.setup) joke = `${data.setup} ... ${data.delivery}`;
    else joke = data.joke;
    // Text-to-Speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    // Catch errors
    console.log("Whoops", error);
  }
}
// Calling jokes with button click
button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);
