// VideoPlayer.js

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import {
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    IconButton,
    Tooltip,
    Grid,
    Flex,
    Text,
    Menu,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    MenuDivider,
    MenuButton,
    Button,
} from "@chakra-ui/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

///icons
import { FiRepeat } from "react-icons/fi";
import { BsFastForwardFill, BsFillRewindFill } from "react-icons/bs";
import { FaPlay, FaPause } from "react-icons/fa6";
import { BiSolidVolumeMute, BiSolidVolumeFull } from "react-icons/bi";
import { RxEnterFullScreen } from "react-icons/rx";
import { MdFullscreen, MdFullscreenExit, MdOutlineSpeed, MdReplay } from "react-icons/md";
import { BsFillGearFill } from "react-icons/bs";

//css
import "./styles/player.css";


// import { formatTime } from "./Format"; // Ensure you have the formatTime function available
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
}


const ReactVideoPlayer = (props) => {

    const {
        videoUrl,
        thumbnail,
        miniPlayer = false
    } = props;

    const [videoState, setVideoState] = useState({
        playing: false,
        muted: false,
        volume: 0.5,
        played: 0,
        seeking: false,
        buffer: false,
        loaded: 0,
        fullScreen: false,
        replay: false,
        selectedBandwidth: -1,
        playbackRate: 1
    });
    const [buffering, setBuffering] = useState(true);

    const handleFS = useFullScreenHandle();


    const {
        playing,
        muted,
        volume,
        played,
        seeking,
        loaded,
        fullScreen,
        replay,
        selectedBandwidth,
        playbackRate
    } = videoState;

    const videoPlayerRef = useRef(null);
    const controlRef = useRef(null);



    const count = useRef(0);

    const playPauseHandler = () => {
        //handle replay if video ended 
        if (replay) {
            replayHandler()
        }
        else {
            setVideoState({ ...videoState, playing: !playing });
        }
    };

    const rewindHandler = () => {
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
    };

    const fastForwardHandler = () => {
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
    };

    const progressHandler = (state) => {
        if (count.current > 3) {
            controlRef.current.style.visibility = "hidden";
        } else if (controlRef.current.style.visibility === "visible") {
            count.current += 1;
        }

        if (!seeking) {
            setVideoState({ ...videoState, ...state });
        }

    };

    const bufferHandler = (state) => {
        setVideoState({ ...videoState, ...state });
    };

    const mouseMoveHandler = () => {
        controlRef.current.style.visibility = "visible";
        count.current = 0;
    };

    const seekHandler = (value) => {
        setVideoState({ ...videoState, played: parseFloat(value) / 100 });
    };

    const seekHandlerBuffer = (value) => {
        setVideoState({ ...videoState, loaded: parseFloat(value) / 100 });
    };

    const seekMouseUpHandler = (value) => {
        setVideoState({ ...videoState, seeking: false });
        videoPlayerRef.current.seekTo(value / 100);
    };

    const volumeChangeHandler = (value) => {
        const newVolume = parseFloat(value) / 100;
        setVideoState({
            ...videoState,
            volume: newVolume,
            muted: Number(newVolume) === 0 ? true : false,
        });
    };

    const volumeSeekUpHandler = (value) => {
        const newVolume = parseFloat(value) / 100;
        setVideoState({
            ...videoState,
            volume: newVolume,
            muted: newVolume === 0 ? true : false,
        });
    };

    const muteHandler = () => {
        setVideoState({ ...videoState, muted: !muted });
    };

    const fullScreenHandler = () => {
        setVideoState({ ...videoState, fullScreen: !fullScreen });
        if (!fullScreen) {
            handleFS.enter()
        }
        else {
            handleFS.exit()
        }

    };


    const formatCurrentTime = formatTime(
        videoPlayerRef.current ? videoPlayerRef.current.getCurrentTime() : "00:00"
    );

    const formatDuration = formatTime(
        videoPlayerRef.current ? videoPlayerRef.current.getDuration() : "00:00"
    );

    const bufferStartHandler = (state) => {
        setVideoState({ ...videoState, buffer: true });
    };

    const onBufferHandler = (state) => {
        console.log("onBufferHandler")
        console.log(state)
        setVideoState({ ...videoState, buffer: true });
    };

    const bufferEndHandler = () => {
        setVideoState({ ...videoState, buffer: false });
    };

    const onVideoEndHandler = () => {
        console.log("onVideoEndHandler")
        setVideoState({ ...videoState, replay: true });
    };

    const replayHandler = () => {
        console.log("replayHandler")
        setVideoState({ ...videoState, replay: false });

        videoPlayerRef.current.seekTo(0);
        //start playing again
        setVideoState({ ...videoState, playing: true });
    }




    return (
        <FullScreen handle={handleFS}>
            <Flex direction={"column"} w="100%" h="100%" >
                <ReactPlayer
                    ref={videoPlayerRef}
                    className="react-player"
                    url={videoUrl}
                    width="100%"
                    height="100%"
                    playing={playing}
                    volume={volume}
                    muted={muted}
                    playbackRate={playbackRate}
                    onProgress={(state) => {
                        progressHandler(state)
                        bufferHandler(state)
                    }}
                    pip={true}
                    config={{
                        file: {
                            hlsOptions: {
                                maxMaxBufferLength: 60,
                            },
                        },

                    }}
                    onReady={() => {
                        console.log("onReady")
                        console.log(videoPlayerRef.current.getInternalPlayer('hls').levels)
                        console.log(videoPlayerRef.current.getInternalPlayer('hls').currentLevel)
                    }}
                    onEnded={() => {
                        console.log("onEnded")
                        setVideoState({ ...videoState, playing: false });
                    }}
                    light={thumbnail}
                    onBuffer={() => {
                        console.log("onBuffer")
                        setVideoState({ ...videoState, buffer: true });
                    }}

                // controls={true}
                />
                <Flex
                    direction={"column"}
                    className="controls"
                    ref={controlRef}
                    position={"absolute"}
                    bottom={0}
                    h="max-content"
                    w="100%"
                    py="10px"
                    px="15px"
                    pb={0}
                    // gradient background vith opacity change from bottom to top
                    bgGradient="linear(to-t, rgba(0,0,0,0.5), rgba(0,0,0,0))"
                >
                    <Flex
                        direction="column"
                        className="bottom-controls"
                    >
                        <Flex className="slider-container" w="100%" position={"relative"}>
                            <Slider
                                min={0}
                                max={100}
                                value={played * 100}
                                onChange={seekHandler}
                                onChangeEnd={seekMouseUpHandler}
                                position={"relative"}

                            >
                                <Slider
                                    className="buffer-slider"
                                    min={0}
                                    max={100}
                                    value={loaded * 100}
                                    onChange={seekHandlerBuffer}
                                    onChangeEnd={seekMouseUpHandler}
                                    top={0}
                                    sx={
                                        {
                                            "position": "absolute",
                                            "top": "inherit",
                                        }
                                    }
                                >
                                    <SliderTrack bg={"rgba(255,255,255,0.2)"}>
                                        <SliderFilledTrack bg={"rgba(255,255,255,0.6)"} />
                                    </SliderTrack>
                                </Slider>

                                <SliderTrack bg={"rgba(255,255,255,0)"} position={"relative"}>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />

                            </Slider>

                        </Flex>
                        <Flex
                            className="control-box"
                            w="100%"
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Flex alignItems={"center"} gap={"5px"}>
                                <IconButton
                                    variant={"ghost"}
                                    aria-label={playing ? "Pause" : "Play"}
                                    onClick={playPauseHandler}
                                    icon={replay ? <MdReplay size={"25px"} /> : playing ? <FaPause size={"25px"} /> : <FaPlay size={"25px"} />}
                                    color={"white"}
                                    _hover={{ bg: "rgba(0,0,0,0.5)" }}
                                    // change the color whenclicked
                                    _active={{
                                        bg: "rgba(0,0,0,0.5)",
                                        color: "gray.50"
                                    }}

                                />
                                <IconButton
                                    variant={"ghost"}
                                    aria-label="Fast Forward"
                                    onClick={fastForwardHandler}
                                    icon={<BsFastForwardFill size="20px" />}
                                    color={"white"}
                                    size={"lg"}
                                    _hover={{ bg: "rgba(0,0,0,0.5)" }}
                                    _active={{
                                        bg: "rgba(0,0,0,0.5)",
                                        color: "gray.50"
                                    }}
                                />
                                <IconButton
                                    variant={"ghost"}
                                    aria-label={muted ? "Unmute" : "Mute"}
                                    onClick={muteHandler}
                                    icon={muted ? <BiSolidVolumeMute size={"20px"} /> : <BiSolidVolumeFull size={"20px"} />}
                                    color={"white"}
                                    size={"lg"}
                                    _hover={{ bg: "rgba(0,0,0,0.5)" }}
                                    _active={{
                                        bg: "rgba(0,0,0,0.5)",
                                        color: "gray.50"
                                    }}
                                />
                                <Slider
                                    onChange={volumeChangeHandler}
                                    value={volume * 100}
                                    onChangeEnd={volumeSeekUpHandler}
                                    min={0}
                                    max={100}
                                    w="60px"
                                    size={"lg"}
                                    colorScheme={"gray"}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                                <Text
                                    ml="5px"
                                    fontSize={"0.8rem"}
                                    color={"white"}
                                >
                                    {formatCurrentTime} / {formatDuration}
                                </Text>
                            </Flex>
                            <Flex gap="5px">
                                <Menu closeOnSelect={false}>
                                    <MenuButton
                                        variant={"ghost"}
                                        as={IconButton}
                                        color={"white"}
                                        size={"lg"}
                                        _hover={{ bg: "rgba(0,0,0,0.5)" }}
                                        _active={{
                                            bg: "rgba(0,0,0,0.5)",
                                            color: "gray.50"
                                        }}
                                        icon={<MdOutlineSpeed size={"18px"} />}
                                    >
                                    </MenuButton>
                                    <MenuList
                                        minWidth='240px'
                                        //glassified effect
                                        bg='blackAlpha.700'
                                        boxShadow='dark-lg'
                                        backdropFilter='blur(50px) saturate(190%) contrast(80%) brightness(80%)'
                                        color={"white"}
                                        borderColor={"gray.900"}
                                    >
                                        <MenuOptionGroup
                                            // defaultValue={-1}
                                            title='Selct Playback Speed'
                                            type='radio'
                                            value={playbackRate}
                                            onChange={(value) => {
                                                console.log("value", value)
                                                setVideoState({ ...videoState, selectedBandwidth: value })
                                                videoPlayerRef.current.getInternalPlayer('hls').currentLevel = value
                                            }}
                                        >

                                            {
                                                [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((speed, index) => {
                                                    return (
                                                        <MenuItemOption
                                                            key={index}
                                                            value={speed}
                                                            bg={"transperant"}
                                                            onClick={() => {
                                                                setVideoState({ ...videoState, playbackRate: speed })
                                                            }}>

                                                            {speed}x
                                                        </MenuItemOption>
                                                    )
                                                })
                                            }

                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>
                                <Menu closeOnSelect={false}>
                                    <MenuButton
                                        variant={"ghost"}
                                        as={IconButton}
                                        color={"white"}
                                        size={"lg"}
                                        _hover={{ bg: "rgba(0,0,0,0.5)" }}
                                        _active={{
                                            bg: "rgba(0,0,0,0.5)",
                                            color: "gray.50"
                                        }}
                                        icon={<BsFillGearFill size={"18px"} />}
                                    >
                                    </MenuButton>
                                    <MenuList
                                        minWidth='240px'
                                        //glassified effect
                                        bg='blackAlpha.700'
                                        boxShadow='dark-lg'
                                        backdropFilter='blur(50px) saturate(190%) contrast(80%) brightness(80%)'
                                        color={"white"}
                                        borderColor={"gray.900"}
                                    >
                                        <MenuOptionGroup
                                            // defaultValue={-1}
                                            title='Selct Quality'
                                            type='radio'
                                            value={selectedBandwidth}

                                        >
                                            {
                                                videoPlayerRef.current && videoPlayerRef.current.getInternalPlayer('hls').levels.map((level, index) => {
                                                    return (
                                                        <MenuItemOption
                                                            key={index}
                                                            value={index}
                                                            bg={"transperant"}
                                                            onClick={() => {
                                                                setVideoState({ ...videoState, selectedBandwidth: index })
                                                                videoPlayerRef.current.getInternalPlayer('hls').currentLevel = index
                                                            }}>
                                                            {level.height}p
                                                        </MenuItemOption>
                                                    )
                                                })
                                            }
                                            <MenuItemOption
                                                value={-1}
                                                key={-1}
                                                bg={"transperant"}
                                                onClick={() => {
                                                    setVideoState({ ...videoState, selectedBandwidth: -1 })
                                                    videoPlayerRef.current.getInternalPlayer('hls').currentLevel = -1
                                                }}>
                                                Auto
                                            </MenuItemOption>
                                        </MenuOptionGroup>
                                    </MenuList>
                                </Menu>

                                <IconButton
                                    variant={"ghost"}
                                    aria-label="Fast Forward"
                                    onClick={fullScreenHandler}
                                    icon={fullScreen ? <MdFullscreenExit size={"20px"} /> : <MdFullscreen size={"20px"} />}
                                    color={"white"}
                                    size={"lg"}
                                    _hover={{ bg: "rgba(0,0,0,0.5)" }}
                                    _active={{
                                        bg: "rgba(0,0,0,0.5)",
                                        color: "gray.50"
                                    }}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex >
            </Flex >
        </FullScreen >
    );
};

export default ReactVideoPlayer;
