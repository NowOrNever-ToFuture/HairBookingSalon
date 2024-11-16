import "./services.css"; // Nếu cần thêm tùy chỉnh CSS
import image_service from "../../assets/service/pool-table-bg.jpg";
import tocdep_1 from "../../assets/tocdep/tocdep_1.jpg";
import tocdep_2 from "../../assets/tocdep/tocdep_2.jpg";
import tocdep_3 from "../../assets/tocdep/tocdep_3.jpg";
import tocdep_4 from "../../assets/tocdep/tocdep_4.jpg";
import tocdep_5 from "../../assets/tocdep/tocdep_5.jpg";
import tocdep_6 from "../../assets/tocdep/tocdep_6.jpg";
import tocdep_7 from "../../assets/tocdep/tocdep_7.jpg";
import tocdep_8 from "../../assets/tocdep/tocdep_8.jpg";
import tocdep_9 from "../../assets/tocdep/tocdep_9.jpg";
import tocdep_10 from "../../assets/tocdep/tocdep_10.jpg";
import haircut from "../../assets/service/haircut.jpg";
import hairdye from "../../assets/service/hairdye.jpg";
import hairwash from "../../assets/service/hairwash.jpg";
import Kien from "../../assets/stylist/Kien.jpg";
import Khanh from "../../assets/stylist/Khanh.jpg";
import Vu from "../../assets/stylist/Vu.jpg";
import Trung from "../../assets/stylist/Trung.jpg";
import { Card, Row, Col } from 'antd';
const { Meta } = Card;

const Services = () => {
  return (
    <div>
      {/* Banner */}
      <div className="position-relative">
        <img
          src={image_service}
          alt="Service Banner"
          className="img-fluid"
          style={{ width: "100%", height: "auto" }} // Giữ tỉ lệ khung hình
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="banner-title">DỊCH VỤ</h1>
        </div>
      </div>

      {/* Tiêu đề */}
      <div className="text-center mt-4">
        <h1 style={{ fontWeight: "bold", fontSize: "40px", marginBottom: '1.5rem' }}>
          TRẢI NGHIỆM SẼ CÓ Ở B-LOCAL
        </h1>
      </div>

      {/* Thẻ Card ngang */}
      <Card
        className="service-card"
        style={{
          width: '100%', // Giảm chiều rộng của card
          margin: '0 auto', // Canh giữa card
          maxWidth: '90%', // Giới hạn chiều rộng tối đa của card
          marginBottom: '2rem' // Khoảng cách từ thẻ dưới
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8} md={6}>
            <img
              alt="Cắt Tóc Nam Cao Cấp"
              src={haircut}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col xs={24} sm={16} md={18}>
            <div style={{ padding: '16px' }}>
              <Meta
                title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Cắt Tóc Nam Cao Cấp</span>}
                description={
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    Trải nghiệm cắt tóc nam cao cấp tại B-Local không chỉ đơn thuần là việc chăm sóc mái tóc, mà còn là
                    hành trình giúp phái mạnh thể hiện phong cách và cá tính riêng của mình. Với đội ngũ thợ cắt chuyên nghiệp,
                    giàu kinh nghiệm, chúng tôi luôn nắm bắt được xu hướng tóc mới nhất và tư vấn những kiểu tóc phù hợp nhất với
                    khuôn mặt, lối sống, và phong cách cá nhân của bạn. Từ những kiểu tóc cổ điển lịch lãm đến phong cách hiện đại,
                    chúng tôi cam kết mang đến cho bạn một diện mạo tự tin, nổi bật và phong cách. Cùng với dịch vụ thư giãn tận
                    tình như gội đầu, massage da đầu, bạn sẽ cảm nhận được sự khác biệt từ khoảnh khắc bước chân vào salon cho đến
                    khi rời đi với một mái tóc hoàn hảo.
                  </span>
                }
              />
            </div>
          </Col>
        </Row>
      </Card>

      <Card
        className="service-card"
        style={{ // Khoảng cách từ thẻ trên
          width: '100%', // Giảm chiều rộng của card
          margin: '0 auto', // Canh giữa card
          maxWidth: '90%', // Giới hạn chiều rộng tối đa của card
          marginBottom: '2rem' // Khoảng cách từ thẻ dưới
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row gutter={16} align="middle">
          {/* Mô tả nằm bên trái */}
          <Col xs={24} sm={16} md={18}>
            <div style={{ padding: '16px' }}>
              <Meta
                title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Nhuộm Tóc Thời Thượng</span>}
                description={
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    Tại B-Local, nhuộm tóc không chỉ là một quá trình thay đổi màu sắc, mà là cách để bạn thể hiện cá tính
                    và phong cách độc đáo của riêng mình. Với các sản phẩm nhuộm tóc chất lượng cao và an toàn, chúng tôi mang
                    đến cho khách hàng bảng màu đa dạng từ những tông màu tự nhiên, trầm ấm đến những sắc màu nổi bật, thời thượng.
                    Đội ngũ chuyên gia về màu sắc của chúng tôi sẽ tư vấn kỹ lưỡng để đảm bảo rằng màu tóc bạn chọn không chỉ hợp xu
                    hướng mà còn phù hợp với màu da, tính cách và phong cách sống của bạn. Quá trình nhuộm tóc tại B-Local diễn ra
                    nhẹ nhàng, êm ái, kết hợp với các bước dưỡng tóc đặc biệt để giúp tóc của bạn luôn mềm mượt, chắc khỏe và bền màu
                    theo thời gian. Hãy đến với chúng tôi để trải nghiệm một diện mạo hoàn toàn mới, đầy thu hút và tự tin!
                  </span>
                }
              />
            </div>
          </Col>
          {/* Ảnh nằm bên phải */}
          <Col xs={24} sm={8} md={6}>
            <img
              alt="Nhuộm Tóc Thời Thượng"
              src={hairdye}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Col>
        </Row>
      </Card>

      <Card
        className="service-card"
        style={{
          marginTop: '2rem',
          width: '100%', // Giảm chiều rộng của card
          margin: '0 auto', // Canh giữa card
          maxWidth: '90%', // Giới hạn chiều rộng tối đa của card
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8} md={6}>
            <img
              alt="Gội Đầu Thư Giãn"
              src={hairwash}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col xs={24} sm={16} md={18}>
            <div style={{ padding: '16px' }}>
              <Meta
                title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Gội Đầu Thư Giãn</span>}
                description={
                  <span style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    Tại B-Local, dịch vụ gội đầu không chỉ đơn thuần là việc làm sạch tóc mà còn là một trải nghiệm thư giãn tuyệt vời giúp bạn thoát khỏi căng thẳng và lo âu hàng ngày. Chúng tôi sử dụng các sản phẩm gội đầu cao cấp, chứa các thành phần tự nhiên và tinh dầu thơm, mang lại cảm giác dễ chịu và thư giãn tối đa cho bạn. Đội ngũ nhân viên của chúng tôi sẽ tận tình massage da đầu, giúp kích thích lưu thông máu, làm dịu các cơ và mang lại cảm giác thoải mái cho cơ thể. Quá trình gội đầu được thiết kế để phù hợp với từng loại tóc và da đầu, giúp loại bỏ bụi bẩn, dầu thừa và tế bào chết, đồng thời nuôi dưỡng và bảo vệ mái tóc của bạn. Hãy đến với B-Local để trải nghiệm dịch vụ gội đầu thư giãn, giúp bạn không chỉ sạch sẽ mà còn sảng khoái, đầy năng lượng cho một ngày mới!
                  </span>
                }
              />
            </div>
          </Col>
        </Row>
      </Card>

      <div style={{ marginTop: '2rem', maxWidth: '90%', margin: '0 auto' }}>
        <h1 style={{ fontWeight: "bold", fontSize: "40px", marginBottom: '1.5rem', marginTop: '2rem', textAlign: 'center' }}>
          GẶP GỠ ĐỘI NGŨ STYLIST CỦA CHÚNG TÔI
        </h1>

        {/* Phần Stylist */}

        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <div className="stylist-card">
              <img
                src={Kien}
                alt="Stylist Kien"
                className="img-fluid"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px' }}
              />
              <div className="stylist-info">
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Nguyễn Chí Kiên</h2>
                <p style={{ fontSize: '16px' }}>
                  Kiên là một stylist có hơn 5 năm kinh nghiệm trong ngành cắt tóc nam.
                  Anh nổi bật với khả năng tư vấn và tạo kiểu tóc hiện đại, phù hợp với phong cách của từng
                  khách hàng. Kiên luôn đảm bảo mỗi khách hàng rời salon với một diện mạo hoàn hảo và tự tin.
                </p>
              </div>
            </div>
          </Col>
          {/* Thêm 3 stylist khác ở đây */}
          <Col xs={24} sm={12} md={6}>
            <div className="stylist-card">
              <img
                src={Vu} // Thay bằng ảnh stylist khác
                alt="Stylist Vu"
                className="img-fluid"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px' }}
              />
              <div className="stylist-info">
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Trần Mạnh Vũ</h2>
                <p style={{ fontSize: '16px' }}>
                  Vũ là một stylist trẻ trung và sáng tạo, với khả năng nắm bắt xu hướng tóc mới nhất.
                  Anh chuyên về cắt tóc nam, đặc biệt là các kiểu tóc hiện đại như fade và undercut.
                  Khách hàng luôn cảm thấy thoải mái và vui vẻ khi đến salon gặp Vũ.</p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="stylist-card">
              <img
                src={Khanh} // Thay bằng ảnh stylist khác
                alt="Stylist Khanh"
                className="img-fluid"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px' }}
              />
              <div className="stylist-info">
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Nguyễn Duy Khánh</h2>
                <p style={{ fontSize: '16px' }}>
                  Khánh có đam mê với cắt tóc nam và đã có hơn 7 năm kinh nghiệm. Anh chuyên về các kiểu tóc ngắn
                  và cổ điển, giúp khách hàng tạo nên phong cách riêng biệt. Sự chuyên nghiệp và tận tâm của Minh
                  khiến khách hàng luôn hài lòng với lựa chọn của mình.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="stylist-card">
              <img
                src={Trung} // Thay bằng ảnh stylist khác
                alt="Stylist Trung"
                className="img-fluid"
                style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '20px' }}
              />
              <div className="stylist-info">
                <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Vũ Thành Trung</h2>
                <p style={{ fontSize: '16px' }}>
                  Trung có hơn 6 năm kinh nghiệm trong lĩnh vực làm tóc nam. Anh chuyên về các kiểu tóc lịch lãm và
                  sang trọng, giúp khách hàng tự tin hơn trong các sự kiện quan trọng. Với kỹ năng và sự tận tâm,
                  Trung cam kết mang đến cho khách hàng trải nghiệm tuyệt vời khi đến salon.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>


      {/* Thư viện ảnh */}
      <div style={{ marginBottom: "1rem", marginTop: '-29px' }}>
        <h1
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "1rem",
          }}
        >
          FEEDBACK CỦA KHÁCH HÀNG
        </h1>

        <div className="gallery-container">
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_1} alt="Tóc đẹp 1" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_2} alt="Tóc đẹp 2" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_3} alt="Tóc đẹp 3" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_4} alt="Tóc đẹp 4" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_5} alt="Tóc đẹp 5" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_6} alt="Tóc đẹp 6" className="img-fluid" loading="lazy" />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_7} alt="Tóc đẹp 7" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_8} alt="Tóc đẹp 8" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_9} alt="Tóc đẹp 9" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_10} alt="Tóc đẹp 10" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_1} alt="Tóc đẹp 11" className="img-fluid" loading="lazy" />
            </Col>
            <Col xs={12} sm={8} md={4}>
              <img src={tocdep_2} alt="Tóc đẹp 12" className="img-fluid" loading="lazy" />
            </Col>
          </Row>
        </div>
      </div>
    </div >
  );
};

export default Services;
