export const initSettings = () => {
    const settingsContainer = document.querySelector(".settings-container");
    const settingsContent = document.querySelector(".settings-content");
    return {settingsContainer, settingsContent};
}

export const toggleSettings = (settingsContainer, settingsContent) => {
    if (settingsContainer.classList.contains("visible")) {
        settingsContainer.classList.remove("visible");
        settingsContent.style.transform = "translateY(-638px)";
    } else {
        settingsContainer.classList.add("visible");
        settingsContent.style.transform = "translateY(638px)";
    }
}