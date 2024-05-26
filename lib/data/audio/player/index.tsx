import { FC, RefObject, createContext, useContext, useEffect, useRef, useState } from "react";
import styles from './styles.module.css';
import { Code, Flex, Grid, IconButton, Slider } from "@radix-ui/themes";
import { DotsHorizontalIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons";

type Context = {
  state: 'idle' | 'playing';
  dragging: boolean;
  trackSrc: string;
  timePercent: number; // 0 - 100,
  audioRef: RefObject<HTMLAudioElement> | null;
};

const PlayerContext = createContext<{
  context: Context;
  update: (patch: Partial<Context>) => void;
}>(null!);

export const Player: FC<{ trackSrc: string }> = props => {
  const [context, update] = useState<Context>({
    state: 'idle',
    dragging: false,
    trackSrc: props.trackSrc,
    timePercent: 0,
    audioRef: null!
  });

  return (
    <PlayerContext.Provider value={{
      context,
      update: patch => update({
        ...context,
        ...patch
      })
    }}>
      <Audio />
      <Grid rows="24px 1fr" gap="2">
        <TimeBar />
        <Flex gap="4" align="center" justify="between">
          <Buttons />
          <TimeDisplay />
        </Flex>
      </Grid>
    </PlayerContext.Provider>
  );
};

export const Audio: FC = () => {
  const ref = useRef<HTMLAudioElement>(null);
  const { context, update } = useContext(PlayerContext);

  useEffect(() => update({ audioRef: ref }), []);

  return (
    <audio
      ref={ref}
      controlsList="nodownload"
      src={context.trackSrc}
      onPlay={() => update({ state: 'playing' })}
      onPause={() => update({ state: 'idle' })}
      onEnded={() => {
        const audio = ref.current;
        if (!audio) return;

        audio.currentTime = 0;
      }}
      onTimeUpdate={() => {
        if (context.dragging) return;

        const audio = ref.current;
        if (!audio) return;

        update({ timePercent: 100 * audio.currentTime / audio.duration });
      }}
    />
  );
};

export const TimeBar: FC = () => {
  const { context, update } = useContext(PlayerContext);

  return (
    <Grid align="center">
      <Slider
        step={0.1}
        value={[context.timePercent]}
        onValueChange={([timePercent]) => update({ timePercent, dragging: true })}
        onValueCommit={([timePercent]) => {
          const audio = context.audioRef?.current;
          if (!audio) return;

          audio.currentTime = audio.duration * (timePercent / 100);

          update({ timePercent, dragging: false });
        }}
      />
    </Grid>
  );
};

export const Buttons: FC = () => {
  const { context } = useContext(PlayerContext);
  const audio = context.audioRef?.current;

  const toggleAction = () => {
    switch (context.state) {
      case "idle":
        audio?.play();
        return;
      case "playing":
        audio?.pause();
        return;
    }
  };

  const ToggleIcon = () => {
    if (!audio) return <DotsHorizontalIcon />;

    switch (context.state) {
      case "idle":
        return <PlayIcon />;
      case "playing":
        return <PauseIcon />;
    }
  };

  return (
    <Grid className={styles.centerItems}>
      <Flex gap="4">
        {/* <IconButton radius="full">
          <TrackPreviousIcon />
        </IconButton> */}
        <IconButton radius="full" onClick={toggleAction}>
          <ToggleIcon />
        </IconButton>
        {/* <IconButton radius="full">
          <TrackNextIcon />
        </IconButton> */}
      </Flex>
    </Grid>
  );
};

export const TimeDisplay: FC = () => {
  const { context } = useContext(PlayerContext);
  const audio = context.audioRef?.current;

  if (
    audio?.currentTime == null ||
    audio?.duration == null ||
    isNaN(audio.duration)
  ) return <Code variant="ghost">--:-- / --:--</Code>;

  return <Code variant="ghost">{timeText(audio.currentTime)} / {timeText(audio.duration)}</Code>;
};

export const timeText = (seconds: number) =>
  new Date(seconds * 1000)
    .toISOString()
    .slice(14, 19);