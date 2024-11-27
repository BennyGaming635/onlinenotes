const themeToggleButton = document.getElementById("theme-toggle");
const previewToggleButton = document.getElementById("preview-toggle");
const saveButton = document.getElementById("save-btn");
const notepad = document.getElementById("notepad");
const previewContainer = document.getElementById("preview-container");
const preview = document.getElementById("preview");

// Check if there's saved content and theme in localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedContent = localStorage.getItem("notepadContent");
    const savedTheme = localStorage.getItem("theme");

    if (savedContent) {
        notepad.value = savedContent;
    }

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector(".notepad-container").classList.add("dark-mode");
        notepad.classList.add("dark-mode");
    }
});

// Save content to localStorage every 5 seconds
setInterval(() => {
    localStorage.setItem("notepadContent", notepad.value);
}, 5000);

// Toggle between dark and light mode
themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".notepad-container").classList.toggle("dark-mode");
    notepad.classList.toggle("dark-mode");

    const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
});

// Toggle markdown preview
previewToggleButton.addEventListener("click", () => {
    previewContainer.classList.toggle("hidden");
    if (!previewContainer.classList.contains("hidden")) {
        renderMarkdown();
    }
});

// Save the content as a .txt file
saveButton.addEventListener("click", () => {
    const blob = new Blob([notepad.value], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notepad.txt";
    link.click();
});

// Function to render markdown
function renderMarkdown() {
    const markdownContent = notepad.value;
    const renderedContent = marked.parse(markdownContent);
    preview.innerHTML = renderedContent;
}

// Automatically render markdown preview as user types
notepad.addEventListener("input", () => {
    if (!previewContainer.classList.contains("hidden")) {
        renderMarkdown();
    }
});
