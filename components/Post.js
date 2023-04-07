import { db, storage } from "@/firebase";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EyeIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  refEqual,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";

export default function Post({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", post.id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${post.id}/image`));
      }
    }
  }

  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 cursor-pointer">
      {/*user image*/}
      <img
        className="h-11 w-11 rounded-full mr-4 "
        src={post.data().userImg}
        alt="user-img"
      />

      {/*right side */}

      <div className="">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user info*/}

          <div className="flex space-x-1 whitespace-nowrap ">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              {" "}
              @{post.data().username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>

        {/* post text*/}

        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {" "}
          {post.data().text}
        </p>

        {/*post  image*/}

        <img className="rounded-2xl mr-2" src={post.data().image} alt="" />

        {/*icons*/}

        <div className="flex justify-between text-gray-500 p2">
          <ChatIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100" />
          {session?.user.uid === post?.data().id && (
            <TrashIcon
              onClick={deletePost}
              className="h-10 w-10 hoverEffect p-2 hover:text-red-500 hover:bg-sky-100"
            />
          )}

          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-10 w-10 hoverEffect p-2 text-red-500 hover:text-red-500 hover:bg-sky-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-10 w-10 hoverEffect p-2 hover:text-red-500 hover:bg-sky-100"
              />
            )}

            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <EyeIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100" />
          <ChartBarIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
