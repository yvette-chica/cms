import { Row, Col } from 'antd';
import Layout from '../../components/Layout';

function CategoriesPage() {
    return (
        <Layout isAdmin>
            <Row gutter={[20, 20]}>
                <Col>
                    Categories 
                </Col>
            </Row>
        </Layout>
    );
}

export default CategoriesPage;
