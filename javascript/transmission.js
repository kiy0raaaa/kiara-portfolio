document.addEventListener('DOMContentLoaded', () => {
    const messages = [
        "Initializing transmission...",
        "Signal detected.",
        "Accessing classified records...",
        "System remains active.",
        "This is a secure transmission. If you are receiving this, it means you have been deemed worthy of the knowledge contained within. The information we share is crucial for your growth and understanding of the world around you. Pay close attention to the details, as they may hold the key to unlocking new potentials and insights. Remember, knowledge is power, but wisdom is the application of that knowledge. Use it wisely."
    ];
    
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;

    let messageIndex = 0;
    let charIndex = 0;

    function typeMessage() {
        if (charIndex < messages[messageIndex].length) {
            typingText.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeMessage, 70);
        } else {
            setTimeout(eraseMessage, 1500);
        }
    }

    function eraseMessage() {
        if (charIndex > 0) {
            typingText.textContent = messages[messageIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseMessage, 40);
        } else {
            messageIndex++;
            if (messageIndex >= messages.length) {
                messageIndex = 0;
            }
            setTimeout(typeMessage, 300);
        }
    }

    typeMessage();
});