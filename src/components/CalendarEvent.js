import React from "react";
import "../styles/styles.components/CalendarEvent.css";

export default function CalendarEvent() {
  return (
    <>
      <iframe
            className="calendar"
            title="calendar biocal"
            src="https://calendar.google.com/calendar/b/1/embed?title=%E0%B8%9B%E0%B8%8F%E0%B8%B4%E0%B8%97%E0%B8%B4%E0%B8%99%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%99%E0%B8%B4%E0%B8%98%E0%B8%B4%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%8A%E0%B8%B5%E0%B8%A7%E0%B8%A0%E0%B8%B2%E0%B8%9E&height=600&wkst=1&bgcolor=%23FFFFFF&src=6rhodkvpuadh67kvghqgn1ss4g%40group.calendar.google.com&color=%232952A3&src=su90rcvmr5l41vvrudbrs1f2ts%40group.calendar.google.com&color=%2328754E&ctz=Asia%2FBangkok"
            frameBorder={0}
            allowFullScreen
            scrolling="yes"
          />
    </>
  );
}
