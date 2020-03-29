import { withRouter } from 'next/router'; 
import { Layout, Menu } from 'antd';
import { links } from '../../constants/links';
import AdminSideNav from './AdminSideNav';
import Link from './Link';

const { Header, Content } = Layout;



const MainLayout = ({ children, router, isAdmin }) => {

    const currentPage = `/${router.pathname.split('/')[1]}`;

    const pageContent = (
        <Content
            style={{ padding: '0 50px' }}
            className="site-layout-background"
        >
            {children}
        </Content>
    );


    const layoutBody = isAdmin
        ? (<AdminSideNav pathname={router.pathname}>
            {children}
            </AdminSideNav>
        )
        : pageContent;

    return (
        <Layout className="site-layout">
            <Header>
                <div className="logo"/>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    theme="dark"
                    defaultSelectedKeys={[currentPage]}
                >
                    { links.map(link => (
                        <Menu.Item key={link.href}>
                            <Link item={link} />
                        </Menu.Item>
                    ))}
                </Menu>
            </Header>
            { layoutBody }
        </Layout> 
    );
}

export default withRouter(MainLayout);
