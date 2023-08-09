import IconBox from "./IconBox";
import { Icon } from "@chakra-ui/react";

const MiniStatCardIcon = (props) => {

    const { color, icon: iconComponent } = props;

    return (
        <IconBox w="54px" h="54px" borderRadius={"50%"} bg={color + ".50"} color={color + ".400"} >
            <Icon fontSize="26" fontWeight={700} as={iconComponent} />
        </IconBox>
    )

}

export default MiniStatCardIcon;

