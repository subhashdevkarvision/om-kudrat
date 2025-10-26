import { fetchUserWishlist, removeFromWishlist } from "@/api";
import FrontSection from "@/components/frontSection/FrontSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const WishlistPage = () => {
  const { data } = useQuery({
    queryKey: ["userWishlist"],
    queryFn: fetchUserWishlist,
  });
  const queryClient = useQueryClient();
  const removeWishlistMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["userWishlist"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  const userWishList = data?.wishlistData?.length > 0 ? data.wishlistData : [];
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/faq-header-img.png"
        title="Wishlist"
        path="Home"
        subPath="Wishlist"
      />
      <div>
        <h5 className="text-2xl mb-5 text-Chinese-Black font-belfast">
          My Wishlist
        </h5>
        <Table>
          <TableHeader className="text-center text-Black-Olive ">
            <TableRow>
              <TableHead className="" colSpan={3}>
                Products
              </TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center text-xl">
            {userWishList.length > 0 ? (
              userWishList.map((item) => (
                <TableRow
                  key={item._id}
                  className="font-belfast text-Chinese-Black text-xl text-center"
                >
                  <TableCell colSpan={3} className="py-10">
                    <div className="flex items-center gap-5">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${
                          item?.productId?.image
                        }`}
                        className="w-28 rounded-2xl"
                        alt=""
                      />
                      <span className=""> {item?.productId?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-Black-Olive">
                    ${item?.productId?.discountedPrice}
                  </TableCell>
                  <TableCell className="">
                    <div className="flex justify-end">
                      <Trash2
                        onClick={() =>
                          removeWishlistMutation.mutate(item?.productId?._id)
                        }
                        className="cursor-pointer text-[#FF0000]"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Wishlist is empty</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WishlistPage;
