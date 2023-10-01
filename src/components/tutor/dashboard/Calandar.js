import React, { useState } from "react";
import dayjs from 'dayjs';
import { Group, Indicator } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import isEventDay from "../../../utils/isEventDay";

//days of this month 2023 july
const eventDays = [
	new Date(2023, 6, 17),
	new Date(2023, 6, 27),
	new Date(2023, 6, 30),
	new Date(2023, 6, 14),
	new Date(2023, 6, 25),
	new Date(2023, 6, 16),
]



const CalenderMan = ({ ...rest }) => {
	const [selected, setSelected] = useState();


	const handleSelect = (date) => {
		const isSelected = dayjs(date).isSame(selected, 'date');

		if (isSelected) {
			setSelected(null);
		}
		else {
			setSelected(date);
		}

		// if (isSelected) {
		// 	setSelected((current) => current.filter((d) => !dayjs(d).isSame(date, 'date')));
		// } else if (selected.length < 3) {
		// 	setSelected((current) => [...current, date]);
		// }
	};

	return (
		<Group position="center">
			<Calendar

				highlightToday
				highlightWeekends={false}

				getDayProps={(date) => ({
					selected: dayjs(date).isSame(selected, 'date'),
					onClick: () => handleSelect(date),
				})}

				static
				renderDay={(date) => {
					const day = date.getDate();
					return (
						<Indicator size={6} color="red" offset={-2} disabled={!isEventDay(date, eventDays)}>
							<div>{day}</div>
						</Indicator>
					);
				}}
			/>
		</Group>
	);
};

export default CalenderMan;
