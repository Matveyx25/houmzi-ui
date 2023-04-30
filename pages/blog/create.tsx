import s from './blog.module.scss';
import { Layout } from '../../src/containers/layout/layout-container';
import { Editor } from '../../src/components/blog/editor/editor';

const Blog = () => {
	return (
  <Layout title="Blog">
    <section className={s.blog}>
			<Editor/>
    </section>
  </Layout>
)};

export default Blog;