import Layout from '../../components/Layout';
import { withRouter } from 'next/router'; 
import useSWR from 'swr';
import Markdown from 'react-markdown';
import { Row, Col } from 'antd';
import fetcher from '../../helpers/fetcher';

const Post = ({ router }) => {
    let content = <Layout>No data</Layout>;

    if (router.query.id) {
        const { data, error } = useSWR(
            `/api/posts/${router.query.id}`,
            fetcher
        );

        if (data) {
            const { post, categories } = data;

            content = (
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
    }

    return content;
}

export default withRouter(Post);
