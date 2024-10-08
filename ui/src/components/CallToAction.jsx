import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about React Js?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with React Js Projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a target="_blank">
            Explore React Js With Us
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://th.bing.com/th/id/OIP.eWaAwfHby_ps2BLv0B2LEQHaEK?rs=1&pid=ImgDetMain" className="rounded-sm" />
      </div>
    </div>
  );
}
