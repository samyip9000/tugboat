import Image from "next/image";

import SidebarMenuItem from "./SidebarMenuItem";
import {
  HomeIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className=" sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      {/* Logo */}
      <div className=" p-0 hover:brightness-95 xl:px-1">
        <img
          width="50"
          height="50"
          src="https://pbs.twimg.com/media/Fv5TfOYagAA91s-?format=png&name=small"
          alt=""
        />
      </div>
      {/* Menu */}
      <div className=" mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Inbox" Icon={HomeIcon} active />
        <SidebarMenuItem text="Search" Icon={HashtagIcon} />

        {session && (
          <>
            <SidebarMenuItem text="Notification" Icon={BellIcon} />
            <SidebarMenuItem text="Journals" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Reports" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Backend" Icon={UserIcon} />
            <SidebarMenuItem text="Setting" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {/* Button */}

      {session ? (
        <>
          <button className="bg-yellow-100 text-blue rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline ">
            Scribble
          </button>
          {/* Mini-Profile */}
          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              src={session.user.image}
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{session.user.name}</h4>
              <p className="text-gray-500">@{session.user.username}</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
          <SidebarMenuItem
            text="Sign out"
            Icon={ArrowCircleLeftIcon}
            actionOnClick={signOut}
          />
        </>
      ) : (
        <button
          onClick={signIn}
          className="bg-yellow-100 text-blue rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg xl:inline"
        >
          {" "}
          Sign in
        </button>
      )}
    </div>
  );
}
