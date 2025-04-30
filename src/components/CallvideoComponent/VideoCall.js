import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";

const socket = io("http://localhost:5000"); // Kết nối WebSocket

const VideoCall = ({ userId, friendId }) => {
  const [stream, setStream] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [peer, setPeer] = useState(null);
  const myVideoRef = useRef();
  const friendVideoRef = useRef();

  useEffect(() => {
    // Lấy quyền truy cập camera & microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
      });

    // Lắng nghe tín hiệu gọi video
    socket.on("callIncoming", (signal) => {
      const newPeer = new SimplePeer({ initiator: false, trickle: false, stream });
      newPeer.signal(signal);
      setPeer(newPeer);
      setCallAccepted(true);

      newPeer.on("stream", (friendStream) => {
        if (friendVideoRef.current) {
          friendVideoRef.current.srcObject = friendStream;
        }
      });
    });

    // Lắng nghe tín hiệu kết thúc cuộc gọi
    socket.on("callEnded", () => {
      endCall();
    });

    return () => {
      socket.off("callIncoming");
      socket.off("callEnded");
    };
  }, []);

  const callFriend = () => {
    const newPeer = new SimplePeer({ initiator: true, trickle: false, stream });
    setPeer(newPeer);

    newPeer.on("signal", (signal) => {
      socket.emit("callUser", { to: friendId, signal });
    });

    newPeer.on("stream", (friendStream) => {
      if (friendVideoRef.current) {
        friendVideoRef.current.srcObject = friendStream;
      }
    });
  };

  // Hàm kết thúc cuộc gọi
  const endCall = () => {
    if (peer) {
      peer.destroy(); // Hủy kết nối WebRTC
      setPeer(null);
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // Tắt camera/micro
      setStream(null);
    }

    setCallEnded(true);
    setCallAccepted(false);

    socket.emit("endCall", { to: friendId });
  };

  return (
    <div>
      <video ref={myVideoRef} autoPlay playsInline />
      {callAccepted && !callEnded && <video ref={friendVideoRef} autoPlay playsInline />}
      
     <button onClick={callFriend}>📞 Gọi Video</button>
       <button onClick={endCall}>❌ Kết thúc</button>
    </div>
  );
};

export default VideoCall;
