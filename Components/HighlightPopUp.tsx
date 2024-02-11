import React, { useEffect, useRef } from "react";
import Styles from "../styles/highlightpopup.module.scss";
import Image from "next/image";
import { useScreenDimensions } from "use-screen-dimensions";
import { removeBodyScrollingWhenModalOpen } from "./RemoveScroll";

type Props = {
    setOpenModal: (open: boolean) => void;
    openModal: boolean;
    active: number;
    images: any;
    setActive: (active: number) => void
};


const HighlightModal: React.FC<Props> = ({ setOpenModal, openModal, images, active, setActive }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { width } = useScreenDimensions();

    const isMobile = width < 950;

    const handlePrev = (active: number) => {
        if (active == 0) {
            setActive(images?.length - 1);
        }
        else {
            setActive(active - 1);
        }
    }
    const handleNext = (active: number) => {
        if (active == images?.length - 1) {
            setActive(0);
        }
        else {
            setActive(active + 1);
        }
    }

    const handleClickOutside = (event: MouseEvent) => {

        if ((event?.target as HTMLInputElement)?.id === 'modal') {
            setOpenModal(!openModal)
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
            if (event.key === 'Escape') {
                event.preventDefault();
                setOpenModal(false);
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
                        <div className={Styles.section}>
                            <div className={Styles.header}>
                                <button type="button" className={Styles.cross_icon} onClick={() => setOpenModal(false)}>
                                    <Image src="/Icon.svg" alt="icon" width={16} height={16} />
                                </button>
                            </div>
                            <button className={Styles.prev} onClick={() => handlePrev(active)}>
                                <Image src={"/prev.svg"} height={12} width={12} alt="prev" />
                            </button>
                            <div className={Styles.image_container}>
                                <Image
                                    style={{ objectFit: "contain" }}
                                    key={images[active].id}
                                    src={isMobile ? images[active]?.mobile_image?.data?.attributes?.url : images[active]?.desktop_image?.data?.attributes?.url}
                                    width={215}
                                    height={215}
                                    alt={isMobile ? images[active]?.mobile_image?.data?.attributes?.alternativeText : images[active]?.desktop_image?.data?.attributes?.alternativeText}
                                />
                            </div>

                            <button className={Styles.next} onClick={() => handleNext(active)}>
                                <Image src={"/right-arrow.svg"} height={12} width={12} alt="prev" />
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HighlightModal;
