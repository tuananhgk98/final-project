export const menuItem: Array<object> = [

    {
        title: 'Trang chủ',
        elementOnUrl : 'home', //kiểm tra xem có trong url không để active menu item
        class: 'material-icons',
        icon:'home',
        link : '/pages/home'
    },
    
    {
        title: 'Khách hàng',
        elementOnUrl : 'customer', 
        class: 'material-icons',
        icon:'assignment_ind',
        link : '/pages/customer'
    },

    {
        title: 'Nhân viên',
        elementOnUrl : 'employee',
        class: 'material-icons',
        icon:'group',
        link : '/pages/employee'
    },

    {
        title: 'Lịch',
        elementOnUrl : 'schedule',
        class: 'material-icons',
        icon:'date_range',
        link : '/pages/schedule'
    },

    {
        title: 'Báo cáo',
        elementOnUrl : 'client',
        class: 'material-icons',
        icon:'assignment',
        link : ''
    }

]