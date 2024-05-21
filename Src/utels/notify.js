import { Notification } from "../../DB/models/notification.model.js";

export const notify = async ({ type,senderId ,to, postId, jobId, commentId,content }) => {
    if (type === "follow") {
    return await Notification.create({
        senderId,
        receiverId:to,
        postId:postId || null,
        jobId: jobId || null,
        commentId: commentId || null,
        content
    });
    } else if (type === "unfollow") {
        return await Notification.create({
            senderId,
            receiverId:to,
            postId:postId || null,
            jobId: jobId || null,
            commentId: commentId || null,
            content
        });
    } else if (type === "removeFollower") {
        return await Notification.create({
            senderId,
            receiverId:to,
            postId:postId || null,
            jobId: jobId || null,
            commentId: commentId || null,
            content
        });
    } else if (type === "react") {
        return await Notification.create({
            senderId,
            receiverId:to,
            postId:postId || null,
            jobId: jobId || null,
            commentId: commentId || null,
            content
        });
    } else if (type === "comment") {
        return await Notification.create({
            senderId,
            receiverId:to,
            postId:postId || null,
            jobId: jobId || null,
            commentId: commentId || null,
            content
        });
    } else if (type === "application" ) {
        return await Notification.create({
            senderId,
            receiverId:to,
            postId:postId || null,
            jobId: jobId || null,
            commentId: commentId || null,
            content
        });
    } else if (type === "sharePost") {
    await Promise.all(
    to.map((receiverId) => {
        return Notification.create({
            senderId,
            receiverId,
            postId:postId || null,
            jobId: jobId || null,
            commentId: commentId || null,
            content
        });
    })
    );
    } else if (type === "shareJob") {
    await Promise.all(
    to.map((receiverId) => {
        return Notification.create({
            senderId,
            receiverId,
            postId:postId || null,
            jobId: jobId || null,
            commentId: commentId || null,
            content
        });
    })
    );
    }
};