"use client";

import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import "./workSchedule.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { SidebarContext } from "../../components/header/header";
import { logout, selectUser } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/axios";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1JpRGRGfV5ycEVHYFZRRHxeQk0SNHVRdkdnWH9feHVVRmBdU0RxWEI="
);
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getContrastingColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

const schedule = () => {
  const user = useSelector(selectUser);
  const { collapsed } = useContext(SidebarContext);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const colorMapRef = useRef({});

  useEffect(() => {
    if (user?.id !== null) {
      const fetchData = async () => {
        const response = await api.get("appointment");
        const appointments = response.data.filter(
          (appointment) => appointment.user.id === user?.id
        );
        console.log(appointments);

        // Map the filtered data to the format required by ScheduleComponent
        const mappedData = appointments.map((appointment) => {
          const [day, month, year] = appointment.appointmentDate.split("/");
          const formattedDate = `${year}-${month}-${day}`;
          const startTime = new Date(
            `${formattedDate} ${appointment.slotTime}`
          );
          const endTime = new Date(startTime.getTime() + 60 * 60000); // 60 minutes

          return {
            Id: appointment.id,
            Subject: appointment.serviceName,
            StartTime: startTime,
            EndTime: endTime,
            IsAllDay: false,
          };
        });

        setData(mappedData);
        console.log(mappedData);
        if (mappedData.length > 0) {
          const earliestDate = mappedData.reduce((earliest, current) =>
            current.StartTime < earliest.StartTime ? current : earliest
          ).StartTime;
          setSelectedDate(earliestDate);
        }
      };

      fetchData();
      const intervalId = setInterval(fetchData, 60000);
      return () => {
        clearInterval(intervalId); // Xóa interval khi component unmount
      };
    }
  }, [user?.id]);

  const getColorForEvent = (id) => {
    if (!colorMapRef.current[id]) {
      colorMapRef.current[id] = getRandomColor();
    }
    return colorMapRef.current[id];
  };

  const onEventRendered = (args) => {
    const color = getColorForEvent(args.data.Id.toString());
    args.element.style.backgroundColor = color;
    args.element.style.color = getContrastingColor(color);
  };
  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: collapsed ? "80px" : "240px",
        padding: "20px",
        width: `calc(100% - ${collapsed ? "80px" : "240px"})`,
      }}
    >
      <h2 style={{ padding: "10px" }}>Lịch Cắt Tóc</h2>
      <div
        className="tw-flex tw-justify-center tw-items-center tw-min-h-screen"
        style={{ marginTop: "-100px" }}
      >
        <ScheduleComponent
          width="100%"
          height="650px"
          eventSettings={{ dataSource: data }}
          selectedDate={selectedDate}
          currentView={"Week"}
          eventRendered={onEventRendered}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="Month" />
          </ViewsDirective>

          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    </div>
  );
};

export default schedule;
