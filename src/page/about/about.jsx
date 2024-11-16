/* eslint-disable react/no-unknown-property */
import "./about.css";
import image_service from "../../assets/service/pool-table-bg.jpg";

const About = () => {
  const videoURL =
    "https://firebasestorage.googleapis.com/v0/b/hair-salon-booking-app-1dbe9.appspot.com/o/barbershop.mp4?alt=media&token=c0e483eb-c91c-4be5-a5cd-eca10dcc738f";
  return (
    <div className="about-container">
      <div className="image-section position-relative">
        <img src={image_service} alt="Example" className="img-fluid" />
        <div className="overlay position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="about-title" style={{ fontWeight: 'bold' }}>VỀ B-LOCAL</h1>
        </div>
      </div>
      <div className="video-section text-center">
        <div className="video-container">
          <video className="about-video" autoPlay loop muted>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="about-description text-center">
        <h2 className="section-title">Trải nghiệm đẳng cấp tại B-Local</h2>
        <p className="section-text">
          B-Local tự hào là điểm đến đẳng cấp cho quý ông tại Thành phố Hồ Chí
          Minh, nơi mang đến trải nghiệm chăm sóc tóc vượt trội trong không gian
          sang trọng và tinh tế. Chúng tôi cam kết cung cấp dịch vụ hoàn hảo, từ
          những kiểu cắt tóc thời thượng cho đến các liệu trình chăm sóc tóc cao
          cấp, tất cả đều được thực hiện bởi đội ngũ thợ cắt tóc giàu kinh
          nghiệm, am hiểu phong cách và luôn chú trọng đến từng chi tiết nhỏ
          nhất.
        </p>
        <p className="section-text">
          Tại B-Local, mỗi khách hàng không chỉ được tôn vinh vẻ đẹp nam tính mà
          còn tận hưởng sự thư thái trong không gian đầy phong cách. Với dịch vụ
          đa dạng từ cắt tóc, gội đầu cho đến các gói chăm sóc tóc đặc biệt dành
          riêng cho trẻ em, chúng tôi mang lại sự hài lòng tuyệt đối cho từng
          khoảnh khắc trải nghiệm. Bước vào B-Local, quý khách sẽ cảm nhận ngay
          sự khác biệt đẳng cấp và tinh tế trong từng dịch vụ chúng tôi cung
          cấp.
        </p>
      </div>
    </div>
  );
};
export default About;
