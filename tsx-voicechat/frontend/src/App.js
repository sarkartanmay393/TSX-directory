import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { BACKEND_URL } from "./utils/environments";

function App() {
  const localPeerConnection = useRef(null);
  const [signalingServer, setSignalingServer] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const candidateQueue = useRef([]);

  useEffect(() => {
    const server = io("localhost:8080" || BACKEND_URL);
    setSignalingServer(server);

    server.on("offer", handleOffer);
    server.on("answer", handleAnswer);
    server.on("ice-candidate", handleNewICECandidateMsg);
    server.on("stop", handleEndCall);
    server.on("joined", handleNewJoinee);

    return () => {
      server.off("offer", handleOffer);
      server.off("answer", handleAnswer);
      server.off("ice-candidate", handleNewICECandidateMsg);
      server.off("stop", handleEndCall);
      server.off("joined", handleNewJoinee);
      server.disconnect();
    };
  }, []);

  const handleNewJoinee = ({ roomId, userId }) => {
    console.log("New user joined", userId, "in room", roomId);
    if (!localPeerConnection.current) {
      console.log("Making the connection call");
      makeCallingConnection();
    }
  };

  const handleOnChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleMute = () => {};

  const handleEndCall = () => {
    setCallActive(false);
    localPeerConnection.current?.close();
    localPeerConnection.current = null;
    signalingServer.emit("stop", { roomId });
    setRoomId("");
    candidateQueue.current = [];
  };

  const handleStartCall = () => {
    joinRoom(roomId.trim());
  };

  const joinRoom = async (roomId) => {
    if (!roomId.trim()) {
      let inputClassName = document.getElementById("roomIdInput").className;
      if (!inputClassName.includes("error")) {
        document.getElementById("roomIdInput").className += " error ";
        setTimeout(() => {
          document.getElementById("roomIdInput").className = document
            .getElementById("roomIdInput")
            .className.replace(" error ", "");
        }, 1000);
      }
      return;
    }
    signalingServer.emit("join", { roomId });
  };

  const makeCallingConnection = async (roomId) => {
    localPeerConnection.current = new RTCPeerConnection(pcConfig);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    // Add stream tracks to the peer connection
    stream.getTracks().forEach((track) => {
      console.log("Track status: ", track.enabled, track.readyState);
      localPeerConnection.current.addTrack(track, stream);
    });

    // Triggered on setLocalDescription call
    localPeerConnection.current.ontrack = handleTrackEvent;
    localPeerConnection.current.onicecandidate = handleICECandidateEvent;
    localPeerConnection.current.onnegotiationneeded = handleIceNegotiationNeed;
    localPeerConnection.current.oniceconnectionstatechange =
      handleIceConnectionStateChange;

    try {
      const offer = await localPeerConnection.current.createOffer();
      await localPeerConnection.current.setLocalDescription(offer);
      signalingServer.emit("offer", {
        offer: offer,
        roomId: roomId,
      });
    } catch (err) {
      console.log("Failed to create offer", err);
    }
  };

  const handleIceNegotiationNeed = async () => {
    console.log("ICE negotiation needed");

    try {
      const offer = await localPeerConnection.current.createOffer();
      await localPeerConnection.current.setLocalDescription(offer);
      signalingServer.emit("offer", { offer: offer, roomId: roomId });
    } catch (error) {
      console.error("Failed to create offer", error);
    }
  };

  const handleICECandidateEvent = (event) => {
    console.log("Sending ICE candidate", event.candidate);
    if (event.candidate) {
      // localPeerConnection.current.addIceCandidate(event.candidate);
      signalingServer.emit("ice-candidate", {
        roomId: roomId,
        candidate: {
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
        },
      });
    }
  };

  const handleIceConnectionStateChange = () => {
    console.log(
      "ICE Connection State:",
      localPeerConnection.current.iceConnectionState
    );
  };

  const handleTrackEvent = (event) => {
    console.log("Received track", event.streams[0]);
    const audioElement = document.querySelector("audio#audioPlay");
    audioElement.srcObject = event.streams[0];
    audioElement.muted = false;
    audioElement.volume = 1;
  };

  const handleOffer = async ({ offer }) => {
    console.log(`Received offer: `, offer);

    if (!offer) {
      console.error("Offer is undefined.");
      return;
    }

    const offerDescription = new RTCSessionDescription(offer);
    if (localPeerConnection.current) {
      try {
        await localPeerConnection.current.setRemoteDescription(
          offerDescription
        );
        console.log("Remote description set successfully for offer.");

        console.log("Processing candidate queue...", Date.now());
        processCandidateQueue();
        console.log("Processed candidate queue...", Date.now());

        const answer = await localPeerConnection.current.createAnswer();
        console.log("Answer created.");
        await localPeerConnection.current.setLocalDescription(answer);
        console.log("Local description set for answer.");

        signalingServer.emit("answer", {
          answer: answer,
          roomId: roomId,
        });
      } catch (error) {
        console.error("Error creating an answer: ", error);
      }
    } else {
      localPeerConnection.current = new RTCPeerConnection(pcConfig);
      localPeerConnection.current.ontrack = handleTrackEvent;
      localPeerConnection.current.onicecandidate = handleICECandidateEvent;
      localPeerConnection.current.onnegotiationneeded =
        handleIceNegotiationNeed;
      localPeerConnection.current.oniceconnectionstatechange =
        handleIceConnectionStateChange;

      try {
        await localPeerConnection.current.setRemoteDescription(
          offerDescription
        );
        console.log("Remote description set successfully for offer.");

        console.log("Processing candidate queue...", Date.now());
        processCandidateQueue();
        console.log("Processed candidate queue...", Date.now());

        const answer = await localPeerConnection.current.createAnswer();
        console.log("Answer created.");
        await localPeerConnection.current.setLocalDescription(answer);
        console.log("Local description set for answer.");

        signalingServer.emit("answer", {
          answer: answer,
          roomId: roomId,
        });
      } catch (error) {
        console.log("Error creating an answer: ", error);
      }
    }
  };

  const handleAnswer = async ({ answer }) => {
    console.log("Received answer:", answer);

    if (!answer) {
      console.error("Answer is undefined.");
      return;
    }

    const answerDescription = new RTCSessionDescription(answer);
    if (localPeerConnection.current) {
      try {
        await localPeerConnection.current.setRemoteDescription(
          answerDescription
        );
        console.log("Remote description set successfully for answer.");

        console.log("Processing candidate queue...", Date.now());
        processCandidateQueue();
        console.log("Processed candidate queue...", Date.now());
      } catch (e) {
        console.error("Error setting remote description:", e);
      }
    }
  };

  const handleNewICECandidateMsg = async ({ candidate }) => {
    console.log("Received ICE candidate:", candidate);

    if (candidate) {
      console.log(
        "Does remote description exists? ",
        localPeerConnection.current.remoteDescription ? "yes" : "no"
      );
      try {
        if (localPeerConnection.current.remoteDescription) {
          await addCandidate(candidate);
        } else {
          console.log("Queueing ICE candidate due to no remote description.");
          candidateQueue.current.push(candidate);
        }
      } catch (e) {
        console.error("Error adding ICE candidate:", e);
      }
    }
  };

  const processCandidateQueue = () => {
    // After setting remote description
    while (candidateQueue.current.length > 0) {
      const candidateData = candidateQueue.current.shift();
      addCandidate(candidateData);
    }
  };

  const addCandidate = async (candidateData) => {
    const candidate = new RTCIceCandidate(candidateData);
    if (localPeerConnection.current) {
      try {
        await localPeerConnection.current.addIceCandidate(candidate);
        console.log("ICE candidate added successfully.");
      } catch (e) {
        console.error("Error adding ICE candidate:", e);
      }
    }
  };

  const handleRoomIdCopy = () => {
    navigator.clipboard.writeText(generatedRoomId);
  };

  return (
    <div className="App">
      <header className="header flex column center">
        <h1>Chess VC</h1>

        {roomId && (
          <p style={{ fontSize: "14px" }}>
            Active room:{" "}
            <code onClick={handleRoomIdCopy} style={{ fontSize: "12px" }}>
              {roomId}
            </code>
          </p>
        )}

        {callActive ? (
          <div>
            <p>Call in progress...</p>
            <button onClick={handleMute}>Mute</button>
            <button onClick={handleEndCall}>End Call</button>
          </div>
        ) : (
          <div className="flex column center gap fullW">
            <>
              <label htmlFor="roomId">Enter Room ID</label>
              <div className="flex column center">
                <input
                  name="roomId"
                  value={roomId}
                  id="roomIdInput"
                  placeholder="e.g. tsx123"
                  onChange={handleOnChange}
                />
                <div className="flex">
                  <button onClick={handleStartCall}>Join</button>
                  {/* <button onClick={handleStartCall}>Start</button> */}
                </div>
              </div>
            </>
          </div>
        )}
        <audio id="audioPlay" autoPlay controls />
      </header>
    </div>
  );
}

export default App;

const pcConfig = {
  iceServers: [
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    {
      urls: "turn:global.relay.metered.ca:80",
      username: "aedbb4644a4ebf1034c89b21",
      credential: "E2z+G6tDaoGjqs6c",
    },
    {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: "aedbb4644a4ebf1034c89b21",
      credential: "E2z+G6tDaoGjqs6c",
    },
    {
      urls: "turn:global.relay.metered.ca:443",
      username: "aedbb4644a4ebf1034c89b21",
      credential: "E2z+G6tDaoGjqs6c",
    },
    {
      urls: "turns:global.relay.metered.ca:443?transport=tcp",
      username: "aedbb4644a4ebf1034c89b21",
      credential: "E2z+G6tDaoGjqs6c",
    },
  ],
};
