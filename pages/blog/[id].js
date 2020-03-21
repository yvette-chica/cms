import Layout from '../../components/MainLayout';
import { withRouter } from 'next/router'; 
import useSWR from 'swr';
import Markdown from 'react-markdown';
import { Card, Row, Col, Button } from 'antd';
import fetcher from '../../helpers/fetcher';
import Sidebar from '../../components/Sidebar';

const Post = ({ router }) => {
    const { data, error } = useSWR(
        `/api/posts/${router.query.id}`,
        fetcher
    );
    if (!data) return <Layout>No data</Layout>
    const { post, categories } = data;

    return (
        <Layout>
            <Row gutter={[20, 20]}>
                <Col
                    md={{ span: 17, offset: 1 }}
                    lg={{ span: 10, offset: 4 }}
                >
                    <h1>{post.title}</h1>
                    <img
                        alt={post.title}
                        src={`/uploads/${post.file}`}
                    />
                    <div className="markdown">
                        <Markdown
                            source={post.body}
                        />
                    </div>
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(Post);
