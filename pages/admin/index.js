import { withRouter } from 'next/router'; 
import useSWR from 'swr';
import { Row, Col } from 'antd';
import Layout from '../../components/Layout';
import fetcher from '../../helpers/fetcher';


function AdminPage({router}) {
    const { data, error } = useSWR(
        '/api/posts/index',
        fetcher
    );

    if (!data) return <Layout>No data</Layout>

    return (
        <Layout isAdmin>
            <Row gutter={[20, 20]}>
                <Col>
                    This is the Admin page
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(AdminPage);
