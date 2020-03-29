import Link from 'next/link';

const MenuItemLink = ({ item }) => (
    <Link href={item.href}>
        <a>
            {item.icon}
            <span>{item.title}</span>
        </a>
    </Link>
);

export default MenuItemLink;
