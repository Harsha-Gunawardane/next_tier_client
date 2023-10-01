// import React, { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import 'videojs-contrib-hls'; // Make sure this import is present

// const VideoPlayer = () => {
//     const videoRef = useRef(null);

//     useEffect(() => {
//         const player = videojs(videoRef.current, {
//             techOrder: ['html5'], // Use HTML5 video tech
//             controls: true, // Show video player controls
//             plugins: {
//                 httpSourceSelector: {
//                     default: 'auto',
//                 },
//             },
//         });

//         // Add event listener to handle quality change
//         player.on('qualityChange', (event, data) => {
//             console.log('Quality changed to:', data.quality);
//         });

//         return () => {
//             player.dispose(); // Clean up when component unmounts
//         };
//     }, []);

//     return (
//         <video
//             ref={videoRef}
//             className="video-js vjs-default-skin"
//             controls
//             preload="auto"
//         >
//             <source src="http://localhost:3500/video/your-video-name/hls" type="application/x-mpegURL" />
//         </video>
//     );
// };
