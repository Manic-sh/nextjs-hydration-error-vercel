"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";

interface CounterProps {
  initialCount?: number;
  code?: any;
  myVal?: any;
}

function Counter({ initialCount = 99, code, myVal }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className={styles.counter}>
      <button className={styles.btn} onClick={decrement}>
        -
      </button>
      <span className={styles.count}>{count}</span>
      <button className={styles.btn} onClick={increment}>
        +
      </button>

      <div>{code}</div>
      {myVal?.map((el: any) => {
        <div>{el.subfieldText}</div>;
      })}
    </div>
  );
}

export default Counter;
