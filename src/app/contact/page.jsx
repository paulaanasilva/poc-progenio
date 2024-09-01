import Image from "next/image";
import styles from "./contact.module.css";

export const metadata = {
  title: 'Contact Page',
  description: 'Contact Description',
}

const ContactPage = () => {

  console.log("its working here");

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/contact.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Nome Completo" />
          <input type="text" placeholder="Endereço de E-mail" />
          <input type="text" placeholder="Telefone (Optional)" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Mensagem"></textarea>
          <button>Send</button>
          </form>
      </div>
    </div>
  );
};

export default ContactPage;