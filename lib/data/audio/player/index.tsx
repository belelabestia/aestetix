import { FC, ReactEventHandler, RefObject, forwardRef, useRef, useState } from "react"
import styles from './styles.module.css'
import { Button, Flex, Grid, Slider } from "@radix-ui/themes"

export const Player: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState({ time: 0 });

  return (
    <Grid rows="24px 1fr" className={styles.player}>
      <Audio ref={audioRef} onTimeUpdate={() => setState({
        time: getTime(audioRef.current)
      })} />
      <TimeBar time={state.time} onTimeChange={([time]) => {
        setState({ time })

        if (audioRef.current == null) return;

        audioRef.current.currentTime = (audioRef.current?.duration ?? 0) * (time / 100)
      }} />
      <Buttons audioRef={audioRef} />
    </Grid>
  )
}

const getTime = (audio: HTMLAudioElement | null): number => {
  if (audio?.currentTime == null || audio?.duration == null) return 0;
  return 100 * audio.currentTime / audio.duration;
}

export const Audio = forwardRef<
  HTMLAudioElement,
  { onTimeUpdate: ReactEventHandler<HTMLAudioElement> }
>((props, ref) => (
  <audio
    ref={ref}
    controlsList="nodownload"
    src="https://static.belelabestia.it/Night%20in%20Tokyo%2001%20-%20Simpatico.wav"
    onTimeUpdate={props.onTimeUpdate}
  />
))

export const TimeBar: FC<{
  time: number,
  onTimeChange: (value: number[]) => void
}> = props => (
  <Grid align="center">
    <Slider value={[props.time]} onValueChange={props.onTimeChange} />
  </Grid>
)

export const Buttons: FC<{ audioRef: RefObject<HTMLAudioElement> }> = props => (
  <Grid className={styles.centerItems}>
    <Flex gap="4" m="">
      <Button radius="full" onClick={() => props.audioRef.current?.play()}>{'<-'}</Button>
      <Button radius="full" onClick={() => props.audioRef.current?.pause()}>{'|> / ||'}</Button>
      <Button radius="full">{'->'}</Button>
    </Flex>
  </Grid>
)