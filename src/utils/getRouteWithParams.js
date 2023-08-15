export default function getRouteWithParams(params) {
	const route = params["*"];
	console.log(route);
	var keys = Object.keys(params).filter((key) => key !== "*");
	var routeWithParams = route;

	keys.forEach((key) => {
		if (key !== "*") {
			routeWithParams = routeWithParams.replace(params[key], ":" + key);
		}
	});
	return (routeWithParams)
}