import Form from "../../../../components/Form/Form";
import Content from "./Content";
import { editMovie } from "../../../../actions/editMovie";
import styles from "./movieData.module.css";

export default function MovieData({ editable, movie }) {
  const onSubmit = async (data, images) => {
    "use server";
    await editMovie(data, movie.id, images);
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
