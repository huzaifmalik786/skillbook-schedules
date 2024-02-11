import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Styles from "../../styles/components/landingPage/video.module.scss";
import { image_type, images } from "../../interfaces/interfaces";
import { removeBodyScrollingWhenModalOpen } from "../RemoveScroll";
import { useScreenDimensions } from "use-screen-dimensions";

type Props = {
  handleClose: Function;
  video: image_type;
  open?: boolean;
};

const VideoPlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { width } = useScreenDimensions();
  const isMobile = width < 950;

  useEffect(() => {
    // Disable body scroll when modal is opened
    removeBodyScrollingWhenModalOpen(true, isMobile)

    // Re-enable body scroll when modal is closed
    return () => {
      removeBodyScrollingWhenModalOpen(false, isMobile)
    };
  }, []);

  useEffect(() => {
    const keyDownHandler = (event:any) => {
      console.log('User pressed: ', event.key);

      if (event.key === 'Escape') {
        event.preventDefault();
        props.handleClose();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    // 👇️ clean up event listener
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);
  return (
    <>
      {props?.open &&
        <div className={Styles.player_wrapper} id="video_player">
          <button onClick={() => props.handleClose()} className={Styles.close_btn}>
            <Image src={"/close.svg"} height={40} width={40} alt="close-icon" />
          </button>
          <div className={Styles.video_container} >
            <div className={Styles.over} >
              <video
                preload="metadata"
                playsInline
                ref={videoRef}
                loop
                controls
                className={Styles.video}
              >
                <source src={`${props?.video?.data?.attributes?.url}#t=0.001`} type="video/mp4"></source>
              </video>
            </div>
          </div>
        </div>
      }
    </>

  );
};

export default VideoPlayer;
