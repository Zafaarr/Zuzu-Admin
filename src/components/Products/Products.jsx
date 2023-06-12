import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Input,
  Button,
  Center,
  Heading,
  Box,
  Stack,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { addItem, getById, updateById } from "../API/service";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const [data, setData] = useState({
    title: "",
    description: "",
    price: [""],
  });

  const onChange = (name, value) => {
    setData((old) => ({ ...old, [`${name}`]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        await updateById("products", id, data);
        toast({
          title: "Product updated.",
          description: "Product updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/products");
      } catch (error) {
        console.log(error);
      }
    } else {
      addItem("products", data);
      setData({
        title: "",
        description: "",
        price: [""],
      });
      toast({
        title: "Product created.",
        description: "Product added successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (id) {
      getById("products", id).then((response) => setData(response.data));
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Center>
        <Box w={"800px"} mt={"80px"}>
          <Stack spacing={"12px"}>
            <Heading>Products</Heading>
            <Box>
              <Heading size={"sm"}>Name</Heading>
              <Input
                onChange={(e) => onChange("title", e.target.value)}
                value={data.title}
              />
            </Box>
            <Box>
              <Heading size={"sm"}>Description</Heading>
              <Input
                onChange={(e) => onChange("description", e.target.value)}
                value={data.description}
              />
            </Box>
            <Box>
              <Heading size={"sm"}>Price</Heading>
              <Input
                onChange={(e) => onChange("price", e.target.value)}
                value={data.price}
              />
            </Box>
            <Flex justifyContent={"end"}>
              {id ? (
                <Button
                  type="submit"
                  colorScheme="blue"
                  rightIcon={<RepeatIcon />}
                >
                  Update
                </Button>
              ) : (
                <Button
                  type="submit"
                  colorScheme="green"
                  rightIcon={<AddIcon />}
                >
                  Add
                </Button>
              )}
            </Flex>
          </Stack>
        </Box>
      </Center>
    </form>
  );
}

// export default function Products() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const toast = useToast();
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//     price: [""],
//   });

//   const onChange = (name, value) => {
//     setData((old) => ({ ...old, [`${name}`]: value }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (id) {
//       try {
//         await updateById("products", id, data);
//         toast({
//           title: "Product updated.",
//           description: "Product updated successfully.",
//           status: "success",
//           duration: 9000,
//           isClosable: true,
//         });
//         navigate("/products");
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       addItem("products", data);
//       setData({
//         title: "",
//         description: "",
//         price: [""],
//       });
//       toast({
//         title: "Product created.",
//         description: "Product added successfully.",
//         status: "success",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//     navigate("/products");
//   };

//   useEffect(() => {
//     if (id) {
//       getById("products", id).then((response) => setData(response.data));
//     }
//   }, []);

//   return (
//     <form onSubmit={onSubmit}>
//       <Center>
//         <Box w={"800px"} mt={"80px"}>
//           <Stack spacing={"12px"}>
//             <Heading>Products</Heading>
//             <Box>
//               <Heading size={"sm"}>Name</Heading>
//               <Input
//                 onChange={(e) => onChange("title", e.target.value)}
//                 value={data.title}
//               />
//             </Box>
//             <Box>
//               <Heading size={"sm"}>Description</Heading>
//               <Input
//                 onChange={(e) => onChange("description", e.target.value)}
//                 value={data.description}
//               />
//             </Box>
//             <Box>
//               <Heading size={"sm"}>Price</Heading>
//               <Input
//                 onChange={(e) => onChange("price", e.target.value)}
//                 value={data.price}
//               />
//             </Box>
//             <Flex justifyContent={"end"}>
//               {id ? (
//                 <Button
//                   type="submit"
//                   colorScheme="blue"
//                   rightIcon={<RepeatIcon />}
//                 >
//                   Update
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   colorScheme="green"
//                   rightIcon={<AddIcon />}
//                 >
//                   Add
//                 </Button>
//               )}
//             </Flex>
//           </Stack>
//         </Box>
//       </Center>
//     </form>
//   );
// }
