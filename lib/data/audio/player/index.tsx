import { FC, RefObject, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Code, Flex, Grid, IconButton, Slider } from "@radix-ui/themes";
import { DotsHorizontalIcon, PauseIcon, PlayIcon, TrackNextIcon, TrackPreviousIcon } from "@radix-ui/react-icons";

type Context = {
  state: 'idle' | 'playing';
  dragging: boolean;
  trackSrc: string;
  trackTitle: string;
  timePercent: number; // 0 - 100,
  audioRef: RefObject<HTMLAudioElement> | null;
};

const PlayerContext = createContext<{
  context: Context;
  update: (patch: Partial<Context>) => void;
}>(null!);

export const Player: FC<{ trackSrc: string; trackTitle: string }> = props => {
  const [context, update] = useState<Context>({
    state: 'idle',
    dragging: false,
    trackTitle: props.trackTitle,
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
        <Grid
          columns={{ initial: '2', sm: '1fr auto 1fr' }}
          rows={{ initial: 'auto 1fr', sm: '1' }}
          gap="4"
        >
          <Flex
            gridColumn={{ initial: '1 / 3', sm: '1' }}
            gridRow="1"
            align="center"
            justify={{ initial: 'center', sm: 'start' }}
            width="100%s"
          >
            <Title />
          </Flex>
          <Flex
            gridColumn={{ initial: '1', sm: '2' }}
            gridRow={{ initial: '2', sm: '1' }}
            align="center"
          >
            <Buttons />
          </Flex>
          <Flex
            gridColumn={{ initial: '2', sm: '3' }}
            gridRow={{ initial: '2', sm: '1' }}
            align="center"
            justify="end"
          >
            <TimeDisplay />
          </Flex>
        </Grid>
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

export const Title: FC = () => {
  const { context } = useContext(PlayerContext);
  return <Code variant="ghost">{context.trackTitle}</Code>;
};

export const Buttons: FC = () => {
  const { context } = useContext(PlayerContext);
  const audio = context.audioRef?.current;

  const toggleAction = useCallback(() => {
    switch (context.state) {
      case "idle":
        audio?.play();
        return;
      case "playing":
        audio?.pause();
        return;
    }
  }, [context, audio]);

  useEffect(() => {
    const action = (event: KeyboardEvent) => {
      if (event.code === 'Space') toggleAction();
      console.log('heee', event);
    };

    window.addEventListener('keypress', action);
    return () => window.removeEventListener('keypress', action);
  }, [audio, toggleAction]);


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
    <Flex gap="2" align="center">
      <IconButton radius="full" disabled>
        <TrackPreviousIcon />
      </IconButton>
      <IconButton radius="full" onClick={toggleAction} size="3">
        <ToggleIcon />
      </IconButton>
      <IconButton radius="full" disabled>
        <TrackNextIcon />
      </IconButton>
    </Flex>
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

const timeText = (seconds: number) =>
  new Date(seconds * 1000)
    .toISOString()
    .slice(14, 19);