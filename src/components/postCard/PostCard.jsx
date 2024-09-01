import Image from "next/image"
import styles from "./postCard.module.css"
import Link from "next/link"


const PostCard = ({post}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {post.img && <div className={styles.imgConatiner}>
          <Image src={post.img} alt="Imagem" width={300} height={300} className={styles.img} />
        </div>}
        <span className={styles.date}>{post.createdAt.toString().slice(4, 16)}</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.tittle}>{post.title}</h1>
        <p className={styles.desc}>{post.body}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>READ MORE</Link>
      </div>
    </div>
  )
}

export default PostCard