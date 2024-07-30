/* File background.js được chạy từ khi bật exetension */

// Kiểm tra nếu chưa tồn tại thì tạo biến enabled trong sync storage
chrome.storage.sync.get("enabled", function (result) {
  if (result === undefined) {
    let enabled = true;
    chrome.storage.sync.set({ enabled });
  }
});
