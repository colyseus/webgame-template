import Game from './Game';
import Networking from '../core/Networking';
import { Events } from '@discord/embedded-app-sdk';
import { discordSdk } from '../core/DiscordSDK';
import { useEffect } from 'react';

function DiscordActivity() {
	useEffect(() => {
		const handleSpeakingStart = () => Networking.room!.send("speaking", true);
		const handleSpeakingStop = () => Networking.room!.send("speaking", false);

		discordSdk.subscribe(Events.SPEAKING_START, handleSpeakingStart, { channel_id: discordSdk.channelId });
		discordSdk.subscribe(Events.SPEAKING_STOP, handleSpeakingStop, { channel_id: discordSdk.channelId });

		return () => {
			discordSdk.unsubscribe(Events.SPEAKING_START, handleSpeakingStart);
			discordSdk.unsubscribe(Events.SPEAKING_STOP, handleSpeakingStop);
		};
	}, []);

	return <Game />;
}

export default DiscordActivity
