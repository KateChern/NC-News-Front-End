import React, { useEffect } from "react";
import { useState } from "react";
import * as api from "../../apis/apis";
import CollapseWrapper from "../collapse-wrapper/CollapseWrapper";
import Moment from "react-moment";
import classes from "./Comments.module.css";
import { RiHeart3Line } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";

const CommentsList = ({ commentsCount, articleId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const getComments = () => {
    setIsLoading(true);
    api
      .fetchCommentsById(articleId)
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setError(e.response.data.msg);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getComments();
  }, [articleId, comments.length]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <article className={classes["comment-section"]}>
      <p className={classes.count}>{commentsCount} COMMENTS</p>
      <CollapseWrapper>
        {comments.map((comment) => {
          return (
            <section className={classes.container} key={comment.comment_id}>
              <p className={classes.author}>{comment.author}</p>
              <div className={classes["comment-body"]}>
                <p className={classes.text}>{comment.body}</p>
                <dl className={classes.flex}>
                  <dt>
                    <RiHeart3Line /> {comment.votes}
                  </dt>
                  <Moment format="YYYY/MM/DD">{comment.created_at}</Moment>
                </dl>
              </div>
              <div className={classes.border}></div>
            </section>
          );
        })}
      </CollapseWrapper>
    </article>
  );
};

export default CommentsList;
