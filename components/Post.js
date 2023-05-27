import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EyeIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled, EyeIcon as EyeIconFilled } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  refEqual,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modalAtom";
import { useRouter } from "next/router";
import AccordionButton from "./AccordionButton";
// import Collapse from "./Collapse";

export default function Post({ post, id }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
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
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post?.data()?.image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }

      router.push("/");
    }
  }

  return (
    <div className="flex border-b border-blue-200 p-3 space-x-3 cursor-pointer">
      {/*user image*/}
      <img
        className="h-11 w-11 rounded-full mr-4 "
        src={post?.data()?.userImg}
        alt="user-img"
      />

      {/*right side */}

      <div className="flex-1">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user info*/}

          <div className="flex space-x-1 whitespace-nowrap ">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              {" "}
              @{post?.data()?.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <DotsHorizontalIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>

        {/* post text*/}

        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="text-gray-800 text-[15px] sm:text-[16px] mb-2"
        >
          {" "}
          {post?.data()?.text}
        </p>

        {/*post image*/}

        <img
          onClick={() => router.push(`/posts/${id}`)}
          className="rounded-2xl mr-2"
          src={post?.data()?.image}
          alt=""
        />

        {/*icons*/}

        <div className="flex justify-between text-gray-500 p2">
          <div className="flex items-center select-none">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
          </div>
          {session?.user.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-10 w-10 hoverEffect p-2 hover:text-red-500 hover:bg-sky-100"
            />
          )}

          <div className="flex items-center">
            {hasLiked ? (
              <EyeIconFilled
                onClick={likePost}
                className="h-10 w-10 hoverEffect p-2 text-green-500 hover:text-green-500 hover:bg-sky-100"
              />
            ) : (
              <EyeIcon
                onClick={likePost}
                className="h-10 w-10 hoverEffect p-2 hover:text-green-500 hover:bg-green-100"
              />
            )}

            {likes.length > 0 && (
              <span
                className={`${
                  hasLiked && "text-green-600"
                } text-sm select-none`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <ChartBarIcon className="h-10 w-10 hoverEffect p-2 hover:bg-sky-100" />
          {/* <Collapse
            toggleButtonOne={toggleButtonOne}
            toggleButtonTwo={toggleButtonTwo}
            toggleButtonThree={toggleButtonThree}
            toggleButtonFour={toggleButtonFour}
            toggleButtonFive={toggleButtonFive}
            toggleButtonSix={toggleButtonSix}
          /> */}
        </div>
      </div>
    </div>
  );
}
