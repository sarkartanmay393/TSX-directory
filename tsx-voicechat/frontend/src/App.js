import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { BACKEND_URL } from "./utils/environments";
import { v4 } from "uuid";

function App() {
  const localPeerConnection = useRef(new RTCPeerConnection());
  const [signalingServer, setSignalingServer] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const candidateQueue = useRef([]);

  useEffect(() => {
    const server = io(BACKEND_URL);
    setSignalingServer(server);

    server.on("offer", handleOffer);
    server.on("answer", handleAnswer);
    server.on("ice-candidate", handleNewICECandidateMsg);

    return () => {
      server.off("offer", handleOffer);
      server.off("answer", handleAnswer);
      server.off("ice-candidate", handleNewICECandidateMsg);

      server.disconnect();
    };
  }, []);

  const handleOnChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleStartCall = (event) => {
    event.preventDefault(); // Prevent form submission
    if (!roomId.trim()) {
      let inputClassName = document.getElementById("roomIdInput").className;
      if (!inputClassName.includes("error")) {
        document.getElementById("roomIdInput").className += " error ";
        setTimeout(() => {
          document.getElementById("roomIdInput").className = document
            .getElementById("roomIdInput")
            .className.replace(" error ", "");
        }, 2000);
      }
      return;
    }
    setCallActive(true);
    joinRoom(roomId.trim());
  };

  const handleEndCall = () => {
    setCallActive(false);
    localPeerConnection.current?.getTracks().forEach((track) => track.stop());
    localPeerConnection.current?.close();
    localPeerConnection.current = null;
    setRoomId("");
  };

  const checkRoomAvailability = async (roomId) => {
    let available = false;
    try {
      const response = await fetch(`${BACKEND_URL}/api/checkRoomAvailability`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: roomId }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        console.log("You are allowed to go");
      } else {
        console.log("There must be some issue.");
      }
    } catch (error) {
      console.error("Error fetching room availability:", error);
    }

    return available;
  };

  const startRoom = async () => {
    const generatedRoomId = v4().substring(0, 6);
    setGeneratedRoomId(generatedRoomId);

    signalingServer.emit("join", { roomId: generatedRoomId });

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true },
      video: false,
    });

    localPeerConnection.current = new RTCPeerConnection({
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
    });

    stream.getAudioTracks().forEach((track) => {
      console.log("Track status: ", track.enabled, track.readyState);
      localPeerConnection.current.addTrack(track);
    });

    localPeerConnection.current.onicecandidate = handleICECandidateEvent;
    localPeerConnection.current.ontrack = handleTrackEvent;
    localPeerConnection.current.oniceconnectionstatechange =
      handleIceConnectionStateChange;
    localPeerConnection.current.onnegotiationneeded = handleIceNegotiationNeed;
  };

  const [generatedRoomId, setGeneratedRoomId] = useState("");

  const joinRoom = async (roomId) => {
    if (!roomId) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true },
      video: false,
    });

    localPeerConnection.current = new RTCPeerConnection({
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
    });

    // Add stream tracks to the peer connection
    stream.getAudioTracks().forEach((track) => {
      console.log("Track status: ", track.enabled, track.readyState);
      localPeerConnection.current.addTrack(track);
    });

    // Add audio element srcObject setup
    // const audioElement = document.querySelector("audio#audioPlay");
    // audioElement.srcObject = new MediaStream();

    // Triggered on setLocalDescription call
    localPeerConnection.current.onicecandidate = handleICECandidateEvent;
    localPeerConnection.current.ontrack = handleTrackEvent;
    localPeerConnection.current.oniceconnectionstatechange =
      handleIceConnectionStateChange;
    localPeerConnection.current.onnegotiationneeded = handleIceNegotiationNeed;

    signalingServer.emit("join", { roomId });

    try {
      const offer = await localPeerConnection.current.createOffer();
      await localPeerConnection.current.setLocalDescription(offer);

      signalingServer.emit("offer", {
        offer: offer,
        roomId: roomId,
      });
    } catch (err) {
      handleCreateOfferError(err);
    }
  };

  const handleIceNegotiationNeed = async () => {
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
        processCandidateQueue();
        console.log("Processing candidate queue...");
        const answer = await localPeerConnection.current.createAnswer();
        console.log("Answer created.");
        await localPeerConnection.current.setLocalDescription(answer);
        signalingServer.emit("answer", {
          answer: localPeerConnection.current.localDescription,
          roomId: roomId,
        });
      } catch (error) {
        handleCreateAnswerError(error);
      }
    }
  };

  async function handleAnswer({ answer, senderId }) {
    console.log("answer", answer, senderId);
    if (localPeerConnection.current) {
      try {
        await localPeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        console.log("Remote description set successfully for answer.");
        processCandidateQueue();
      } catch (e) {
        console.error("Error setting remote description:", e);
      }
    }
  }

  async function handleNewICECandidateMsg(data) {
    console.log("Received ICE candidate:", data);
    if (data.candidate) {
      console.log(
        "remoteDescription",
        localPeerConnection.current.remoteDescription
      );
      try {
        if (localPeerConnection.current.remoteDescription) {
          await addCandidate(data.candidate);
        } else {
          console.log("Queueing ICE candidate due to no remote description.");
          candidateQueue.current.push(data.candidate);
        }
      } catch (e) {
        console.error("Error adding ICE candidate:", e);
      }
    }
  }

  // After setting remote description
  function processCandidateQueue() {
    while (candidateQueue.current.length > 0) {
      const candidateData = candidateQueue.current.shift();
      addCandidate(candidateData);
    }
  }

  async function addCandidate(candidateData) {
    const candidate = new RTCIceCandidate(candidateData);
    try {
      await localPeerConnection.current.addIceCandidate(candidate);
      console.log("ICE candidate added successfully.");
    } catch (e) {
      console.error("Error adding ICE candidate:", e);
    }
  }

  const handleCreateOfferError = (error) => {
    console.error("Error creating an offer: ", error);
  };

  const handleCreateAnswerError = (error) => {
    console.error("Error creating an answer: ", error);
  };

  function handleRoomAvailable(roomId) {
    console.log(`Room ${roomId} is available.`);
  }

  function handleRoomUnavailable(roomId) {
    console.log(`Room ${roomId} is unavailable.`);
    setRoomId("");
    const input = document.getElementById("roomIdInput");
    let prev = input.placeholder;
    input.placeholder = "Enter a different id";
    setTimeout(() => {
      input.placeholder = prev;
    }, 2000);
  }

  const handleRoomIdCopy = () => {
    navigator.clipboard.writeText(generatedRoomId);
  };

  return (
    <div className="App">
      <header className="header flex column center">
        <h1>Chess VC</h1>

        {generatedRoomId && (
          <p>
            Active room:{" "}
            <code onClick={handleRoomIdCopy}>{generatedRoomId}</code>
          </p>
        )}

        {callActive || generatedRoomId ? (
          <></>
        ) : (
          <div>
            <button onClick={startRoom}>Start a Room</button>
          </div>
        )}

        {callActive ? (
          <div>
            <p>Call in progress...</p>
            <button onClick={handleEndCall}>End Call</button>
          </div>
        ) : (
          <div className="flex column center fullW">
            {generatedRoomId ? null : (
              <>
                <label htmlFor="roomId">Enter Room ID</label>
                <div className="flex center fullW gap">
                  <input
                    name="roomId"
                    value={roomId}
                    id="roomIdInput"
                    placeholder="e.g. tsx123"
                    onChange={handleOnChange}
                  />
                  <button className="s16q2" onClick={handleStartCall}>
                    +
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        <audio id="audioPlay" autoPlay controls />
      </header>
    </div>
  );
}

export default App;
