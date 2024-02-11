import React from "react";
import Skeleton from "react-loading-skeleton";
import Styles from "../styles/components/sessionskeleton.module.scss"

const SessionSkeleton = () => {
    return (
        <>
            <div className={Styles.desktop_container}>
                <div>
                    <Skeleton width={85} height={69} />
                </div>
                <div>
                    <Skeleton width={125} height={10}/>
                    <Skeleton width={40} height={10}/>
                    <Skeleton width={50} height={10}/>
                </div>
                <div>
                    <Skeleton width={100} height={10}/>
                    <Skeleton width={60} height={20}/>
                </div>
                <div>
                    <Skeleton width={70} height={10}/>
                    <Skeleton width={110} height={20}/>
                </div>
                <div>
                    <Skeleton width={100} height={30}/>
                </div>
            </div>
            <div className={Styles.mobile_container}>
                <div className={Styles.row}>
                    <Skeleton width={100} height={15}/>
                    <Skeleton width={50} height={25}/>
                </div>
                <div className={Styles.row}>
                    <Skeleton width={200} height={15}/>
                </div>
                <div className={Styles.row}>
                    <Skeleton width={150} height={15}/>
                </div>
                <div className={Styles.row}>
                    <Skeleton width={80} height={15}/>
                    <Skeleton width={80} height={15}/>
                </div>
                <div>
                    <Skeleton width={250} height={30}/>
                </div>
            </div>
        </>

    );
};
export default SessionSkeleton;
