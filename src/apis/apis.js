import axios from "axios";

const itemsApi = axios.create({
  baseURL: "https://northcoders-news-b-end.herokuapp.com/api",
});

export const fetchArticles = (topic, sort_by, order) => {
  return itemsApi
    .get(`/articles`, { params: { topic, sort_by, order } })
    .then((res) => {
      return res.data.articles;
    });
};

export const fetchArticleById = (article_id) => {
  return itemsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const fetchTopics = () => {
  return itemsApi.get(`/topics`).then((res) => {
    return res.data.topics;
  });
};

export const fetchCommentsById = (article_id) => {
  return itemsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};