import Heading from "../../../app/_components/Heading/Heading";
import Form from "../../../components/Form/Form";
import { addMovie } from "../../../actions/addMovie";

export default function Add() {
  const onSubmit = async (data, images) => {
    "use server";
    await addMovie(data, images);
  };

  return (
    <>
      <Heading title="Add a new movie" highlighted="MovieFlix library" />
      <Form action={onSubmit} />
    </>
  );
}
