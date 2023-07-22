import { IconBookmark, IconEdit, IconEye, IconHeart, IconHttpDelete, IconShare, IconTrash } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Group,
  createStyles,
  rem,
} from "@mantine/core";

import backgroundTemplate from "../mcq/assests/backgroundTemplate.jpg";
import backgroundTemplate2 from "../mcq/assests/backgroundTemplate2.jpg";
import backgroundTemplate3 from "../mcq/assests/backgroundTemplate3.jpg";
import backgroundTemplate4 from "../mcq/assests/backgroundTemplate4.jpg";
import backgroundTemplate5 from "../mcq/assests/backgroundTemplate5.jpg";



const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: "200px",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
        fontWeight: 900,
        lineHeight: 1.2,
        fontSize: rem(20),
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export function McqCategoryCards({ category }) {
  const { classes, cx, theme } = useStyles();

  return (
    <Card withBorder radius="md" className={cx(classes.card)}>
      <Card.Section>
        <Image
          src={
            category.title === "Inorganic Chemistry"
              ? backgroundTemplate
              : category.title === "Organic Chemistry"
              ? backgroundTemplate3
              : category.title === "Industrial Chemistry"
              ? backgroundTemplate2
              : backgroundTemplate5
          }
          height={100}
        />
      </Card.Section>

      <Text className={classes.title} fw={500} component="a">
        {category.title}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4} fontSize="12px">
        Number of MCQs : {category.noofmcqs}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Group spacing={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconEye size="1rem" />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconEdit size="1rem" color={theme.colors.yellow[7]} />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconTrash size="1rem" color={theme.colors.red[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
