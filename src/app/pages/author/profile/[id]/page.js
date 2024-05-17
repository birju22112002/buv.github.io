/** @format */
"use client";
import AuthorLayout from "../../../../components/layouts/AuthorLayout";
import { useState, useEffect, useContext } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../context/auth";
import { useParams } from "next/navigation";
import ProfileUpdate from "../../../../components/user/ProfileUpdate";

const AuthorProfile = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const { id } = useParams();

  useEffect(() => {
    if (auth?.token) loadUser();
  }, [id, auth?.token]);

  const loadUser = async () => {
    try {
      const { data } = await axios.get(`/user/${id}`);
      setAuth({ ...auth, profile: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthorLayout>
      <ProfileUpdate title='Edit profile' />
    </AuthorLayout>
  );
};

export default AuthorProfile;
