import { withRouter } from 'next/router'; 
import Link from 'next/link';
import Layout from '../../components/MainLayout';
import Sidebar from '../../components/Sidebar';
import fetcher from '../../helpers/fetcher';
import useSWR from 'swr';
import { Card, Row, Col, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Meta } = Card;

function Blog({router}) {
    const { data, error } = useSWR(
        '/api/posts/index',
        fetcher
    );

    if (!data) return <Layout>No data</Layout>

    return (
        <Layout>
            <Row gutter={[20, 20]}>
                <Col
                    md={{ span: 17, offset: 1 }}
                    lg={{ span: 10, offset: 4 }}
                >
                    {
                        data.map(post => {
                            return (
                                <Card
                                    key={post._id}
                                    style={{ marginTop: 20, marginBottom: 20 }}
                                    cover={
                                        <img
                                            alt="Cover photo"
                                            src={`/uploads/${post.file}`}
                                        />
                                    }
                                    actions={[<span>Posted by {post.author.firstName}</span>]}
                                >
                                    <Meta
                                        title={post.title}
                                        description={post.body}
                                    />
                                    <br />
                                    <Link href={`/blog/${post.slug}`}>
                                        <Button
                                            icon={<ArrowRightOutlined />}
                                            type="primary"
                                        >
                                            Read more
                                        </Button>
                                    </Link>
                                </Card>
                            );
                        })
                    }
                </Col>
                <Col
                    md={5}
                    lg={6}
                >
                    <Sidebar />
                </Col>
            </Row>
        </Layout>
    );
}

export default withRouter(Blog);
