export default function ChatTextBar () {
    return (
        <div style={{
            // border: "1px solid black",
            width: "100%",
            minHeight: "",
            position: "sticky",
            bottom: "8px",
        }}>
            <textarea style={{width: "calc(100% - 4px)",border: "1px solid", maxHeight: "150px", fieldSizing: 'content'}} />
        </div>
    )
}