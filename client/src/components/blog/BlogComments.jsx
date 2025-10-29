import React from "react";
import { NotepadText } from "lucide-react";
import IconBadge from "../IconBadge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const BlogComments = () => {
  return (
    <div className="space-y-12 bg-off-white rounded-3xl p-8">
      <div className="space-y-7">
        <h4 className="font-belfast text-2xl text-Chinese-Black">5 Comments</h4>
        <div className="space-y-7">
          {Array(5)
            .fill(null)
            .map((_, id) => (
              <div key={id} className="space-y-5">
                <div>
                  <div className="flex gap-7">
                    <p className="flex items-center">
                      <NotepadText size={24} color="#018d43" />
                      <span className="text-Chinese-Black ml-2.5">
                        June 5, 2024
                      </span>
                    </p>
                    <p className="flex items-center">
                      <NotepadText size={24} color="#018d43" />
                      <span className="text-Chinese-Black ml-2.5">
                        James Crader
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="text-Light-Silver w-80" />
                <p className="text-Black-Olive">
                  Id semper risus in hendrerit gravida rutrum quisque non
                  tellus. Sed lectus vestibulum mattis ullamcorper. Amet
                  venenatis urna cursus eget nunc. Eu augue ut lectus arcu.
                  Fermentum iaculis eu non diam phasellus vestibulum lorem sed
                  risus.Amet venenatis urna cursus eget nunc.
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="space-y-7">
        <h4 className="font-belfast text-2xl text-Chinese-Black">
          Leave Comment
        </h4>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 md:gap-5">
            <Input
              name="name"
              placeholder="Your Name*"
              className="border-grayish-blue border-[1px] py-5 rounded-full shadow-none font-medium text-sm text-Black-Olive placeholder:text-Black-Olive "
            />

            <Input
              name="email"
              placeholder="Your Email*"
              className="border-grayish-blue border-[1px] py-5 shadow-none rounded-full font-medium text-sm text-Black-Olive placeholder:text-Black-Olive"
            />
          </div>
          <Textarea
            name="message"
            placeholder="Your Message*"
            className="border-grayish-blue shadow-none border-[1px] resize-none h-48 rounded-3xl font-medium text-sm text-Black-Olive placeholder:text-Black-Olive ${
              "
          />

          <Button
            variant="primary"
            type="submit"
            className="font-medium w-fit rounded-full text-sm"
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogComments;
