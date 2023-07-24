import {
  createStyles,
  Group,
  Paper,
  Text,
  SimpleGrid,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    padding: `calc(${theme.spacing.xl} * 1.1)`,
    paddingBottom:"5px"
   
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    borderLeft:"4px solid gray",
    paddingLeft:"10px",
    fontWeight:"bold",
    c:"dimmed"

  },
}));


export function StatsGroup({ data }) {
  const { classes } = useStyles();

  const statData = [
    { noofMcqs: 600, title: "Total Mcqs" },
    { noofMcqs: 300, title: "Simple Mcqs" },
    { noofMcqs: 200, title: "Average Mcqs" },
    { noofMcqs: 100, title: "Hard Mcqs" },
  ];


  const stats = statData.map((stat) => {
    return (
      <Paper withBorder p="md" radius="md" key={stat.title} >
        <Group position="apart">
          <div>
            <Text
              c="dimmed"
              tt="uppercase"
              fw={700}
              fz="md"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.noofMcqs}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });


  return (
    <div className={classes.root} >
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm",minWidth: "xs", cols: 1 }]}  >
        {stats}
      </SimpleGrid>
    </div>
  );
}


