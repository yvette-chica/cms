import { Affix, Card, Input } from 'antd';

const { Search } = Input;

const Sidebar = props => (
    <Affix>
        <Card
            title="Search"
            style={{ marginTop: 20, marginBottom: 20 }}
        >
            <Search
                placeholder="Search for..."
                onSearch={value => console.log(value)}
            /> 
        </Card>
        <Card
            style={{ marginTop: 20, marginBottom: 20 }}
            title="Categories"
        >
            Some Categories 
        </Card>
    </Affix>
);

export default Sidebar;