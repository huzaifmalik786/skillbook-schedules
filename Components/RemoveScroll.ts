import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const removeBodyScrollingWhenModalOpen = (modalOpen: boolean, isMobile: boolean) => {
    const body = document.body;
    if (modalOpen && isMobile) {
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        body.style.position = 'fixed';
        body.style.width = "100%";
        body.style.top = `-${scrollY}`;
    } else if (!modalOpen && isMobile) {
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        ScrollTrigger.refresh();
    } else if (modalOpen) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'visible';
    }
};