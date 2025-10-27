import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CirclePlus, CircleMinus, Minus } from "lucide-react";

const FaqsComponent = () => {
  const faqs = [
    {
      value: "item-1",
      title: "What shipping methods are available ?",
      description:
        "Marwues rhues edites sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
      value: "item-2",
      title: "How do I track my order ?",
      description:
        "You will receive a tracking link by email once your order is shipped.",
    },
    {
      value: "item-3",
      title: "How can I be sure of the product quality?",
      description:
        "We source only from trusted suppliers with the highest standards.",
    },
    {
      value: "item-4",
      title: "How will I know if order is placed successfully?",
      description:
        "You'll get an order confirmation email right after checkout.",
    },
    {
      value: "item-5",
      title: "Can I cancel my order?",
      description: "You can cancel your order within 24 hours of placing it.",
    },
  ];
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {faqs.length > 0 &&
        faqs.map((item, id) => (
          <AccordionItem key={id} value={item.value}>
            <AccordionTrigger
              showChevronIcon={false}
              className="flex justify-start gap-14 xl:my-4 text-xl group text-black transition-colors
              data-[state=open]:text-text-green data-[state=open]:font-belfast group"
            >
              <span>
                {" "}
                <CirclePlus className="text-text-green group-data-[state=open]:hidden" />
                <CircleMinus className="group-data-[state=closed]:hidden block" />
              </span>
              <span>{item.title}</span>
            </AccordionTrigger>
            <AccordionContent className="text-Black-Olive ml-20 ">
              <p>{item.description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

export default FaqsComponent;
