import { db } from "./index.html";
import { collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

async function createRoom() {
    const roomName = document.getElementById('roomName').value;

    if (roomName === "") {
        displayMessage("Please enter a room name.", "error", "roomIdMessage");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "rooms"), {
            name: roomName,
            createdAt: new Date(),
            players: []
        });
        displayMessage(`Room created! Room ID: ${docRef.id}`, "success", "roomIdMessage");
    } catch (error) {
        console.error("Error creating room:", error);
        displayMessage("Error creating room. Try again.", "error", "roomIdMessage");
    }
}

async function joinRoom() {
    const roomId = document.getElementById('joinRoomId').value;

    if (roomId === "") {
        displayMessage("Please enter a room ID.", "error", "joinRoomMessage");
        return;
    }

    try {
        const roomRef = doc(db, "rooms", roomId);
        const roomSnap = await getDoc(roomRef);

        if (roomSnap.exists()) {
            displayMessage("Room found! Waiting for verification...", "success", "joinRoomMessage");
            // Additional logic for room verification can go here
        } else {
            displayMessage("Room not found.", "error", "joinRoomMessage");
        }
    } catch (error) {
        console.error("Error joining room:", error);
        displayMessage("Error joining room. Try again.", "error", "joinRoomMessage");
    }
}

// Function to display messages
function displayMessage(message, type, elementId) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.className = type; // This can apply styles based on type (success or error)
}

export { createRoom, joinRoom };
