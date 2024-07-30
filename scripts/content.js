/* File content.js được chạy khi website chỉ định (matches - manifest.json) được tải */

document.addEventListener("DOMContentLoaded", () => {
  alert("content.js");
});

// Nhấn phím 'k'
document.addEventListener('keydown', function (event) {
  if (event.key === 'k') {
    chrome.storage.sync.get("enabled", function (result) {
      // Kiểm tra nếu extension được bật
      if (result.enabled == true) {
        // Đọc chuỗi keywords được lưu ở sync storage
        chrome.storage.sync.get("keywords", function (result) {
          // Kiểm tra nếu chuỗi keywords khác rỗng
          if (result.keywords.trim() != "") {
            // Chuyển chuỗi sang mảng
            let arrKeywords = result.keywords.split(",");

            alert(`State: ON, Keywords: ${arrKeywords}`);

            // Duyệt từng keyword trong mảng
            arrKeywords.forEach(function (keyword) {
              let value = keyword.trim();
              let regexp = new RegExp(`(^|\\s)${value}(\\s|$)`, "gi");

              // Hàm đệ quy thay thế nội dung đối với text node
              function replaceText(node) {
                // Nếu là text node thì thay thế nội dung
                if (node.nodeType === Node.TEXT_NODE) {
                  // Thay thế chỉ khi từ khóa chưa có dấu '..' ở phía trước
                  node.textContent = node.textContent.replace(regexp, function (match) {
                    // Kiểm tra xem từ khóa đã có dấu '..' chưa
                    if (!match.startsWith('..')) {
                      return match.replace(value, '..' + value);
                    }
                    return match;
                  });
                } else { // Nếu không phải text node thì tiếp tục chạy hàm với các node con
                  node.childNodes.forEach(replaceText);
                }
              }

              // Chạy hàm đệ quy bắt đầu từ node body
              replaceText(document.body);
            });
          }
        });
      }
    });
  }
});

