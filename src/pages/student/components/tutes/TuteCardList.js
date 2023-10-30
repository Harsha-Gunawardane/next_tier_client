import { Carousel } from "@mantine/carousel";
import { Box } from "@chakra-ui/react";

import TuteCard from "../cards/TuteCard";
import timesAgo from "../../../../utils/timesAgo";

const colors = ["#E9F8FF", "#FFE1E1", "#FEEDD3", "#D3F3D2", "#EBD2FF"];
function getColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function TuteCardList({ tuteList }) {
  return (
    <Box
      mt={5}
      ml={5}
      w={{
        sm: "100vw - 440px",
        md: "100vw - 360px",
        lg: 730,
      }}
    >
      <Carousel
        withIndicators
        height={322}
        w={"100%"}
        slideSize="30%"
        slideGap={3}
        loop
        align="start"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
      >
        {tuteList.map((tute) => (
          <Carousel.Slide>
            <TuteCard
              id={tute.id}
              title={tute.name}
              time={timesAgo(tute.recent_activity)}
              icon={tute.icon}
              content={tute.description}
              bg={getColor}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Box>
  );
}

export default TuteCardList;
