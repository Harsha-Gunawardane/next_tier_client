import React, { useEffect, useState } from "react";
import { CSSReset, Flex } from "@chakra-ui/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import "../../assets/css/calendarcustom.css"
import moment from "moment";
import { format, isWeekend } from "date-fns";
import isEventDay from "../../utils/isEventDay";

//days of this month 2023 july
const eventDays = [
	new Date(2023, 6, 17),
	new Date(2023, 6, 27),
	new Date(2023, 6, 30),
	new Date(2023, 6, 14),
	new Date(2023, 6, 25),
	new Date(2023, 6, 16),
]


function customDayContent(day) {
	var extraDot = null;

	if (isEventDay(day, eventDays)) {
		extraDot = (
			<div
				style={{
					height: "5px",
					width: "5px",
					borderRadius: "100%",
					background: "orange",
					position: "absolute",
					top: 2,
					right: 2,
				}}
			/>
		)
	}
	return (
		<div>
			{extraDot}
			<span>{format(day, "d")}</span>
		</div>
	)
}


const Calender = ({ ...rest }) => {
	const [date, setDate] = useState(null);

	// useEffect(() => {
	// 	setDate(moment().toDate());
	// }, []);


	const handleSelect = (date) => {
		setDate(date);
		console.log(date); // native Date object
	};

	return (
		<Calendar
			minDate={new Date()}
			date={date}
			onChange={item => handleSelect(item)}
			dayContentRenderer={customDayContent}
			{...rest}
		/>
	);
};

export default Calender;
