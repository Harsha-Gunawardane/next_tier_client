import { Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import getRouteWithParams from "../../../../utils/getRouteWithParams";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import capsFirst from "../../../../utils/capsFirst";
import _ from "lodash";

const BreadCrumbForum = (props) => {

    const { id, title, courseTitle, studyPack, ...rest } = props;



    const params = useParams();

    const getRouteArr = (params, remove, replace) => {
        const route = getRouteWithParams(params);
        var routeArr = route.split("/");
        routeArr = routeArr.filter((item) => !remove.includes(item));
        replace.forEach((item) => {
            routeArr[routeArr.indexOf(item.from)] = item.to;
        })
        return routeArr;
    }

    let routeArr;
    if (studyPack) {
        routeArr = getRouteArr(params, ["stu"], [{ from: ":studypackId", to: courseTitle }]);
    } else {
        if (_.isEmpty(title) && _.isEmpty(id)) {
            routeArr = getRouteArr(params, ["stu"], [{ from: ":courseId", to: courseTitle }]);
        } else {
            routeArr = getRouteArr(params, ["stu"], [{ from: ":" + id, to: title }]);
        }
    }
    var href = "/stu";


    return (
        <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
            {routeArr.map((item, index) => {
                if (item !== courseTitle) {
                    href += "/" + item
                } else {
                    href += "/" + params["id"]
                }

                return (
                    <BreadcrumbItem key={index} isCurrentPage={index === routeArr.length - 1} color={index === routeArr.length - 1 ? "gray.500" : "gray.400"} _hover={{ color: "gray.600" }}>
                        <Link to={href} >
                            <Text noOfLines={1} maxW={"200px"}>
                                {item}
                            </Text>
                        </Link>
                    </BreadcrumbItem>
                )
            })}

        </Breadcrumb>
    )

}

export default BreadCrumbForum;