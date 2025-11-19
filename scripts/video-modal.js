// Video mapping for each moment class
const videoMap = {
  "moment-gb": "Links/demo.mp4",
  "moment-rs": "Links/demo.mp4",
  "moment-rams": "Links/demo.mp4",
  "moment-bills": "Links/demo.mp4",
  "moment-nyg": "Links/demo.mp4",
  "moment-rvn": "Links/demo.mp4",
  "moment-sh": "Links/demo.mp4",
  "moment-pts": "Links/demo.mp4",
  "moment-phl": "Links/demo.mp4",
  "moment-kc": "Links/demo.mp4",
};

const modal = document.getElementById("videoModal");
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const closeBtn = document.getElementById("closeModal");

// Add click event to all moment articles
document.querySelectorAll(".moment").forEach((moment) => {
  moment.addEventListener("click", function (e) {
    // Find which moment class this element has
    const momentClass = Array.from(this.classList).find(
      (cls) => cls.startsWith("moment-") && cls !== "moment"
    );

    // Get video URL from the map or data attribute
    const videoUrl = this.dataset.video || videoMap[momentClass];

    if (videoUrl) {
      // Check if it's a YouTube URL or local file
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        // Handle YouTube URLs (convert to embed format if needed)
        const embedUrl = videoUrl.replace("watch?v=", "embed/") + "?autoplay=1";
        // You'd need to switch back to iframe for YouTube
      } else {
        // Handle local video files
        videoSource.src = videoUrl;
        videoPlayer.load();
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        videoPlayer.play();
      }
    }
  });
});

// Close modal function
function closeModal() {
  modal.classList.remove("active");
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
  videoSource.src = "";
  document.body.style.overflow = "auto";
}

// Close button click
closeBtn.addEventListener("click", closeModal);

// Close on background click
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Close on ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});
