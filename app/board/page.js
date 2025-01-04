'use client';

import { useState, useEffect } from 'react';
import { fetchTopics, fetchPosts, createTopic, createPost } from '../../utils/dbAccess';
import { getDateTime } from '../../utils/getDateTime';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';

export default function BoardPage() {
  // トピック関連の状態
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  // 投稿関連の状態
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [newArticle, setNewArticle] = useState('');

  // トピックデータを初期取得
  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(console.error);
  }, []); // 初回レンダリング時にトピックデータを取得

  // 投稿データの取得とトピックIDの設定
  const handleViewPosts = (topicId) => {
    setSelectedTopicId(topicId);
    fetchPosts(topicId)
      .then(setPosts)
      .catch(console.error);
  };

  // トピック関連の関数
  const handleCreateTopic = () => {
    if (!newTopic.trim()) return;
    createTopic(newTopic)
      .then((newRecord) => {
        setTopics([...topics, newRecord]);
        setNewTopic('');
      })
      .catch(console.error);
  };

  const renderTopics = () => (
    <Container className="mt-4">
      <Row className="mt-4">
        <h1 className="mb-4">トピック一覧</h1>
      </Row>
      <Row className="mt-4">
        <Table bordered hover striped size="sm">
          <thead>
            <tr>
              <th className="col-md-10">トピック</th>
              <th className="col-md-2 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr key={topic.id}>
                <td>{topic.topic}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleViewPosts(topic.id)}
                  >
                    投稿を見る
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Form.Control
            type="text"
            placeholder="新しいトピック"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={2}>
          <Button size="sm" variant="success" onClick={handleCreateTopic}>
            作成する
          </Button>
        </Col>
      </Row>
    </Container>
  );

  // 投稿関連の関数
  const handleCreatePost = () => {
    if (!newUser.trim() || !newArticle.trim() || !selectedTopicId) return;
    const post_at = getDateTime();
    createPost(selectedTopicId, newUser, newArticle, post_at)
      .then((newRecord) => {
        setPosts([...posts, newRecord]);
        setNewUser('');
        setNewArticle('');
      })
      .catch(console.error);
  };

  const handleGoBack = () => {
    setSelectedTopicId(null);
  };

  const renderPosts = () => (
    <Container className="mt-4">
      <h1 className="mb-4">記事一覧</h1>
      <Row className="mt-4">
        <Table bordered hover striped size="sm">
          <thead>
            <tr>
              <th className="col-md-2 text-center">投稿日時</th>
              <th className="col-md-2 text-center">投稿者</th>
              <th className="col-md-8 text-center">記事</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="text-center align-middle">{post.post_at}</td>
                <td className="text-center align-middle">{post.user}</td>
                <td className="align-middle">{post.article}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Form className="mt-4">
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="投稿者"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="記事"
              value={newArticle}
              onChange={(e) => setNewArticle(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <Button size="sm" variant="success" onClick={handleCreatePost} className="w-100">
              投稿する
            </Button>
          </Col>
          <Col md={2}>
            <Button size="sm" variant="secondary" onClick={handleGoBack} className="w-100">
              戻る
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );

  return <>{selectedTopicId ? renderPosts() : renderTopics()}</>;
}
