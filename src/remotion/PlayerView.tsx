import React, {useEffect} from "react";
import {Player, type PlayerRef} from "@remotion/player";
import {HelloWorld} from "@/remotion/HelloWorld";
import type {Ref} from "vue";

export interface PlayerSchema {
    titleText: string
    titleColor: string
    logoColor1: string
    logoColor2: string
}

export const PlayerView = ({data, playerRefInstance, onPaused}: { data: PlayerSchema, playerRefInstance: Ref<PlayerRef>, onPaused?: () => void }): React.ReactElement => {

    const playerRef: React.RefObject<PlayerRef> = React.createRef()

    useEffect(() => {
        if (playerRef.current) {
            playerRefInstance.value = playerRef.current

            // add callback when player pauses
            playerRef.current.addEventListener('pause', () => {
                onPaused?.()
            })
        }
    }, [])

    return <Player
        ref={playerRef}
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        compositionHeight={1080}
        compositionWidth={1920}
        inputProps={data}
        controls
    />
}
