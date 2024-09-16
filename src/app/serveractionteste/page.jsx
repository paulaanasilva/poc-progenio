import { addCurso, addPost, deleteCurso, deletePost, updateCurso } from "@/lib/action"


const ServerActionTestePage = () => {

    return (
        <div>
            <form action={addPost}>
                <input type="text" placeholder="title" name="title"/>
                <input type="text" placeholder="desc" name="desc" />
                <input type="text" placeholder="slug" name="slug"/>
                <input type="text" placeholder="userId" name="userId"/>
                <button>Add Post</button>
            </form>

            <form action={deletePost}>
                <input type="text" placeholder="postId" name="id"/>
                <button>Delete Post</button>
            </form>

            <p>Add Curso</p>
            <form action={addCurso}>
                <input type="text" placeholder="nome" name="nome"/>
                <input type="text" placeholder="descricao" name="descricao" />
                <button>Add Curso</button>
            </form>

            <p>Delete Curso</p>
            <form action={deleteCurso}>
                <input type="text" placeholder="postId" name="id"/>
                <button>Delete Curso</button>
            </form>

            <p>Update Curso</p>
            <form action={updateCurso}>
                <input type="text" placeholder="id" name="id"/>
                <input type="text" placeholder="nome" name="nome"/>
                <input type="text" placeholder="descricao" name="descricao" />
                <button>Update Curso</button>
            </form>

        </div>
    );

}  

export default ServerActionTestePage;