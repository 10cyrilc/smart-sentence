document.getElementById("inputText").addEventListener("input", updateCounts);

function updateCounts() {
  const text = document.getElementById("inputText").value;
  countCharacters(text);
  countCharactersNoSpaces(text);
  countWords(text);
  countSentences(text);
  countParagraphs(text);
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
  const text = document.getElementById("inputText").value.toUpperCase();
  document.getElementById("output").innerText = text;
}

function convertToLower() {
  const text = document.getElementById("inputText").value.toLowerCase();
  document.getElementById("output").innerText = text;
}

function convertToSentenceCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  const sentenceCased = paragraphs
    .map((paragraph) => {
      const trimmedParagraph = paragraph.trim();
      return (
        trimmedParagraph.charAt(0).toUpperCase() +
        trimmedParagraph.slice(1).toLowerCase()
      );
    })
    .join("\n");
  document.getElementById("output").innerText = sentenceCased;
}

function convertToTitleCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  const titleCased = paragraphs
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
  document.getElementById("output").innerText = titleCased;
}

function convertToCamelCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  const camelCased = paragraphs
    .map((paragraph) => {
      const words = paragraph.toLowerCase().split(" ");
      for (let i = 1; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
      }
      return words.join("");
    })
    .join("\n");
  document.getElementById("output").innerText = camelCased;
}

function convertToPascalCase() {
  const paragraphs = document.getElementById("inputText").value.split("\n");
  const pascalCased = paragraphs
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
  document.getElementById("output").innerText = pascalCased;
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
  document.getElementById("output").innerText = result;
}

function convertToSnakeCase() {
  const text = document
    .getElementById("inputText")
    .value.toLowerCase()
    .replace(/\s+/g, "_");
  document.getElementById("output").innerText = text;
}

function convertToDotCase() {
  const text = document
    .getElementById("inputText")
    .value.toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "");
  document.getElementById("output").innerText = text;
}

function convertToAlternatingCase() {
  const text = document.getElementById("inputText").value;
  let result = "";
  for (let i = 0; i < text.length; i++) {
    result += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
  }
  document.getElementById("output").innerText = result;
}

function convertToKebabCase() {
  const text = document
    .getElementById("inputText")
    .value.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  document.getElementById("output").innerText = text;
}

function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.innerText = message;
  snackbar.classList.add("show");
  setTimeout(() => {
    snackbar.classList.remove("show");
    snackbar.innerText = "";
  }, 3000);
}

function clearText() {
  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("output");
  inputText.value = "";
  outputText.innerText = "";
  updateCounts();
  showSnackbar("Text cleared!");
}

function copyToClipboard() {
  const outputText = document.getElementById("output").innerText;
  console.log(outputText);
  if (outputText) {
    navigator.clipboard
      .writeText(outputText)
      .then(() => {
        showSnackbar("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        showSnackbar("Failed to copy text. Please try again.");
      });
  } else {
    showSnackbar("Nothing to copy! Please generate some output first.");
  }
}
