import React from "react";
import { useTimer } from "react-timer-hook";

import styles from "./Timer.module.css";

const Timer = ({ time }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => console.warn("onExpire called"),
    autoStart: true,
  });

  return (
    <div className={styles.time}>
      <h3>Time Left</h3>
      <p>
        {hours}:{minutes}:{seconds}
      </p>
    </div>
  );
};

export default React.memo(Timer);
