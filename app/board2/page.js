'use client';

import { useState, useEffect } from 'react';
import { fetchTopics, fetchPosts, createTopic, createPost } from '../../utils/dbAccess';
import { getDateTime } from '../../utils/getDateTime';

export default function BoardPage() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [newArticle, setNewArticle] = useState('');

  // トピックデータを初期取得
  useEffect(function () {
    async function loadData() {
      try {
        const records = await fetchTopics();
        console.log( records );
        setTopics( records );
      } catch( err ) {
        console.error( err );
      }
    }
    loadData();
  }, []);

  // 投稿データの取得とトピックIDの設定
  const handleViewPosts = async function (topicId) {
    setSelectedTopicId(topicId);
    try {
      const records = await fetchPosts(topicId);
      console.log( records );
      setPosts( records );
    } catch( err ) {
      console.error( err );
    }
  };

  // トピック作成
  const handleCreateTopic = async function () {
    if (!newTopic.trim()) return;
    try {
      const record = await createTopic( newTopic );
      setTopics( [...topics, record]);
    } catch( err ) {
      console.error( err );
    }
  };

  // 投稿作成
  const handleCreatePost = async function () {
    if (!newUser.trim() || !newArticle.trim() || !selectedTopicId) return;
    const post_at = getDateTime();
    try {
      const record = await createPost( selectedTopicId, newUser, newArticle, post_at );
      setPosts( [...posts, record] );
      setNewUser('');
      setNewArticle('');
    } catch( err ) {
      console.error( err );
    }
  };

  // 戻る
  const handleGoBack = function () {
    setSelectedTopicId(null);
  };

  // トピック一覧画面のレンダリング
  const renderTopics = function () {
    return (
      <div>
        <h1>トピック一覧</h1>
        <table>
          <thead>
            <tr>
              <th>トピック</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(function (topic) {
              return (
                <tr key={topic.id}>
                  <td>{topic.topic}</td>
                  <td>
                    <button onClick={function () { handleViewPosts(topic.id); }}>
                      投稿を見る
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <input
            type="text"
            placeholder="新しいトピック"
            value={newTopic}
            onChange={function (e) { setNewTopic(e.target.value); }}
          />
          <button onClick={handleCreateTopic}>作成する</button>
        </div>
      </div>
    );
  };

  // 投稿一覧画面のレンダリング
  const renderPosts = function () {
    return (
      <div>
        <h1>記事一覧</h1>
        <table>
          <thead>
            <tr>
              <th>投稿日時</th>
              <th>投稿者</th>
              <th>記事</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(function (post) {
              return (
                <tr key={post.id}>
                  <td>{post.post_at}</td>
                  <td>{post.user}</td>
                  <td>{post.article}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <input
            type="text"
            placeholder="投稿者"
            value={newUser}
            onChange={function (e) { setNewUser(e.target.value); }}
          />
          <textarea
            placeholder="記事"
            value={newArticle}
            onChange={function (e) { setNewArticle(e.target.value); }}
          ></textarea>
          <button onClick={handleCreatePost}>投稿する</button>
          <button onClick={handleGoBack}>戻る</button>
        </div>
      </div>
    );
  };

  return selectedTopicId != null ? renderPosts() : renderTopics();
}
