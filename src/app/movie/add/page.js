import Heading from "../../../app/_components/Heading/Heading";
import Form from "../../../components/Form";
import { addMovie } from "../../../actions/addMovie";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Add() {
  const onSubmit = async (data) => {
    "use server";
    let isErrorHandled = false;
    try {
      await addMovie(data);
    } catch (error) {
      console.error("Failed to add movie:", error);
      isErrorHandled = true;
      // TODO: Handle the error appropriately (e.g., show a message to the user)
    } finally {
      if (!isErrorHandled) {
        revalidatePath("/");
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
