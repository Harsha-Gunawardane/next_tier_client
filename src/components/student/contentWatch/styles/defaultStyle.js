const defaultStyle = {
    control: {
        backgroundColor: '#fff',
        fontSize: 14,
        fontWeight: 'normal',
        borderRadius: "10px"
    },

    '&multiLine': {
        control: {
            fontFamily: 'Roboto, sans-serif',
            minHeight: 63,
        },
        highlighter: {
            padding: 9,
            border: '1px solid transparent',
            positions: 'absolute',

        },
        input: {
            padding: 9,
            borderRadius: '8px',
            focus: { "border": "1px solid #0074d9" }, // This is not working
            border: '1px solid silver',
            "&focused": {
                border: '1px solid #0074d9',
            }
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
            positions: 'absolute',
        },
        input: {
            padding: 1,
            border: '2px inset',
        },
    },

    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
        },
        item: {
            // padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#cee4e5',
            },
        },
    },
}

export default defaultStyle