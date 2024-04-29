/** @format */
"use client";
import { Row, Col } from "antd";
import AuthorLayout from "../../../../components/layouts/AuthorLayout";
import MediaLibrary from "../../../../components/media/MediaLibrary";

function AuhtorMediaLibrary() {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary page='author' />
        </Col>
      </Row>
    </AuthorLayout>
  );
}

export default AuhtorMediaLibrary;
