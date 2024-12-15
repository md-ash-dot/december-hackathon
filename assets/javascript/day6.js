document.getElementById("toggleButton").addEventListener("click", () => {
    const greeting = document.getElementById("greeting");
    const videoContainer = document.getElementById("videoContainer");
    const video = document.getElementById("video");
    const button = document.getElementById("toggleButton");

    // Hide the greeting, button, and show the video container
    greeting.style.display = "none";
    button.style.display = "none";
    videoContainer.style.display = "block";

    // Play the video
    video.play();
});
