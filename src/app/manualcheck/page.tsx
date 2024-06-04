import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HandThumbDownIcon, HandThumbUpIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ManualCheck() {
  return (
    <main className="bg-gray-200">
        {/* Input bar */}
      <div className="flex justify-center mx-auto px-2 max-w-7xl py-14">
        <Input className="border-black/25" placeholder="Enter URL or content"/>
      </div>

      {/* Fake News Percentage Output*/}
      <div className="flex max-w-7xl mx-auto h-fit justify-center items-center px-2 py-3">
        {/* Fake News Card */}
        <div className="flex flex-col w-full h-fit p-3 gap-y-2 bg-black rounded-3xl text-white">
          {/* Card Title */}
          <div className="flex w-full h-fit px-4 py-3 justify-center items-center">
            <h1 className="text-2xl font-bold">Fake News Detected</h1>
          </div>
          {/* Card Content Div */}
          <div className="flex w-full h-fit p-3 gap-x-3 items-center">
            <h1 className="text-xl text-nowrap font-bold">Confidence Level:</h1>
            <h1 className="text-8xl w-fit text-green-500 font-bold">96%</h1>
            <h1 className="text-xl w-full font-semibold">This article has been flagged as fake because it contains specific red flags which our machine learning model has deemed to relate to fake news.</h1>
          </div>
        </div>
      </div>

      {/* Feedback Div*/}
      <div className="flex max-w-7xl mx-auto h-fit justify-center items-center px-2 py-3">
        {/* Feedback Form */}
        <form className="flex flex-col w-full h-fit p-3 gap-y-2 bg-black rounded-3xl text-white">
          {/* Form Title */}
          <div className="flex w-full h-fit px-4 py-3 justify-center items-center">
            <h1 className="text-2xl font-bold">
              Feedback
            </h1>
          </div>
          {/* Form Content */}
          <div className="flex w-full h-fit p-3 gap-x-3 justify-center items-center">
            <Button className="bg-green-500 rounded-full aspect-square h-fit p-1 hover:bg-green-700">
              <HandThumbUpIcon className="text-black size-8"/>
            </Button>
            <Button className="bg-red-500 rounded-full aspect-square h-fit p-1 hover:bg-red-700">
              <HandThumbDownIcon className="text-black size-8"/>
            </Button>
            <Input className="w-1/2 h-fit text-black" placeholder="Enter your feedback here"/>
            <Button className="border border-gray-700 hover:bg-black hover:border-gray-900" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
