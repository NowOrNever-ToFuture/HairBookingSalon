describe('End-to-End Tests', () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/")
    })

    it('Should navigate to the home page', () => {
        cy.contains('Trang chủ').click()
        cy.url().should('include', '/')
        cy.get('.carousel-item').should('have.length', 4)
        cy.get('.carousel-item').each(($el, index) => {
            cy.wrap($el).find('img').should('have.attr', 'src').and('include', 'Background')
        })
        cy.contains('B-Local Salon')
        cy.contains('HIỆN TẠI LÀ TƯƠNG LAI')
        cy.contains('KHÔNG SỢ THỜI TRANG LUÂN HỒI & THAY ĐỔI XU HƯỚNG.')
        cy.contains('Chào mừng đến với B-Local Salon')
        cy.contains('TÌM HIỂU THÊM').click()
        cy.url().should('include', '/about')
    })

    it('Should display the booking section', () => {
        cy.contains('Sẵn Sàng Đặt Lịch')
        cy.contains('Đặt Lịch Cắt Tóc')
        cy.contains('Đặt Lịch Ngay').click()
        cy.url().should('include', '/login')
    })

    it('Should display the location section', () => {
        cy.contains('Chi Nhánh B-Local Gần Bạn')
        cy.contains('Xem Chi Nhánh').click()
        cy.url().should('include', '/location')
    })

    it('Should display the services section', () => {
        cy.contains('Dịch Vụ Của Chúng Tôi')
        cy.contains('Xem Dịch Vụ').click()
        cy.url().should('include', '/services')
    })

    it('Should display the customer feedback section', () => {
        cy.contains('Đánh Giá Của Khách Hàng')
        cy.get('.mySwiper').should('exist')
        cy.get('.swiper-slide').should('have.length.greaterThan', 0)
    })

    it('Should display the service cards', () => {
        cy.get('.card-container').should('have.length', 3)
    })

    it('Should display the footer', () => {
       cy.contains('Liên Kết Nhanh')
       cy.contains('Thông Tin Liên Hệ')
       cy.contains('B-Local Salon: Nơi tỏa sáng phong cách, chăm sóc tóc chuyên nghiệp tại địa phương.')
    })

    it('Should navigate to the about page', () => {
        cy.contains('Về B-Local').click()
        cy.url().should('include', '/about')
    })

    it('Should navigate to the service page', () => {
        cy.contains('Dịch vụ').click()
        cy.url().should('include', '/services')
    })

    it('Should navigate to the location page', () => {
        cy.contains('Vị trí').click()
        cy.url().should('include', '/location')
    })

    it('Should navigate to the login page', () => {
        cy.contains('Đăng nhập').click()
        cy.url().should('include', '/login')
        cy.get('#login_username').should('be.visible')
        cy.get('#login_password').should('be.visible')
        cy.contains('Quên mật khẩu')
        cy.contains('ĐĂNG NHẬP')
      })
      
      it('Login with manager role', () => {
        cy.contains('Đăng nhập').click()
        cy.url().should('include', '/login')
        cy.get('#login_username').type('pilaf')
        cy.get('#login_password').type('123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/manager/dashboard')
    })

    it('Login with admin role', () => {
        cy.contains('Đăng nhập').click()
        cy.url().should('include', '/login')
        cy.get('#login_username').type('quangminh')
        cy.get('#login_password').type('123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/admin/dashboard')
    })

    it('Login with customer role', () => {
        cy.contains('Đăng nhập').click()
        cy.url().should('include', '/login')
        cy.get('#login_username').type('tanthuan')
        cy.get('#login_password').type('123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/')
        cy.contains('ĐẶT LỊCH NGAY').click()
        cy.url().should('include', '/booking')
    })

    it('Login with staff role', () => {
        cy.contains('Đăng nhập').click()
        cy.url().should('include', '/login')
        cy.get('#login_username').type('yenvy')
        cy.get('#login_password').type('123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/staff/appointment')
        cy.contains('LỊCH HẸN')
    })

    it('Login with stylist role', () => {
        cy.contains('Đăng nhập').click()
        cy.url().should('include', '/login')
        cy.get('#login_username').type('ngoctu')
        cy.get('#login_password').type('123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/stylist/schedule/personal')
        cy.contains('Lịch Cắt Tóc')
    })
      

    it('Should navigate to the booking page', () => {
        cy.contains('ĐẶT LỊCH NGAY').click()
        cy.url().should('include', '/login')
    })

    // Add more tests as needed
})