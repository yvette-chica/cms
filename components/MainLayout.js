import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Header, Content } = Layout;

const CustomLayout = props => (
    <Layout className="site-layout">
        <Header>
            <div className="logo"/>
            <Menu
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                theme="dark"
            >
                <Menu.Item key="1">
                    <Link href="/">
                        <a>Yvette Chica</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link href="/projects">
                        <a>Projects</a>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link href="/blog">
                        <a>Blog</a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
            {props.children}
        </Content>
    </Layout> 
);

export default CustomLayout;
