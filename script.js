document.getElementById("inputText").addEventListener("input", updateCounts);

function updateCounts() {
  const text = document.getElementById("inputText").value;
  countCharacters(text);
  countCharactersNoSpaces(text);
  countWords(text);
  countSentences(text);
  countParagraphs(text);
  avgWordLength(text);
  calculateReadingTime(text);
}

function countCharacters(text) {
  const count = text.length;
  document.getElementById("charCount").innerText = `${count}`;
}

function countCharactersNoSpaces(text) {
  const count = text.replace(/\s/g, "").length;
  document.getElementById("charCountNoSpaces").innerText = ` ${count}`;
}

function countWords(text) {
  const count = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;
  document.getElementById("wordCount").innerText = `${count}`;
}

function countSentences(text) {
  const sentences = text
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim().length > 0);
  const count = sentences.length;
  document.getElementById("sentenceCount").innerText = `${count}`;
}

function countParagraphs(text) {
  const count = text
    .trim()
    .split(/\n+/)
    .filter((paragraph) => paragraph.trim() !== "").length;
  document.getElementById("paraCount").innerText = `${count}`;
}

function avgWordLength(text) {
  const words = text.trim().split(/\s+/);
  const totalLength = words.reduce((acc, word) => acc + word.length, 0);
  const avgLength = totalLength / words.length;
  document.getElementById("avgWordLength").innerText = `${avgLength.toFixed(
    2
  )}`;
}

function calculateReadingTime(text) {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;
  const readingTimeInMinutes = Math.floor(words / 200); // Assuming average reading speed of 200 words per minute
  const readingTimeInSeconds = Math.round((words % 200) / (200 / 60)); // Convert remaining words to seconds
  const formattedReadingTime = `${padZero(readingTimeInMinutes)} min ${padZero(
    readingTimeInSeconds
  )} sec`;
  document.getElementById("readingTime").innerText = `${formattedReadingTime}`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function convertToUpper() {
  document.getElementById("output").value = document
    .getElementById("inputText")
    .value.toUpperCase();
}

function convertToLower() {
  document.getElementById("output").value = document
    .getElementById("inputText")
    .value.toLowerCase();
}

function convertToSentenceCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  document.getElementById("output").value = paragraphs
    .map((paragraph) => {
      const trimmedParagraph = paragraph.trim();
      return (
        trimmedParagraph.charAt(0).toUpperCase() +
        trimmedParagraph.slice(1).toLowerCase()
      );
    })
    .join("\n");
}

function convertToTitleCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  document.getElementById("output").value = paragraphs
    .map((paragraph) => {
      return paragraph
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    })
    .join("\n");
}

function convertToCamelCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  document.getElementById("output").value = paragraphs
    .map((paragraph) => {
      const words = paragraph.toLowerCase().split(" ");
      for (let i = 1; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      return words.join("");
    })
    .join("\n");
}

function convertToPascalCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  document.getElementById("output").value = paragraphs
    .map((paragraph) => {
      return paragraph
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join("");
    })
    .join("\n");
}

function convertToToggleCase() {
  const text = document.getElementById("inputText").value;
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === text[i].toUpperCase()) {
      result += text[i].toLowerCase();
    } else {
      result += text[i].toUpperCase();
    }
  }
  document.getElementById("output").value = result;
}

function convertToSnakeCase() {
  document.getElementById("output").value = document
    .getElementById("inputText")
    .value.toLowerCase()
    .replace(/\s+/g, "_");
}

function convertToDotCase() {
  document.getElementById("output").value = document
    .getElementById("inputText")
    .value.toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "");
}

function convertToAlternatingCase() {
  const text = document.getElementById("inputText").value;
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
  }
  document.getElementById("output").value = result;
}

function convertToKebabCase() {
  document.getElementById("output").value = document
    .getElementById("inputText")
    .value.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function showSnackbar(message, type = "info") {
  const snackbar = document.getElementById("snackbar");
  snackbar.innerText = message;
  snackbar.classList.remove("success", "error", "info");
  snackbar.classList.add(type, "show");
  setTimeout(() => {
    snackbar.classList.remove("show", type);
    snackbar.innerText = "";
  }, 3000);
}

function clearText() {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("output");
  inputText.value = "";
  outputText.value = "";
  updateCounts();
  showSnackbar("Text cleared!", "success");
}

function copyToClipboard() {
  const outputText = document.getElementById("output").value;
  if (outputText) {
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        showSnackbar("Text copied to clipboard!", "success");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        showSnackbar("Failed to copy text. Please try again.", "error");
      });
  } else {
    showSnackbar(
      "Nothing to copy! Please generate some output first.",
      "error"
    );
  }
}
