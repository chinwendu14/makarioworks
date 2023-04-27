import React from "react";
import styles from "../../styles/card.module.scss";
const Card = ({ img, day, temp, city, humidity, speed }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainerTodayDiv}>
          <img src={img} alt="img" />
          <p>
            Today
            <br />
            <span>{day}</span>
          </p>
        </div>

        <h4>{temp}&#8451;</h4>

        <p style={{ fontSize: "20px" }}>{city}</p>
        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          Humidity : {humidity} %
        </p>
        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          Wind : {speed} MPH
        </p>
      </div>
    </div>
  );
};

export default Card;
