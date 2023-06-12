import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./HomePage_module.scss";

export default function HomePage() {
  return (
    <Flex justify="center" mt={270}>
      <Link to="/branches">
        <Button className="button" colorScheme="blue" mr={4}>
          Branches
        </Button>
      </Link>
      <Link to="/products">
        <Button className="button" colorScheme="green">
          Products
        </Button>
      </Link>
    </Flex>
  );
}
