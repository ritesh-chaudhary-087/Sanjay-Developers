document.addEventListener("DOMContentLoaded", () => {
  // File input preview functionality
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const fileName = this.files[0]?.name || "No file selected";
      const fileSize = this.files[0]?.size || 0;
      const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

      // Display file info
      const fileInfoElement = document.createElement("p");
      fileInfoElement.textContent = `Selected: ${fileName} (${fileSizeMB} MB)`;
      fileInfoElement.className = "text-xs mt-1 text-gray-700 file-info";

      // Remove previous info if exists
      const previousInfo = this.parentNode.querySelector(".file-info");
      if (previousInfo) {
        previousInfo.remove();
      }

      this.parentNode.appendChild(fileInfoElement);

      // Validate file size
      if (fileSize > 5000000) {
        // 5MB
        const errorElement = document.createElement("p");
        errorElement.textContent =
          "File size exceeds 5MB limit. Please select a smaller file.";
        errorElement.className = "text-xs mt-1 text-red-500 file-error";

        // Remove previous error if exists
        const previousError = this.parentNode.querySelector(".file-error");
        if (previousError) {
          previousError.remove();
        }

        this.parentNode.appendChild(errorElement);
      }
    });
  }

  // Handle form submission
  const carrerForm = document.querySelector('form[action="carrer.php"]');
  if (carrerForm) {
    carrerForm.addEventListener("submit", function (e) {
      // Basic validation
      const fileInput = this.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) {
        const fileSize = fileInput.files[0].size;
        const fileExt = fileInput.files[0].name.split(".").pop().toLowerCase();
        const allowedExtensions = ["pdf", "doc", "docx"];

        if (fileSize > 5000000) {
          e.preventDefault();
          showNotification(
            "File size exceeds 5MB limit. Please select a smaller file.",
            "error"
          );
          return false;
        }

        if (!allowedExtensions.includes(fileExt)) {
          e.preventDefault();
          showNotification(
            "Invalid file type. Allowed types: PDF, DOC, DOCX",
            "error"
          );
          return false;
        }
      }

      // Disable the submit button to prevent multiple submissions
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = "Submitting...";
      }

      // We'll let the form submit normally and PHP will handle the redirect
    });
  }

  // Check for form submission status from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");

  if (status === "success") {
    showNotification(
      "Application submitted successfully. We will contact you soon.",
      "success"
    );
  } else if (status === "error") {
    showNotification(
      "There was an error submitting your application. Please try again.",
      "error"
    );
  }
});

// Simple notification function
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className =
    type === "success"
      ? "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-md z-50"
      : "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-md z-50";
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}
