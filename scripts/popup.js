/* File popup.js được chạy khi click vào icon exetension */

let keywordInput = document.getElementById("keyword");
let toggleCheckbox = document.getElementById("toggle");
let toogleButton = document.querySelector(".button-toogle");
let saveButton = document.getElementById("save");
let keywords = "";

// Bật tắt exetension
toggleCheckbox.addEventListener("change", function () {
  enabled = this.checked;
  chrome.storage.sync.set({ enabled });
});

//Phục hồi trạng thái toggleCheckbox
chrome.storage.sync.get("enabled", function (result) {
  if (result.enabled == true) {
    toggleCheckbox.checked = true;
    toogleButton.className = "button-toogle";
    toogleButton.textContent = "ON";
  } else {
    toggleCheckbox.checked = false;
    toogleButton.className = "button-toogle off";
    toogleButton.textContent = "OFF";
  }
});

// Đổi màu và nội dung nút ON/OFF
toogleButton.addEventListener("click", function () {
  this.classList.toggle("off");
  if (this.classList.contains("off")) {
    this.textContent = "OFF";
  } else {
    this.textContent = "ON";
  }
});

// Lưu keywords từ ô textarea vào sync storage
saveButton.addEventListener("click", () => {
  keywords = keywordInput.value;
  chrome.storage.sync.set({ keywords });
});

// Hoặc set cứng keyword vào sync storage
// chrome.storage.sync.set({ keywords });

// Phục hồi trạng thái textarea
chrome.storage.sync.get("keywords", function (result) {
  if (result.keywords)
    keywordInput.value = result.keywords;
});