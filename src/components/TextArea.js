import React, {useState} from 'react'

export default function TextArea(props) {

    const[text, setText] = useState("")
    let textWithoutSpace = text
    let previewText = text
    const toUpperCase = ()=>{
        setText(text.toUpperCase())
        props.showAlert("Converted to upper case", "success")
    }
    const toLowerCase = ()=>{
        setText(text.toLowerCase())
        props.showAlert("Converted to lower case", "success")
    }
    const clearText = ()=>{
        let answer = window.confirm("Are you sure, you want to Clear?")
        if(answer){
            setText("")
        }  
    }
    const removeExtraSpaces = ()=>{
        let newText = text.split(/[ ]+/)
        setText(newText.join(" "))
        props.showAlert("Extra space removed", "success")
    }
    const copyText = ()=>{
        const text = document.getElementById("box-el")
        text.select()
        text.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(text.value).then(() => {
            props.showAlert("Copied to clipboard", "success")
          })
          .catch(() => {
            props.showAlert("something went wrong", "danger")
          })
    }
    const sentencewise = ()=>{
        const previewEl = document.getElementById("preview-el")
        previewEl.setAttribute('style', 'white-space: pre;');
        previewText = text.replaceAll(".",".\r\n")
        previewEl.textContent = previewText
        props.showAlert("Text displayed in sentence wise, please check the preview", "success")
    }
    const handleOnChange = (event)=>{
        setText(event.target.value)
    }

  return (
    <>
        <div style ={{ color: props.mode === 'dark' ? '#7cddc8' : '#0c4c50' }}>
            <h3>{props.heading}</h3>
            <div className="mb-3">
                <textarea className="form-control" value = {text} onChange={handleOnChange} style ={{background: props.mode === 'dark' ? '#0c4c50' : 'white', color: props.mode === 'dark' ? '#7cddc8' : '#0c4c50'}} id="box-el" rows="8"></textarea> 
            </div>
            <button disabled = {text.length === 0} className = "btn btn-primary mx-1 my-1" onClick={toUpperCase}>To UpperCase</button>
            <button disabled = {text.length === 0} className = "btn btn-primary mx-1 my-1" onClick={toLowerCase}>To LowerCase</button>
            <button disabled = {text.length === 0} className = "btn btn-primary mx-1 my-1" onClick={clearText}>Clear Text</button>
            <button disabled = {text.length === 0} className = "btn btn-primary mx-1 my-1" onClick={removeExtraSpaces}>Remove Extra Spaces</button>
            <button disabled = {text.length === 0} className = "btn btn-primary mx-1 my-1" onClick={copyText}>Copy Text</button>
            <button disabled = {text.length === 0} className = "btn btn-primary mx-1 my-1" onClick={sentencewise}>Sentencewise</button>
        </div>
        <div className="container my-2" style ={{ color: props.mode === 'dark' ? '#7cddc8' : '#0c4c50' }}>
            <h3>Your text summary</h3>
            <table className="table" style ={{ color: props.mode === 'dark' ? '#7cddc8' : '#0c4c50' }}>
                <thead>
                </thead>
                <tbody>
                     <tr>
                        <th scope="row">*</th>
                        <td>No. of characters(including spaces): </td>
                        <td>{text.length}</td>
                    </tr>
                    <tr>
                        <th scope="row">*</th>
                        <td>No. of characters(without spaces): </td>
                        <td>{textWithoutSpace.replaceAll(" ", "").length}</td>
                    </tr>
                    <tr>
                        <th scope="row">*</th>
                        <td>No. of words: </td>
                        <td>{ text.split(" ").filter((element) =>{return element.length !== 0}).length}</td>
                    </tr>
                    <tr>
                        <th scope="row">*</th>
                        <td>No. of sentences: </td>
                        <td>{text.match(/\w[.?!](\s|$)/gm) === null ? 0 : text.match(/\w[.?!](\s|$)/gm).length}</td>
                    </tr>
                    <tr>
                        <th scope="row">*</th>
                        <td>Time to read(in Minutes): </td>
                        <td>{text.length > 0 ? 0.008 * text.split(" ").length: 0}</td>
                    </tr>

                </tbody>
            </table>
            <h3>Preview</h3>
            <p id = "preview-el">{text.length>0 ?  previewText :'Nothing to preview !!!'}</p>

        </div>
    </>
  )
}