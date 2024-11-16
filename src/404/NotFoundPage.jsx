import React from 'react';
import { Link } from 'react-router-dom';
import image_404 from '../assets/image/404.png';

const NotFoundPage = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            textAlign: 'center'
        }}>
            <img src={image_404} style={{ width: '30rem' }} alt="404 Not Found" />
            <h2>TRANG BẠN TÌM KIẾM KHÔNG TỒN TẠI</h2>
            <h5>Có thể URL bị hỏng hoặc đã bị quản trị viên xóa bỏ</h5>
            <Link to="/" >Trở về trang chủ</Link>

        </div>
    );
};

export default NotFoundPage;
