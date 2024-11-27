let currentFileIndex = 1;
let files = {
    1: {
        name: 'File 1',
        content: ''
    }
};

// Check if there's saved content and theme in localStorage
document.addEventListener("DOMContentLoaded", () => {
    const savedContent = localStorage.getItem("notepadContent");
    const savedTheme = localStorage.getItem("theme");

    if (savedContent) {
        files[currentFileIndex].content = savedContent;
        document.getElementById("notepad").value = savedContent;
    }

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector(".notepad-container").classList.add("dark-mode");
        document.getElementById("notepad").classList.add("dark-mode");
        document.querySelectorAll(".icon-button").forEach(btn => btn.classList.add("dark-mode"));
    }
});

// Save content to localStorage every 5 seconds
setInterval(() => {
    localStorage.setItem("notepadContent", files[currentFileIndex].content);
}, 5000);

// Toggle between dark and light mode
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".notepad-container").classList.toggle("dark-mode");
    document.getElementById("notepad").classList.toggle("dark-mode");
    document.querySelectorAll(".icon-button").forEach(btn => btn.classList.toggle("dark-mode"));

    const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
});

// Save the content as a .txt file
document.getElementById("save-btn").addEventListener("click", () => {
    const blob = new Blob([files[currentFileIndex].content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${files[currentFileIndex].name}.txt`;
    link.click();
});

// Upload a .txt file
document.getElementById("upload-btn").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt";
    input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            addNewFile(file.name, content);
        };
        reader.readAsText(file);
    };
    input.click();
});

// Switch between multiple files
function switchFile(fileIndex) {
    currentFileIndex = fileIndex;
    document.getElementById("notepad").value = files[fileIndex].content;
    updateFileTabs();
}

// Create new file
function addNewFile(fileName, content) {
    const fileIndex = Object.keys(files).length + 1;
    files[fileIndex] = {
        name: fileName,
        content: content
    };

    const newTab = document.createElement("div");
    newTab.classList.add("file-tab");
    newTab.id = `file-tab-${fileIndex}`;
    newTab.innerText = fileName;
    newTab.onclick = () => switchFile(fileIndex);

    document.getElementById("file-container").appendChild(newTab);
    switchFile(fileIndex);
    updateFileTabs();
}

// Update active file tab
function updateFileTabs() {
    document.querySelectorAll(".file-tab").forEach(tab => {
        tab.classList.remove("active");
    });
    document.getElementById(`file-tab-${currentFileIndex}`).classList.add("active");
}

// Change template
document.getElementById("templates-dropdown").addEventListener("change", (event) => {
    const template = event.target.value;
    const notepad = document.getElementById("notepad");

    if (template === "template1") {
        notepad.value = "Template 1 Content: Write here...";
    } else if (template === "template2") {
        notepad.value = "Template 2 Content: Write here...";
    } else if (template === "template3") {
        notepad.value = "Template 3 Content: Write here...";
    }
    files[currentFileIndex].content = notepad.value;
});
