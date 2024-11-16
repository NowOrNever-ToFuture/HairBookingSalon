import React, { useEffect, useRef, useContext, useState } from "react";
import {
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from "./property-pane";
import { SidebarContext } from "../../components/header/header";
import api from "../../config/axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./stylistSchedule.css";

const ManageEmployeeSchedule = () => {
  const [stylists, setStylists] = useState([]);
  const [stylistSchedule, setStylistSchedule] = useState([]);
  const [filteredStylistSchedule, setFilteredStylistSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { collapsed } = useContext(SidebarContext);
  const [stylistColors, setStylistColors] = useState({});

  const [stylistScheduleObj, setStylistScheduleObj] = useState({});
  // const stylistRefs = useRef([]);
  const scheduleRef = useRef(null);

  useEffect(() => {
    const fetchStylistSchedule = async () => {
      const response = await api.get("appointment");
      const appointments = response.data.filter(
        (appointment) => appointment.user.role === "STYLIST"
      );
      console.log(appointments);

      // Map the filtered data to the format required by ScheduleComponent
      const mappedData = appointments.map((appointment) => {
        const [day, month, year] = appointment.appointmentDate.split("/");
        const formattedDate = `${year}-${month}-${day}`;
        const startTime = new Date(`${formattedDate} ${appointment.slotTime}`);
        const endTime = new Date(startTime.getTime() + 60 * 60000); // 60 minutes

        return {
          Id: appointment.id,
          Subject: appointment.serviceName,
          StylistName: appointment.user.username,
          StartTime: startTime,
          EndTime: endTime,
          IsAllDay: false,
          OwnerId: appointment.user.id,
        };
      });

      setStylistSchedule(mappedData);
      console.log("Mapped Data:", mappedData);
      // if (mappedData.length > 0) {
      //   const earliestDate = mappedData.reduce((earliest, current) =>
      //     current.StartTime < earliest.StartTime ? current : earliest
      //   ).StartTime;
      //   setSelectedDate(earliestDate);
      // }
      // if (scheduleRef.current) {
      //   scheduleRef.current.refreshEvents();
      // }
      if (mappedData.length > 0) {
        const currentDate = new Date();
        const nearestDate = mappedData.reduce((nearest, current) => {
          const currentStartTime = new Date(current.StartTime);
          const nearestStartTime = new Date(nearest.StartTime);
          return Math.abs(currentStartTime - currentDate) <
            Math.abs(nearestStartTime - currentDate)
            ? current
            : nearest;
        }).StartTime;
        setSelectedDate(nearestDate);
      }
      if (scheduleRef.current) {
        scheduleRef.current.refreshEvents();
      }
    };

    fetchStylistSchedule();
  }, []);

  useEffect(() => {
    const newColors = {};
    stylists.forEach((stylist) => {
      if (!stylistColors[stylist.id]) {
        newColors[stylist.id] = getRandomColor();
      }
    });
    setStylistColors((prevColors) => ({ ...prevColors, ...newColors }));
  }, [stylists]);

  useEffect(() => {
    const styleSheet = document.styleSheets[document.styleSheets.length - 1];
    Object.keys(stylistColors).forEach((id) => {
      const color = stylistColors[id];
      const className = `stylist-${id}`;
      const rule = `.${className} { background-color: ${color} !important; }`;
      console.log(`Injecting rule: ${rule}`); // Add this line for debugging
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    });
  }, [stylistColors]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const filtered = stylistSchedule.filter(
      (appointment) => stylistScheduleObj[appointment.OwnerId]
    );
    setFilteredStylistSchedule(filtered);

    // Làm mới lịch sau khi cập nhật dữ liệu
    if (scheduleRef.current) {
      scheduleRef.current.refreshEvents();
    }
  }, [stylistSchedule, stylistScheduleObj]);

  // useEffect(() => {
  //   if (scheduleRef.current) {
  //     scheduleRef.current.refreshEvents();
  //   }
  // }, [filteredStylistSchedule]);

  const fetchStylists = async () => {
    try {
      const response = await api.get("user");
      const stylists = response.data.filter((user) =>
        ["STYLIST"].includes(user.role)
      );
      setStylists(stylists);
    } catch (error) {
      console.log(error);

      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  // useEffect(() => {
  //   const selectedStylistIds = Object.keys(stylistScheduleObj)
  //     .map(Number)
  //     .filter((id) => stylistScheduleObj[id]);

  //   const filtered = stylistSchedule.filter((event) =>
  //     selectedStylistIds.includes(event.OwnerId)
  //   );

  //   setFilteredStylistSchedule(filtered);

  //   // Làm mới lịch sau khi cập nhật dữ liệu
  //   if (scheduleRef.current) {
  //     scheduleRef.current.refreshEvents();
  //   }
  // }, [stylistScheduleObj, stylistSchedule]);

  useEffect(() => {
    const initialScheduleObj = {};
    stylists.forEach((stylist) => {
      initialScheduleObj[stylist.id] = true;
    });
    setStylistScheduleObj(initialScheduleObj);
    console.log("Stylists:", stylists);
    console.log("Initial Schedule Object:", initialScheduleObj);
  }, [stylists]);

  // useEffect(() => {
  //   console.log("Stylist Schedule:", stylistSchedule);
  //   console.log("Stylist Schedule Object:", stylistScheduleObj);
  //   console.log("Filtered Stylist Schedule:", filteredStylistSchedule);
  // }, [stylistSchedule, stylistScheduleObj, filteredStylistSchedule]);

  // useEffect(() => {
  //   stylists.forEach((stylist) => {
  //     console.log(`Stylist ID: ${stylist.id}, Type: ${typeof stylist.id}`);
  //   });
  //   stylistSchedule.forEach((event) => {
  //     console.log(
  //       `Event OwnerId: ${event.OwnerId}, Type: ${typeof event.OwnerId}`
  //     );
  //   });
  // }, [stylists, stylistSchedule]);

  const onStylistChange = (stylistId, checked) => {
    setStylistScheduleObj((prev) => ({
      ...prev,
      [stylistId]: checked,
    }));
    console.log(`Stylist ${stylistId} checked: ${checked}`);
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
      <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
        <h2 style={{ margin: 0 }}>Quản Lí Lịch Stylist</h2>
      </div>
      <div className="schedule-control-section row">
        <div className="col-lg-10 control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              cssClass="resource"
              width="100%"
              height="650px"
              selectedDate={selectedDate}
              ref={scheduleRef}
              eventSettings={{ dataSource: filteredStylistSchedule }}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="OwnerId"
                  title="Owners"
                  name="Owners"
                  allowMultiple={true}
                  dataSource={stylists.map((stylist) => ({
                    Text: stylist.username,
                    Id: stylist.id,
                    Color: stylistColors[stylist.id],
                  }))}
                  textField="Text"
                  idField="Id"
                  colorField="Color"
                />
              </ResourcesDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop,
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
        <div className="col-lg-2 property-section">
          <PropertyPane title="Stylist">
            <table
              id="property"
              title="Resources"
              className="property-panel-table"
            >
              <tbody>
                {stylists.map((stylist) => (
                  <tr key={stylist.id}>
                    <td>
                      {/* <CheckBoxComponent
                        value={stylist.id}
                        id={`stylist${stylist.id}`}
                        className={`stylist-${stylist.id}`}
                        checked={stylistScheduleObj[stylist.id]}
                        label={stylist.email}
                        change={(e) => onStylistChange(stylist.id, e.checked)}
                      /> */}

                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked
                              value={stylist.id}
                              id={`stylist${stylist.id}`}
                              checked={stylistScheduleObj[stylist.id]}
                              onChange={(e) =>
                                onStylistChange(stylist.id, e.target.checked)
                              }
                              sx={{
                                color: stylistColors[stylist.id],
                                "&.Mui-checked": {
                                  color: stylistColors[stylist.id],
                                },
                              }}
                            />
                          }
                          label={stylist.email}
                        />
                      </FormGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployeeSchedule;
