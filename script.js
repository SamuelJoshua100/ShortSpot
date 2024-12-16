// JavaScript for the URL shortener

// Select input elements and buttons
const longUrlInput = document.getElementById("long-url");
const shortenBtn = document.querySelector(".btn");
const shortUrlInput = document.getElementById("copy-url");
const copyBtn = document.querySelector(".btn1");
const errorMsg = document.querySelector(".error-message");

// TinyURL API token
const apiToken = "QFgBgme7OTSkuBYlPzzSZyh7S0Gdh7CREjPbbjxvznpp9AuX5rrZmGM4sy2L";
const apiEndpoint = "https://api.tinyurl.com/create";

// Function to validate if the URL is properly formatted
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

// Function to shorten URL using TinyURL API
async function shortenUrl(longUrl) {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ url: longUrl }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.data.tiny_url; // Return the shortened URL
    } else {
      throw new Error(data.errors || "Unable to shorten URL");
    }
  } catch (error) {
    console.error("Error shortening URL:", error);
    return null;
  }
}

// Event listener for the shorten button
shortenBtn.addEventListener("click", async () => {
  const longUrl = longUrlInput.value.trim(); // Get the URL entered by the user

  // Validate the URL
  if (!isValidUrl(longUrl)) {
    errorMsg.textContent = "Invalid URL. Please enter a valid one.";
    errorMsg.style.display = "block";
    return;
  }

  // Hide error message if URL is valid
  errorMsg.style.display = "none";

  // Shorten the URL using TinyURL API
  const shortUrl = await shortenUrl(longUrl);

  if (shortUrl) {
    shortUrlInput.value = shortUrl; // Display the shortened URL
    alert("URL shortened successfully!");
  } else {
    alert("Failed to shorten URL. Please try again later.");
  }
});

// Event listener for the copy button
copyBtn.addEventListener("click", () => {
  const shortUrl = shortUrlInput.value;

  if (shortUrl) {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        alert("Short URL copied to clipboard!");
      })
      .catch(() => {
        alert("Failed to copy. Please try again.");
      });
  } else {
    alert("Nothing to copy. Generate a short URL first.");
  }
});
