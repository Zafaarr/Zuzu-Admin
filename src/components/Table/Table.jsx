import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  Spacer,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { ButtonGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { adminService } from "../API/service";
import {
  AddIcon,
  ArrowForwardIcon,
  DeleteIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

export default function DynamicTable() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const toast = useToast();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  // GELALL

  const {
    data: items,
    refetch,
    isLoading,
  } = useQuery(slug, () => adminService.getAll(slug).then((res) => res.data));

  // DELETE
  const deleteMutation = useMutation(adminService.deleteById, {
    onSuccess: () => {
      refetch({});
      setIsLoadingDelete(false);
    },
    onMutate: () => {
      setIsLoadingDelete(true);
    },
  });

  const onDeleteClick = (id) => {
    setIsLoadingDelete(true);
    deleteMutation.mutate({ slug, id });
    toast({
      position: "top-right",
      description: "Item deleted successfuly.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const navigateToOtherTable = () => {
    if (slug === "branches") {
      navigate("/products");
    } else if (slug === "products") {
      navigate("/branches");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  const fileds = items?.length ? Object.keys(items[0]) : [];

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            {fileds.map((title) => (
              <Th key={title}>
                <Heading textAlign={"center"} size={"md"} key={title}>
                  {title}
                </Heading>
              </Th>
            ))}
            <Th>
              <Flex alignItems={"center"}>
                <Heading textAlign={"center"} size={"md"}>
                  Actions
                </Heading>
                <Spacer />
                <Link to={`/${slug}/create`}>
                  <Button rightIcon={<AddIcon />} colorScheme="green">
                    Add
                  </Button>
                </Link>
                <Spacer />
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items?.length &&
            items.map((element) => (
              <Tr key={element.id}>
                {fileds.map((key) => (
                  <Td key={key}>{element[key]}</Td>
                ))}
                <Td>
                  <Flex>
                    <Link to={`/${slug}/update/${element.id}`}>
                      <Button rightIcon={<RepeatIcon />} colorScheme="red">
                        Update
                      </Button>
                    </Link>
                    <Spacer />
                    <Button
                      onClick={() => onDeleteClick(element.id)}
                      isLoading={isLoadingDelete}
                      rightIcon={<DeleteIcon />}
                      colorScheme="blue"
                    >
                      Delete
                    </Button>
                    <Spacer />
                  </Flex>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <Button
        mt={4}
        ml={5}
        colorScheme="teal"
        rightIcon={<ArrowForwardIcon />}
        onClick={navigateToOtherTable}
      >
        {slug === "branches" ? "Go to Products Table" : "Go to Branches Table"}
      </Button>
    </TableContainer>
  );
}

// export default function DynamicTable() {
//   const { slug } = useParams();
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     setIsLoading(true);
//     adminService
//       .getAll(slug)
//       .then((response) => setData(response.data))
//       .finally(() => setIsLoading(false));
//   }, []);

//   const onDeleteClick = (id) => {
//     adminService
//       .deleteById(slug, id)
//       .then((response) => {
//         setIsLoading(true);
//         toast({
//           position: "top-right",
//           title: response.message,
//           description: "Item deleted successfuly.",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//         adminService
//           .getAll(slug)
//           .then((response) => setData(response.data))
//           .finally(() => setIsLoading(false));
//       })
//       .catch((error) => {
//         toast({
//           position: "top-right",
//           title: error.message,
//           description: "Something wrong.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       });
//   };

//   const fileds = data?.length ? Object.keys(data[0]) : [];

//   return (
//     <TableContainer>
//       <Table variant="striped" colorScheme="teal">
//         <Thead>
//           <Tr>
//             {fileds.map((title) => (
//               <Th key={title}>
//                 <Heading textAlign={"center"} size={"md"} key={title}>
//                   {title}
//                 </Heading>
//               </Th>
//             ))}
//             <Th>
//               <Flex alignItems={"center"}>
//                 <Heading textAlign={"center"} size={"md"}>
//                   Actions
//                 </Heading>
//                 <Spacer />
//                 <Link to={`/${slug}/create`}>
//                   <Button rightIcon={<AddIcon />} colorScheme="green">
//                     Add
//                   </Button>
//                 </Link>
//                 <Spacer />
//               </Flex>
//             </Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {data.map((element) => (
//             <Tr key={element.name}>
//               {fileds.map((key) => (
//                 <Td key={key}>{element[key]}</Td>
//               ))}
//               <Td>
//                 <Flex>
//                   <Link to={`/${slug}/update/${element.id}`}>
//                     <Button
//                       isLoading={isLoading}
//                       rightIcon={<RepeatIcon />}
//                       colorScheme="red"
//                     >
//                       Update
//                     </Button>
//                   </Link>
//                   <Spacer />
//                   <Button
//                     isLoading={isLoading}
//                     onClick={() => onDeleteClick(element.id)}
//                     rightIcon={<DeleteIcon />}
//                     colorScheme="blue"
//                   >
//                     Delete
//                   </Button>
//                   <Spacer />
//                 </Flex>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </TableContainer>
//   );
// }
