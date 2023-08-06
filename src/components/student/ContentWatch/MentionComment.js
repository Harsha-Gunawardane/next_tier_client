import { useEffect, useState } from "react"
import { MentionsInput, Mention } from "react-mentions"
import defaultStyle from "./styles/defaultStyle"
import defaultMentionStyle from "./styles/defaultMentionStyle"
import "./styles/custom.css"
import { set } from "date-fns"
import { Box } from "@chakra-ui/react"
import MentionTipTap from "./MentionTipTap"


const MentionComment = (props) => {
    const MaxMentionLimit = 3;
    const { setReplyCommentVal, value, setIsFocused, mentionUsers, setMentionUsers, mentions, setMentions } = props

    const [mentioned, setMentioned] = useState(false)

    const users = mentionUsers

    const handleMentionChange = (ev, newValue, newPlainTextValue, mentions) => {
        // Check if the last character typed is '@' and a mention is not already selected
        if (ev.target.value.endsWith('@') && !mentioned) {
            setMentioned(true); // Set the mentioned flag to true
        }

        // Check if the last character typed is not '@' and reset the mentioned flag
        if (!ev.target.value.endsWith('@')) {
            setMentioned(false);
        }

        setReplyCommentVal(newValue)
        console.log(mentions)
        //compare mentions and mentionUsers and set the difference to mentionUsers
        setMentions(
            (prev) => {
                if (prev.length > mentions.length) {
                    prev.forEach(mention => {
                        console.log("inside")
                        if (!mentionUsers.find(user => user.id === mention.id)) {
                            mention.display = mention.display.slice(1)
                            setMentionUsers([...mentionUsers, mention])
                        }
                    })
                }
                return mentions
            }

        )

        mentions.forEach(mention => {
            if (mentionUsers.find(user => user.id === mention.id)) {
                setMentionUsers(mentionUsers.filter(user => user.id !== mention.id))
            }
        })



    }

    return (
        <Box position={"relative"}>
            <MentionsInput
                style={defaultStyle}
                value={value}
                onChange={handleMentionChange}
                placeholder={"Write a comment..."}
                className="mentions_main"
                markup="@[__display__](__id__)"

            >
                <Mention
                    style={defaultMentionStyle}
                    data={users}
                    trigger="@"
                    displayTransform={(id, display) => `@${display}`}
                    className="mentions_tag"
                />
            </MentionsInput>
            {/* <MentionTipTap /> */}

        </Box >
    )
}

export default MentionComment