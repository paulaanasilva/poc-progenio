import { handleLogout } from "@/lib/action";
import styles from "./links.module.css";
import NavLink from "./navlink/NavLink";

const links = [
  {
    title: "Principal",
    path: "/",
  },
  {
    title: "Sobre",
    path: "/about",
  },
  {
    title: "Contato",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  }
];

const Links = ({session}) => {

  const isAdmin = true;

  return (
    <div className={styles.links}>
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
      {session?.user ? (
        <>
          {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
          <form action={handleLogout}>
            <button className={styles.logout}>Sair</button>
          </form>
        </>
      ) : (
        <NavLink item={{ title: "Login", path: "/login" }} />
      )}
    </div>
  )
}

export default Links;