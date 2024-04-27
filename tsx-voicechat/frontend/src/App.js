import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const localPeerConnection = useRef(null);
  const [signalingServer, setSignalingServer] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const candidateQueue = useRef([]);

  useEffect(() => {
    const server = io("http://localhost:8080/");
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

  const joinRoom = async (roomId) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
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
    stream.getTracks().forEach((track) => {
      localPeerConnection.current.addTrack(track, stream);
    });

    // Add audio element srcObject setup
    const audioElement = document.querySelector("audio#audioPlay");
    audioElement.srcObject = stream;

    localPeerConnection.current.onicecandidate = handleICECandidateEvent;
    localPeerConnection.current.ontrack = handleTrackEvent;

    signalingServer.emit("join", { roomId });

    localPeerConnection.current
      .createOffer()
      .then((offer) => localPeerConnection.current.setLocalDescription(offer))
      .then(() =>
        signalingServer.emit("offer", {
          type: "offer",
          offer: localPeerConnection.current.localDescription,
          roomId: roomId,
        })
      )
      .catch(handleCreateOfferError);
  };

  const handleICECandidateEvent = (event) => {
    console.log("ICE candidate event:", event);
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

  const handleTrackEvent = (event) => {
    const audioElement = document.querySelector("audio#audioPlay");
    if (audioElement.srcObject !== event.streams[0]) {
      audioElement.srcObject = event.streams[0];
    }
  };

  const handleOffer = ({ offer, senderId }) => {
    console.log(`Received offer: `, offer);
    if (!offer) {
      console.error("Offer is undefined.");
      return;
    }

    const offerDesc = new RTCSessionDescription(offer);
    if (localPeerConnection.current) {
      localPeerConnection.current
        .setRemoteDescription(offerDesc)
        .then(() => {
          console.log("Remote description set successfully for offer.");
          return localPeerConnection.current.createAnswer();
        })
        .then((answer) => {
          console.log("Answer created.");
          return localPeerConnection.current.setLocalDescription(answer);
        })
        .then(() => {
          signalingServer.emit("answer", {
            type: "answer",
            answer: localPeerConnection.current.localDescription,
            roomId: roomId,
          });
        })
        .catch(handleCreateAnswerError);
    }
  };

  function handleAnswer({ answer, senderId }) {
    console.log("answer", answer, senderId);
    if (localPeerConnection.current) {
      localPeerConnection.current
        .setRemoteDescription(new RTCSessionDescription(answer))
        .then(() => {
          while (candidateQueue.current.length > 0) {
            addCandidate(candidateQueue.current.shift());
          }
        })
        .catch((e) => console.error("Error setting remote description:", e));
    }
  }

  function handleNewICECandidateMsg(data) {
    console.log("Received ICE candidate:", data);
    if (data.candidate) {
      if (
        localPeerConnection.current &&
        localPeerConnection.current.remoteDescription
      ) {
        addCandidate(data.candidate);
      } else {
        candidateQueue.current.push(data.candidate);
      }
    }
  }

  function addCandidate(candidateData) {
    const candidate = new RTCIceCandidate(candidateData);
    localPeerConnection.current
      .addIceCandidate(candidate)
      .then(() => console.log("ICE candidate added successfully."))
      .catch((e) => console.error("Error adding ICE candidate:", e));
  }

  const handleCreateOfferError = (error) => {
    console.error("Error creating an offer: ", error);
  };

  const handleCreateAnswerError = (error) => {
    console.error("Error creating an answer: ", error);
  };

  return (
    <div className="App">
      <header className="header flex column center">
        <h1>Chess VC</h1>
        {callActive ? (
          <div>
            <p>Call in progress...</p>
            <button onClick={handleEndCall}>End Call</button>
          </div>
        ) : (
          <form onSubmit={handleStartCall} className="flex column gap">
            <label htmlFor="roomId">Enter Room ID</label>
            <input
              name="roomId"
              value={roomId}
              id="roomIdInput"
              placeholder="e.g. tsx123"
              onChange={handleOnChange}
            />
            <button type="submit">Start Call</button>
          </form>
        )}
        <audio id="audioPlay" autoPlay controls />
      </header>
    </div>
  );
}

export default App;
