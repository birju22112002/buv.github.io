/** @format */
"use client";

import UserComments from "../../../components/comments/UserComments";
import SubscriberLayout from "@/src/app/components/layouts/SubscriberLayout";

function Comments() {
  return (
    <SubscriberLayout>
      <UserComments />
    </SubscriberLayout>
  );
}

export default Comments;
