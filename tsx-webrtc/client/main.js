const socket = io();
let pc = new RTCPeerConnection();

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
remoteVideo.style.borderColor = "#ff0000";

let isCaller = false;
let peerId;

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localVideo.srcObject = stream;
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
  })
  .catch((error) => console.error("Error accessing media devices:", error));

pc.ontrack = (event) => {
  remoteVideo.style.borderColor = "#ccc";
  remoteVideo.srcObject = event.streams[0];
};

pc.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit("candidate", { candidate: event.candidate, to: peerId });
  }
};

socket.on("offer", async (offer) => {
  if (!isCaller) {
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("answer", { answer, to: offer.from });
  }
});

socket.on("answer", async (answer) => {
  await pc.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on("candidate", async (candidate) => {
  await pc.addIceCandidate(new RTCIceCandidate(candidate));
});

// Connect to other user
const connectButton = document.getElementById("connectButton");

connectButton.addEventListener("click", () => {
  peerId = prompt("Enter Peer ID");
  isCaller = true;
  pc.createOffer().then((offer) => {
    pc.setLocalDescription(offer);
    socket.emit("offer", { offer, to: peerId });
  });
});
