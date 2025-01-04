import $ from 'jquery';

const URL="http://localhost/bulletin_board";

export const fetchTopics = () => {
  return $.ajax({
    url: URL+'/topics/find.php',
    method: 'GET',
    dataType: 'json',
  });
};

/**
 * 新しいトピックを作成
 */
export const createTopic = (topic) => {
  return $.ajax({
    url: URL+'/topics/create.php',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data: $.param({ topic }), 
  });
};

/**
 * 指定された topic_id の投稿を全て取得
 */
export const fetchPosts = (topicId) => {
  return $.ajax({
    url: URL+`/posts/find.php?topic_id=${topicId}`,
    method: 'GET',
    dataType: 'json',
  });
};

/**
 * 新しい投稿を作成
 */
export const createPost = (topicId, user, article, postAt) => {
  return $.ajax({
    url: URL+'/posts/create.php',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded',
    data: $.param({
      topic_id: topicId,
      post_at: postAt,
      user,
      article,
    }),
  });
};
