import { AddIcon, ArrowForwardIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Input,
  Button,
  Flex,
  Center,
  Box,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { adminService } from "../API/service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

// export default function Branches() {
//   const { id } = useParams();
//   const toast = useToast();

//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     from_time: "",
//     to_time: "",
//     address: "",
//     number: "",
//   });

//   const onChange = (name, value) => {
//     setData((old) => ({ ...old, [${name}]: value }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (id) {
//       adminService.updateById("branches", id, data);
//       toast({
//         title: "Branch updated.",
//         description: "Branch updated successfully.",
//         status: "success",
//         duration: 9000,
//         isClosable: true,
//       });
//     } else {
//       adminService.addItem("branches", data);
//       setData({
//         name: "",
//         description: "",
//         from_time: "",
//         to_time: "",
//         address: "",
//         number: "",
//       });
//       toast({
//         title: "Branch created.",
//         description: "Branch added successfully.",
//         status: "success",
//         duration: 9000,
//         isClosable: true,
//       });
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       adminService.getById("branches", id).then((response) => {
//         setData(response.data);
//       });
//     }
//   }, []);

//   return (
//     <form onSubmit={onSubmit}>
//       <Center>
//         <Box w={"800px"} mt={"80px"}>
//           <Stack spacing={"12px"}>
//             <Heading>Branches</Heading>
//             <Box>
//               <Heading size={"sm"}>Name</Heading>
//               <Input
//                 onChange={(e) => onChange("name", e.target.value)}
//                 value={data.name}
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
//               <Heading size={"sm"}>From Time</Heading>
//               <Input
//                 onChange={(e) => onChange("from_time", e.target.value)}
//                 value={data.from_time}
//               />
//             </Box>
//             <Box>
//               <Heading size={"sm"}>To Time</Heading>
//               <Input
//                 onChange={(e) => onChange("to_time", e.target.value)}
//                 value={data.to_time}
//               />
//             </Box>
//             <Box>
//               <Heading size={"sm"}>Address</Heading>
//               <Input
//                 onChange={(e) => onChange("address", e.target.value)}
//                 value={data.address}
//               />
//             </Box>
//             <Box>
//               <Heading size={"sm"}>Number</Heading>
//               <Input
//                 onChange={(e) => onChange("number", e.target.value)}
//                 value={data.number}
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

export default function Branches() {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const createMutation = useMutation(adminService.addItem, {
    onSuccess: () => {
      reset({});
    },
  });

  const updateMutation = useMutation(adminService.updateById, {
    onSuccess: (response) => {
      console.log(response);
      navigate("/branches");
    },
  });

  // GetByID
  const { data } = useQuery(
    ["getById"],
    () => adminService.getById("branches", id),
    {
      enabled: !!id,
      onSuccess: (response) => reset(response.data),
    }
  );

  const onSubmit = (body) => {
    if (id) {
      updateMutation.mutate({ slug: "branches", id, body });
      toast({
        title: "Branch updated.",
        description: "Branch updated successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      createMutation.mutate({ slug: "branches", body });
      setValue("name", "");
      setValue("description", "");
      setValue("from_time", "");
      setValue("to_time", "");
      setValue("address", "");
      setValue("number", "");
      toast({
        title: "Branch created.",
        description: "Branch added successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (id) {
      adminService.getById("branches", id).then((res) => reset(res.data));
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data?.name,
      description: data?.description,
      from_time: data?.from_time,
      to_time: data?.to_time,
      address: data?.address,
      number: data?.number,
    },
  });

  return (
    <form onSubmit={handleSubmit((body) => onSubmit(body))}>
      <Center>
        <Box w={"800px"} mt={"80px"}>
          <Stack spacing={"12px"}>
            <Heading>Branches</Heading>
            <Box>
              <Heading size={"sm"}>Name</Heading>
              <Input {...register("name", { required: true })} />
              {errors.name && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Box>
            <Box>
              <Heading size={"sm"}>Description</Heading>
              <Input {...register("description", { required: true })} />
              {errors.description && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Box>
            <Box>
              <Heading size={"sm"}>From Time</Heading>
              <Input {...register("from_time", { required: true })} />
              {errors.from_time && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Box>
            <Box>
              <Heading size={"sm"}>To Time</Heading>
              <Input {...register("to_time", { required: true })} />
              {errors.to_time && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Box>
            <Box>
              <Heading size={"sm"}>Address</Heading>
              <Input {...register("address", { required: true })} />
              {errors.address && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </Box>
            <Box>
              <Heading size={"sm"}>Number</Heading>
              <Input {...register("number", { required: true })} />
              {errors.number && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
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
