// // import './styles/tiptap.scss'

// import Mention from '@tiptap/extension-mention'
// import { EditorContent, useEditor } from '@tiptap/react'

// const suggestion = [
//     {
//         id: 'Winona Ryder',
//         name: 'Winona Ryder',
//         avatar: 'https://www.gravatar.com/avatar'
//     },
//     {
//         id: 'Christian Slater',
//         name: 'Christian Slater',
//         avatar: 'https://www.gravatar.com/avatar'
//     },
// ]

// const MentionTipTap = () => {

//     const editor = useEditor({
//         extensions: [
//             Mention.configure({
//                 HTMLAttributes: {
//                     class: 'mention',
//                 },
//                 suggestion,
//             }),
//         ],
//         content: `
//           <p>
//             What do you all think about the new <span data-type="mention" data-id="Winona Ryder"></span> movie?
//           </p>
//         `,
//     })


//     return (
//         <div className="editor">
//             <EditorContent editor={editor} />
//         </div>
//     )

// }

// export default MentionTipTap