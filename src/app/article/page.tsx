import LikeDislikeBar from "@/components/LikeDislikeBar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HandThumbDownIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";

export default function ArticleDetail() {

    // Pull from database and put the img src as well as desc here
    const articleDetail = { src: "/dummyIMG/corgi.webp", desc: "In this screen grab taken from a video released by the Weifang public security bureau, Fuzai is seen wearing a police dog vest, in eastern China's Shandong province" };
  return (
    <main className="bg-gray-200">
      {/* Main Container */}
      <div className="flex flex-col mx-auto px-2 max-w-5xl">
        {/* Article Title */}
        <div className="flex text-3xl font-semibold py-6">
          <h1>
            Paw patrol: China's most popular new police officer is a corgi
          </h1>
        </div>

        {/* Article Details */}
        <div className="flex justify-between text-sm font-light h-fit">
          {/* Article Source and Date */}
          <div>
            <div>
              <h1>By Jessie Yeung and Hassan Tayir, CNN</h1>
            </div>
            <div>
              <h1>Fri, 29 March 2024</h1>
            </div>
          </div>

          {/* Article Views */}
          <div className="flex flex-col min-h-full justify-end">
            <h1 className="">231,029 views</h1>
          </div>
        </div>

        {/* Article AI Check and Thumbnail */}
        <div className="py-6">
          {/* AI Check */}
          <div className="flex justify-between bg-black text-white items-center text-2xl font-bold py-4 px-5 rounded-3xl max-w-4xl mx-auto">
            <h1>93%</h1>
            <h1>Fake News Detected</h1>
            {/* Like/Dislike Button Container */}
            <div className="flex gap-x-3">
                <Button className="bg-green-500 rounded-full aspect-square h-fit p-1 hover:bg-green-700">
                  <HandThumbUpIcon className="text-black size-8" />
                </Button>
                <Button className="bg-red-500 rounded-full aspect-square h-fit p-1 hover:bg-red-700">
                  <HandThumbDownIcon className="text-black size-8" />
                </Button>
            </div>
          </div>

          {/* Article Like/Dislike Bar */}
          <div className="flex justify-end py-5 pr-12 w-full py-2">
            <LikeDislikeBar/>
          </div>

          {/* Article Thumbnail and Description */}
          <div className="flex flex-col mx-auto max-w-3xl text-sm text-justify font-light gap-y-5">
            <img src={articleDetail.src} alt="" />
            <span>{articleDetail.desc}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex flex-col gap-y-5 py-5 max-w-2xl mx-auto">
          <p>
            China’s sprawling security apparatus has a far-from-cuddly
            reputation, but the country’s most popular new police officer is
            making waves on social media with his stubby legs, wide grin and
            wagging tail.
          </p>
          <p>
            Fuzai the corgi puppy, whose name means “Lucky Boy,” is a reserve
            police dog in Weifang, a city in the eastern province of Shandong.
            The uniformed pooch made his debut at an open-day event organized by
            Weifang police earlier this month, according to state-run media.
          </p>
          <p>
            He immediately became a social media phenomenon, with one video of
            Fuzai viewed more than 1.3 million times on the Chinese platform
            Weibo, where a related hashtag has been viewed nearly 16 million
            times.Fuzai began training at two months old and now, at six months,
            is outperforming many of his peers, according to state media.
          </p>
        </div>
      </div>
    </main>
  );
}
