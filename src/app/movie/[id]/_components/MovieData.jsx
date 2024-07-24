import Form from "../../../../components/Form/Form";
import Content from "./Content";
import { editMovie } from "../../../../actions/editMovie";
import styles from "./movieData.module.css";
import { redirect } from "next/navigation";

export default function MovieData({ editable, movie }) {
  const onSubmit = async (data) => {
    "use server";
    let isErrorHandled = false;
    try {
      await editMovie(data, movie.id);
    } catch (error) {
      console.error("Failed to edit movie:", error);
      isErrorHandled = true;
    } finally {
      if (!isErrorHandled) {
        redirect("/");
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      {editable ? (
        <Form movie={movie} action={onSubmit} />
      ) : (
        <Content movie={movie} />
      )}
    </div>
  );
}
