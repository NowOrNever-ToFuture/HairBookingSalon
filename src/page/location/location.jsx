import { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Button } from "antd";
import image_service from "../../assets/service/pool-table-bg.jpg";
import { PhoneTwoTone, EnvironmentTwoTone } from "@ant-design/icons";
import api from "../../config/axios";
import "./location.css"; // Assume you have some custom styles for alignment

const locationMap = {
  map1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.292710508143!2d106.6935797749792!3d10.78887865896403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f34d02e2369%3A0x9d872a92cb2ff806!2zMTIzIMSQaeG7h24gQmnDqm4gUGjhu6csIMSQYSBLYW8sIFF14bqtbiAxLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1728571285447!5m2!1svi!2s",
  map2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0242125086343!2d106.7080775790927!3d10.809457331123879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a2bd258c91%3A0x66671231939044f7!2zMTIzIFVuZyBWxINuIEtoacOqbSwgUGjGsOG7nW5nIDI1LCBCw6xuaCBUaOG6oW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1728571416143!5m2!1svi!2s",
};

const Location = () => {
  const cardContainerRef = useRef(null); // For dynamic height
  const [data, setData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Set dynamic height for map to match the card container
  const mapHeight = "510px";

  const fetchData = async () => {
    try {
      const response = await api.get("branch");

      setData(response.data);
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        setSelectedBranch(response.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMap = () => {
    if (!selectedBranch) return null;

    return (
      <iframe
        width="100%"
        height="100%"
        src={locationMap[selectedBranch.imageSrc.split(" ")[1]]}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        title="Google Map"
        style={{ border: "none", borderRadius: "8px" }}
      ></iframe>
    );
  };

  // useEffect(() => {
  //   if (cardContainerRef.current) {
  //     setMapHeight(`${cardContainerRef.current.offsetHeight}px`);
  //   }
  // }, [cardContainerRef.current]);

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     setSelectedBranch(data[0]);
  //   }
  // }, [data]);

  return (
    <div
      style={{ marginTop: "20px", marginBottom: "1rem", overflowX: "hidden" }}
    >
      <div className="image-section position-relative">
        <img src={image_service} alt="Example" className="img-fluid" />
        <div className="overlay position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="about-title" style={{ fontWeight: "bold" }}>
            VỊ TRÍ
          </h1>
        </div>
      </div>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Column thông tin chi nhánh */}
        <Col
          xs={24}
          lg={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card
            style={{
              width: "90%",
            }}
            ref={cardContainerRef}
          >
            {data.map((data) => (
              <Card
                key={data.id}
                style={{
                  marginBottom: "16px",
                  padding: "12px",
                  width: "100%",
                  borderRadius: "8px",
                  textAlign: "center", // Canh giữa text
                }}
              >
                <h4 style={{ color: "red", textAlign: "center" }}>
                  {data.branchName}
                </h4>
                <p style={{ marginBottom: "8px" }}>
                  <EnvironmentTwoTone twoToneColor="#eb5566" />{" "}
                  {data.branchAddress}
                </p>
                <p>
                  <PhoneTwoTone twoToneColor="#52c41a" />{" "}
                  {data.branchPhoneNumber}
                </p>
                <div style={{ padding: "2px" }}>
                  <Button
                    type="primary"
                    onClick={() => setSelectedBranch(data)}
                    style={{ background: "red" }}
                  >
                    Xem trên bản đồ
                  </Button>
                </div>
              </Card>
            ))}
          </Card>
        </Col>

        {/* Column Google Map */}
        <Col xs={24} lg={14}>
          <div style={{ width: "100%", height: mapHeight }}>{renderMap()}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Location;
