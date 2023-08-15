import IconBox from "./IconBox";
import { Icon } from "@chakra-ui/react";

const MiniStatCardIcon = (props) => {

    const { bg, color, icon: iconComponent } = props;

    return (
        <IconBox w="40px" h="40px" borderRadius={"50%"} bg={bg} color={color} >
            <Icon fontSize="24" as={iconComponent} />
        </IconBox>
    )

}

export default MiniStatCardIcon;