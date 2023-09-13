import {
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Text,
  CheckboxGroup,
  Checkbox,
  Stack,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

const classes = [
  {
    courseName: "2024 Physocs Theory",
    tutor: "Samitha Rathnayeka",
    id: 1,
    studyPacks: [
      {
        studyPackName: "April",
        fee: 2500,
        id: 1,
      },
      {
        studyPackName: "April Special",
        fee: 1500,
        id: 2,
      },
      {
        studyPackName: "April Special Pro",
        fee: 15000,
        id: 12,
      },
    ],
  },
  {
    courseName: "2024 Chemistry Revision",
    tutor: "Jeewaka C Perera",
    id: 2,
    studyPacks: [
      {
        studyPackName: "March",
        fee: 3000,
        id: 3,
      },
      {
        studyPackName: "April revision",
        fee: 1000,
        id: 14,
      },
    ],
  },
];

function FeesPayment({ totalFee, setTotalFee }) {
  const [checkedPacks, setCheckedPacks] = useState(
    classes.map((clz) => clz.studyPacks.map(() => false))
  );
  const [selectedPackIds, setSelectedPackIds] = useState([]);

  const packIds = classes.map((clz) => clz.studyPacks.map((pack) => pack.id));

  const handleCheckedPack = (clzIndex, packIndex, fee) => (event) => {
    const newCheckedPacks = [...checkedPacks];

    if (typeof newCheckedPacks[clzIndex][packIndex] === "boolean") {
      newCheckedPacks[clzIndex][packIndex] =
        !newCheckedPacks[clzIndex][packIndex];
    } else {
      newCheckedPacks[clzIndex][packIndex] = true;
    }

    let newSelectedPackIds = selectedPackIds;
    if (newCheckedPacks[clzIndex][packIndex]) {
      if (!newSelectedPackIds.includes(packIds[clzIndex][packIndex])) {
        newSelectedPackIds[newSelectedPackIds.length] =
          packIds[clzIndex][packIndex];

        setTotalFee(totalFee + fee);
      }
    } else {
      let removeId = newSelectedPackIds.indexOf(packIds[clzIndex][packIndex]);
      if (removeId !== -1) {
        newSelectedPackIds.splice(removeId, 1);
        setTotalFee(totalFee - fee);
      }
    }

    setSelectedPackIds(newSelectedPackIds);

    setCheckedPacks(newCheckedPacks);
    console.log(fee);
  };

  return (
    <Box mt={5} ml={"5%"}>
      <Accordion>
        {classes.map((clz, clzIndex) => {
          return (
            <AccordionItem key={clz.id}>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    bg={"#E9E9E9"}
                    pt={1}
                    pb={1}
                    pl={5}
                    mr={5}
                    borderRadius={5}
                  >
                    <Flex gap={5} alignItems={"flex-end"}>
                      <Text>{clz.courseName}</Text>
                      <Text fontSize={12} color={"#444"}>
                        {clz.tutor}
                      </Text>
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box>
                  <Input
                    mb={3}
                    w={"93%"}
                    type="text"
                    placeholder="Search class ..."
                  />
                  <CheckboxGroup colorScheme="green" value={selectedPackIds}>
                    <Stack direction={"column"}>
                      {clz.studyPacks.map((pack, packIndex) => {
                        return (
                          <Checkbox
                            key={pack.id}
                            value={pack.id}
                            checked={checkedPacks[clzIndex][packIndex]}
                            onChange={handleCheckedPack(
                              clzIndex,
                              packIndex,
                              pack.fee
                            )}
                          >
                            <Flex gap={5} alignItems={"flex-end"}>
                              <Text>{pack.studyPackName}</Text>
                              <Text
                                color={"#555"}
                                fontSize={13}
                                fontWeight={"semibold"}
                              >
                                {`Rs ${pack.fee}.00`}
                              </Text>
                            </Flex>
                          </Checkbox>
                        );
                      })}
                    </Stack>
                  </CheckboxGroup>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
}

export default FeesPayment;
