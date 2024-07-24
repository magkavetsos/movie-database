import Heading from "../../../app/_components/Heading/Heading";
import Form from "../../../components/Form/Form";
import { addMovie } from "../../../actions/addMovie";
import { redirect } from "next/navigation";

export default function Add() {
  const onSubmit = async (data) => {
    "use server";
    let isErrorHandled = false;
    try {
      await addMovie(data);
    } catch (error) {
      console.error("Failed to add movie:", error);
      isErrorHandled = true;
    } finally {
      if (!isErrorHandled) {
        redirect("/");
      }
    }
  };

  return (
    <>
      <Heading title="Add a new movie" highlighted="MovieFlix library" />
      <Form action={onSubmit} />
    </>
  );
}
