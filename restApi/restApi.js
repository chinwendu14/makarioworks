import axios from "axios";
import React from "react";

const API_key = "4dbedf89c7864b1b6e8bf771a6be21de";
export const getwhether = async ({ city }) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&id=524901&appid=${API_key}`
    );
    const res = response.data;
    return res;
  } catch (error) {
    console.log(error);
    // throw error;
  }
};
