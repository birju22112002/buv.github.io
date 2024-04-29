/** @format */

"use client";
import AuthorLayout from "../../../components/layouts/AuthorLayout";
import NewPostComponent from "../../../components/posts/NewPostComponent";

function NewPost() {
  return (
    <AuthorLayout>
      <NewPostComponent page='author' />
    </AuthorLayout>
  );
}

export default NewPost;
