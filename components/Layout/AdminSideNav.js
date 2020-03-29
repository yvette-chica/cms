import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { adminLinks } from '../../constants/links';
import Link from './Link';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const initialCollapsed = false;

const AdminSideNav = ({ children, pathname }) => {
    const [collapsed, onCollapse] = useState(initialCollapsed);

    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                className="site-layout-background"
            >
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={['/admin/posts']}
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        adminLinks.map(item => {
                            if (item.subItems) {
                                return (
                                    <SubMenu
                                        key={item.href}
                                        title={
                                            <span>
                                                {item.icon} 
                                                <span>{item.title}</span>
                                            </span>
                                        }
                                    >
                                        {item.subItems.map(subItem => (
                                            <Menu.Item key={subItem.href}>
                                                <Link item={subItem} />
                                            </Menu.Item>
                                        ))}
                                    </SubMenu>
                                );
                            } else {
                                return (
                                    <Menu.Item key={item.href}>
                                        <Link item={item} />
                                    </Menu.Item>
                                );
                            }
                        })
                    }
                </Menu>
            </Sider>
            <Layout>
                <Content
                    style={{ padding: '0 50px' }}
                    className="site-layout-background"
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminSideNav;
