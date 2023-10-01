import React, { useRef, useEffect } from 'react';
import ShakaPlayer from 'shaka-player-react';

function VideoPlayer3() {
    const controllerRef = useRef(null);

    useEffect(() => {
        const {
      /** @type {shaka.Player} */ player,
      /** @type {shaka.ui.Overlay} */ ui,
      /** @type {HTMLVideoElement} */ videoElement
        } = controllerRef.current;

        async function loadAsset() {
            // Load an asset.
            await player.load('https://streams.com/example.mpd');

            // Trigger play.
            videoElement.play();
        }

        loadAsset();
    }, []);

    return <ShakaPlayer ref={controllerRef} />;
}

export default VideoPlayer3;