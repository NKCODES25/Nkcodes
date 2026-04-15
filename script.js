const recipientInput = document.getElementById("recipient");
const messageInput = document.getElementById("message");
const imageInput = document.getElementById("imageInput");

const previewRecipient = document.getElementById("previewRecipient");
const previewMessage = document.getElementById("previewMessage");
const previewImages = document.getElementById("previewImages");
const wordCount = document.getElementById("wordCount");
const wordWarning = document.getElementById("wordWarning");

const MAX_WORDS = 1000;
const MAX_IMAGES = 3;

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function updateRecipient() {
  const name = recipientInput.value.trim();
  previewRecipient.textContent = name || "My love";
}

function updateMessage() {
  const words = countWords(messageInput.value);

  if (words > MAX_WORDS) {
    const trimmed = messageInput.value.trim().split(/\s+/).slice(0, MAX_WORDS).join(" ");
    messageInput.value = trimmed;
    wordWarning.textContent = "Word limit reached.";
  } else {
    wordWarning.textContent = "";
  }

  wordCount.textContent = countWords(messageInput.value);
  previewMessage.textContent =
    messageInput.value.trim() || "Start typing your letter to see a beautiful preview here.";
}

function updateImages() {
  previewImages.innerHTML = "";
  const files = [...imageInput.files].slice(0, MAX_IMAGES);

  if (imageInput.files.length > MAX_IMAGES) {
    wordWarning.textContent = "Only the first 3 images were added.";
  }

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target.result;
      img.alt = `Uploaded memory: ${file.name}`;
      previewImages.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

recipientInput.addEventListener("input", updateRecipient);
messageInput.addEventListener("input", updateMessage);
imageInput.addEventListener("change", updateImages);

updateRecipient();
updateMessage();
