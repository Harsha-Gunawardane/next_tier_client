import { Box, Image, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import UnauthorizedImage from "../../assests/images/unauthorized.png";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Box>
      <Flex justifyContent={"center"} mt={20}>
        <Image h={600} w={600} src={UnauthorizedImage} />
      </Flex>
      <Flex justifyContent={"center"}>
        <Button onClick={goBack}>Go Back</Button>
      </Flex>
    </Box>
  );
};

export default Unauthorized;
