/* eslint-disable react/prop-types */
import "./Section.css"

const Section = (props) => {
        
    return (
        <div className="section-container">
            <h2 className="section-header">{props.header}</h2>
            <hr />
            <ul className="section-list">
                {props.content ? props.content.map((item, index) => {
                   return <li key={`${props.keyInfo}-${index}`} className="table-elem">{item ? item : "N/A"}</li>
                }) : null}
            </ul>
        </div>
    );
}

export default Section;