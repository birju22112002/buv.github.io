/** @format */
"use client";
import AuthorLayout from "../../../components/layouts/AuthorLayout";
import UserComments from "../../../components/comments/UserComments";

function Author() {
  return (
    <AuthorLayout>
      <UserComments />
    </AuthorLayout>
  );
}

export default Author;
