/* eslint-disable @next/next/no-img-element */

import styles from "../styles/Home.module.scss";
import Search from "../components/search/Search";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { imagePath } from "../images/index";
import Card from "../components/card/Card";
import moment from "moment-timezone";
// import moment from "moment";
import { getwhether } from "../restApi/restApi";

export default function Home() {
  const [manageState, setManageState] = useState(1);
  const [search, setSearch] = useState("");

  const [manageData, setManagData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getwhether({ city: search });
      if (result) {
        setManagData(result);
      }
    } catch (error) {}
  };
  console.log(manageData);
  // const zone = manageData.city.timezone;
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContainer__fluid}>
        <div className={styles.homeContainer__searchDiv}>
          {manageState === 2 && (
            <p
              className={styles.homeContainer__backIcon}
              onClick={() => setManageState(1)}
            >
              <i>{<MdOutlineArrowBackIosNew />}</i>
            </p>
          )}
          <div style={{ width: "100%" }}>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        {manageData ? (
          <>
            {manageState === 1 && (
              <div className={styles.todayForecast__Container}>
                <h4>Today’s forecast </h4>
                <div className={styles.todayForecast__ContainerFluid}>
                  {/* Todays hourly  forcast */}
                  {manageData?.list.slice(0, 5).map((item, i) => {
                    return (
                      <div
                        className={styles.todayForecast__ContainerForcast}
                        onClick={() => setManageState(2)}
                        key={i}
                      >
                        <p>{item.main.temp.toFixed()} &#8451;</p>
                        {moment()
                          .tz(`${item.dt} ${manageData.city.timezone}`)
                          .format("h:mm a") > "4pm" ? (
                          <img src={imagePath.sunrise} alt="img" />
                        ) : (
                          <img src={imagePath.sunset} alt="img" />
                        )}

                        <p>
                          {moment()
                            .tz(`${item.dt} ${manageData.city.timezone}`)
                            .format("h:mm a")}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* the next Five days forcast */}
                <div className={styles.nextForecast__Container}>
                  <div className={styles.nextForecast__ContainerFluid}>
                    <div className={styles.nextForecast__headerDiv}>
                      <h4>Next forecast </h4>
                      <p className={styles.nextForecast__fiveDays}>Five Days</p>
                    </div>
                    <div
                      className={styles.nextForecast__monthDateFocastContainer}
                    >
                      {manageData?.list.slice(0, 5).map((item, i) => {
                        return (
                          <div
                            className={styles.nextForecast__monthDateFocastDiv}
                            key={i}
                          >
                            <p>
                              {moment()
                                .tz(`${item.dt} ${manageData.city.timezone}`)
                                .format("MMMM Do")}
                            </p>

                            {moment()
                              .tz(`${item.dt} ${manageData.city.timezone}`)
                              .format("h:mm a") > "4pm" ? (
                              <p>
                                <img src={imagePath.sunrise} alt="img" />
                              </p>
                            ) : (
                              <p>
                                <img src={imagePath.sunset} alt="img" />
                              </p>
                            )}
                            <p>{item.main.temp.toFixed()} &#8451;</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* a particular location forcast */}
                  <div className={styles.nextForecast__ContainerLagosDiv}>
                    <div className={styles.nextForecast__ContainerBgColorDiv}>
                      <div className={styles.nextForecast__ContainerBgImg}>
                        <p className={styles.nextForecast__location}>
                          <span>
                            <i>{<CiLocationOn />}</i> {manageData?.city.name}
                          </span>
                        </p>
                        <div className={styles.nextForecast__locationdeg}>
                          <p>
                            {manageData?.list[0].main.temp.toFixed()}&#8451;
                          </p>
                          {moment()
                            .tz(
                              `${manageData?.list[0].dt} ${manageData.city.timezone}`
                            )
                            .format("h:mm a") > "4pm" ? (
                            <img src={imagePath.sunrise} alt="img" />
                          ) : (
                            <img src={imagePath.sunset} alt="img" />
                          )}
                        </div>
                      </div>
                      <div className={styles.nextForecast__sunnyDiv}>
                        <p>
                          {moment()
                            .tz(
                              `${manageData?.list[0].dt} ${manageData.city.timezone}`
                            )
                            .format("dddd Do MMMM")}
                        </p>
                        <p>{manageData?.list[0].weather[0].main}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {manageState === 2 && (
              <Card
                img={`https://openweathermap.org/img/wn/${manageData?.list[0].weather[0].icon}@4x.png`}
                day={moment()
                  .tz(`${manageData?.list[0].dt} ${manageData.city.timezone}`)
                  .format("dddd Do MMMM")}
                temp={manageData?.list[0].main.temp.toFixed()}
                city={` ${manageData.city.country}, ${
                  manageData.city.name
                }. ${moment()
                  .tz(`${manageData?.list[0].dt} ${manageData.city.timezone}`)
                  .format("h:mm a")} `}
                humidity={manageData?.list[0].main.humidity}
                speed={manageData?.list[0].wind.speed}
              />
            )}
          </>
        ) : (
          <div className={styles.cloudDiv}>
            <h1>Check Wheather Forcast</h1>
            <img src={imagePath.bgcloud} alt="img" />
          </div>
        )}
      </div>
    </div>
  );
}
