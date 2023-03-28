import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Sahand Ghavidal",
      username: "Codewithsahand",
      userImg:
        "https://pbs.twimg.com/profile_images/1608511415010181125/5guBM8qs_400x400.jpg",
      img: "https://images.unsplash.com/photo-1679926820639-56c6f62e516e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "nice view!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Sahand Ghavidal",
      username: "Codewithsahand",
      userImg:
        "https://pbs.twimg.com/profile_images/1608511415010181125/5guBM8qs_400x400.jpg",
      img: "https://images.unsplash.com/photo-1544896916-6c9b00a2ca30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "nice shot",
      timestamp: "2 months ago",
    },
  ];

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>

        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>

      <Input />



      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))
      
      } 
    </div>
  );
}
