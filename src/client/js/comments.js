const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const submitHandler = (event) => {
    event.preventDefault();

    const videoId = videoContainer.dataset.id;
    const textarea = form.querySelector("textarea");
    if (!textarea) {
        return;
    }

    const comment = textarea.value;
    if (!comment) {
        return;
    }

    fetch(`/api/videos/${videoId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment
        })
    });
}

if (form) {
    console.log(form);
    form.addEventListener("submit", submitHandler);
}