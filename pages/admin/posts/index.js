import { withRouter } from 'next/router'; 
import { Row, Col } from 'antd';
import Layout from '../../../components/Layout';

function PostsPage() {
    return (
        <Layout isAdmin>
            <Row gutter={[20, 20]}>
                <Col>
                    Posts table goes here 
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(PostsPage);
