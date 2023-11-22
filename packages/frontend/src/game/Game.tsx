import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Client } from "colyseus.js";

const client = new Client("http://localhost:2567");

function Game() {
	const location = useLocation();

	const [isLoading, setIsLoading] = useState(true);
	const [roomId, setRoomId] = useState("");

	useEffect(() => {
		const roomRequest = client.joinOrCreate("my_room", {})

		roomRequest.then((room) => {
			console.log("JOINED", room.roomId)
			setIsLoading(false);
			setRoomId(room.roomId);
		});

		return () => {
			roomRequest.then((room) => {
				console.log("WILL leave", room.roomId);
				room.leave();
			});
		};
	}, []);

  return (
    <>
			{(isLoading)
				? <div>Loading...</div>
				: <div>roomId: {roomId}</div>}
    </>
  )
}

export default Game
