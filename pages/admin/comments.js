import { Row, Col } from 'antd';
import Layout from '../../components/Layout';

function CommentsPage() {
    return (
        <Layout isAdmin>
            <Row gutter={[20, 20]}>
                <Col>
                    Comments 
                </Col>
            </Row>
        </Layout>
    );
}

export default CommentsPage;
