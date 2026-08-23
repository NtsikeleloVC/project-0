const codeInput = document.getElementById("code-input");
const language = document.getElementById("language");
const personality = document.getElementById("personality");
const roastButton = document.getElementById("roast-code");

roastButton.addEventListener("click", function () {

    const code = codeInput.value;
    const selectedLanguage = language.value;
    const selectedPersonality = personality.value;

    document.getElementById("roast-message").textContent =
    "Bro... this code is going to need some serious help. 💀";

    console.log("Code:", code);
    console.log("Language:", selectedLanguage);
    console.log("Personality:", selectedPersonality);


});

