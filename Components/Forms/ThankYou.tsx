import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import Styles from '../../styles/components/forms/ThankYou.module.scss'
import { useScreenDimensions } from 'use-screen-dimensions'
import { removeBodyScrollingWhenModalOpen } from '../RemoveScroll';
import { image_type } from '../../interfaces/interfaces';

type Props = {
  setModal: (open: boolean) => void;
  openModal: boolean
  data?: {
    Image: image_type;
    Heading: string;
    Description: string;
    ButtonText: string;
  }
}

const ThankYou: React.FC<Props> = ({ setModal, openModal, data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useScreenDimensions();

  const isMobile = width < 950;

  const handleClickOutside = (event: MouseEvent) => {

    if ((event?.target as HTMLInputElement)?.id === 'modal') {
      setModal(!openModal)
    }
  };
  useEffect(() => {
    // Disable body scroll when modal is opened
    removeBodyScrollingWhenModalOpen(true, isMobile)

    // Re-enable body scroll when modal is closed
    return () => {
      removeBodyScrollingWhenModalOpen(false, isMobile)
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      console.log('User pressed: ', event.key);

      if (event.key === 'Escape') {
        event.preventDefault();
        setModal(false);
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
      {openModal && (
        <div className={Styles.modal_container}>
          <div className={Styles.modal} ref={ref} id="modal">
            <div className={Styles.thank_you_modal}>
              <button type="button" className={Styles.cross_icon} onClick={() => setModal(false)}>
                <Image src="/Icon.svg" alt="icon" width={16} height={16} />
              </button>
              <div className={Styles.upper_content}>
                <div className={Styles.icon}>
                  <Image src={data?.Image?.data?.attributes?.url} alt={data?.Image?.data?.attributes?.alternativeText} width={48} height={48} style={{ objectFit: "contain" }} />
                </div>
                <div className={Styles.content}>
                  <h2 className='h2'>{data?.Heading}</h2>
                  <p className='p'>{data?.Description}</p>
                </div>
              </div>
              <button className={Styles.explore} onClick={() => setModal(false)}>{data?.ButtonText}</button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ThankYou;