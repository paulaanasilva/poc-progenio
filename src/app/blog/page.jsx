import PostCard from "@/components/postCard/PostCard";
import styles from "./blog.module.css";
import { getPost } from "@/lib/data";


const getData = async () => {
    // Se quiser fazer o DELETE, deve alterar o method para DELETE
    // const res = await fetch('http://localhost:3000/api/blog', {method: 'DELETE'});


    const res = await fetch('http://localhost:3000/api/blog', {next:{revalidate:3600}});

    if (!res.ok) {
        throw new Error('something went wrong');
    }

    return res.json();
};


export const metadata = {
    title: 'Blog Page Title',
    description: 'Blog Description',
}

const BlogPage = async () => {

    //Fetch data from API
    const posts = await getData();

    //Fetch data from local data.js
    //const posts = await getPosts();

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post} />
                </div>
            ))}
        </div>
    );
};

export default BlogPage;