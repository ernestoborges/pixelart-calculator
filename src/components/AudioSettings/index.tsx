import styled from "styled-components"
import { useAudioContext } from "../../providers/AudioProvider"

export function AudioSettings() {


    const { audioEnabled, audioVolume, audioToggle, handleAudioVolume } = useAudioContext()

    return <>

        <Container>
            <Button
                onClick={() => audioToggle()}
                isEnabled={audioEnabled}
            />
            <div>
                <div>
                    {audioVolume.padStart(3)}
                </div>
                <Label>
                    <img src="/assets/volume-bar.svg" />
                    <VolumeInputCanva>
                        <div>
                            <VolumeRangeInput
                                type="range"
                                name="volume"
                                min={0}
                                max={100}
                                value={audioVolume}
                                onChange={(e) => handleAudioVolume(e.target.value)}
                                style={{ backgroundSize: `${audioVolume}% 100%` }}
                            />
                        </div>
                    </VolumeInputCanva>
                </Label>
            </div>

        </Container>
    </>
}

const Container = styled.div`

    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    & > div {
        display: flex;
        align-items: flex-end;
        gap: 10px;
    }

`

const Button = styled.button<{ isEnabled: boolean }>`
    width: 48px;
    height: 39px;
    background-image: url("/assets/audio-ico${props => props.isEnabled ? "" : "-off"}.png");
    border:0;
    background-color: transparent;
    cursor:pointer;

    &:active{
        background-position: -48px 0; 
    }
`

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    padding-bottom: 4px;

    & > img {
        width: 66px;
        position: absolute;
        bottom: 0px;
        right: -6px;
        z-index: 2;
        pointer-events: none;

    }
`

const VolumeInputCanva = styled.div`
      
    & > div {
        clip-path: polygon(85% 10%, 100% 10%, 100% 100%, 0 100%, 0 75%);
        overflow-hidden;
        display: flex;
    }
`

const VolumeRangeInput = styled.input`
    -webkit-appearance: none;
    width: 53px;
    height: 38px;
    background: rgba(255, 255, 255, 0.3);
    background-image: linear-gradient(#e68746, #e68746);
    background-repeat: no-repeat;
    cursor: pointer;
    outline: transparent;


    &::-webkit-slider-thumb  {
        -webkit-appearance: none;
        width: 2px;
        height: 30px;
        background: #e68746;
        transition: background .3s ease-in-out;
    }
    &::-webkit-slider-runnable-track  {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
      }
`