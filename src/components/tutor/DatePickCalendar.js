import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Group } from '@mantine/core';
import { Calendar } from '@mantine/dates';

function Demo() {
  const [selected, setSelected] = useState([]);

  const handleSelect = (date) => {
    const isSelected = selected.some((s) => dayjs(date).isSame(s, 'date'));
    if (isSelected) {
      setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
    } else if (selected.length < 3) {
      setSelected((current) => [...current, date]);
    }
  };

  return (
    <Group position="center">
      <Calendar
        getDayProps={(date) => ({
          selected: selected.some((s) => dayjs(date).isSame(s, 'date')),
          onClick: () => handleSelect(date),
        })}
      />
    </Group>
  );
}

export default Demo;
