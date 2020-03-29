import {
  DashboardOutlined,
  FileOutlined,
  ApartmentOutlined,
  CommentOutlined,
} from '@ant-design/icons';

export const adminLinks = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: <DashboardOutlined />,
    },
    {
        title: 'Posts',
        href: '/admin/posts',
        icon: <FileOutlined />,
        subItems: [
            {
                title: 'All Posts',
                href: '/admin/posts',
            },
            {
                title: 'My Posts',
                href: '/admin/posts/my-posts',
            },
            {
                title: 'Create Post',
                href: '/admin/posts/create',
            },
        ],
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: <ApartmentOutlined />,
    },
    {
        title: 'Comments',
        href: '/admin/comments',
        icon: <CommentOutlined />,
    },
];

export const links = [
    {
        title: 'Yvette Chica',
        href: '/',
    },
    {
        title: 'Projects',
        href: '/projects',
    },
    {
        title: 'Blog',
        href: '/blog',
    },
    {
        title: 'Admin',
        href: '/admin',
    },
];