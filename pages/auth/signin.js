import { getProviders, signIn } from "next-auth/react";

//client side

export default function signin({ providers }) {
  return (
    <div className="flex justify-center mt-20 space-x-4">
      {/* <img
        src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png"
        alt=""
        className="hidden object-cover md:w-44 md:h-80 rotate-6  md:inline-flex"
      /> */}
      <div className="">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="flex flex-col items-center">
            <img
              className="w-36 object-cover"
              src="https://pbs.twimg.com/media/Fv5TfOYagAA91s-?format=png&name=small"
              alt="ringbooklogo"
            />
            <p className="text-center my-18">Bookkeeping intuitively</p>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              //onClick={onGoogleClick}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
        {/* added on 4:21:34 from the video */}
      </div>
    </div>
  );
}

//server side

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
